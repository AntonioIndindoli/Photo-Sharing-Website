var express = require('express');
var router = express.Router();
var db = require('../config/database');
const UserModel = require('../models/Users');
const UserError = require("../helpers/error/UserError");
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var bcrypt = require('bcrypt');

///* GET users listing. */
//router.get('/', function (req, res, next) {
//  res.send('respond with a resource');
//});


router.post('/register', (req, res, next) => {
  let password = req.body.password;
  let cpassword = req.body.cpassword;
  let username = req.body.username;
  let email = req.body.email;

  //validation needs to be done

  UserModel.usernameExists(username)
  .then((userDoesNameExist) => {
    if(userDoesNameExist){
      throw new UserError(
        "Registration Failed: Username already exists",
        "/registration",
        200
      );
    }else{
      return UserModel.emailExists(email);
    }
  })
  .then( (emailDoesExist) => {
    if(emailDoesExist) {
      throw new UserError(
        "Registration Failed: Email already exists",
        "/registration",
        200
      );
    }else{
      return UserModel.create(username, password, email);
    }
  })
  .then((createdUserId) => {
    if(createdUserId < 0){
      throw new UserError(
        "Server Error, user could not be created",
        "/registration",
        500
      );
    }else{
      successPrint("User.js --> User was created!!");
      req.flash('success', 'User account has been made');
      res.redirect('/login');
    }
  })
  .catch((err) => {
    errorPrint("User could not be made", err);
    if (err instanceof UserError) {
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect(err.getRedirectURL());
    } else {
      next(err);
    }
  });  

  /*
  db.execute("SELECT * FROM users WHERE username=?", [username])
  .then(([results, fields]) => {
      if (results && results.length == 0) {
        return db.execute("SELECT * FROM users WHERE email=?", [email]);
      }
      else {
        throw new UserError(
          "Registration Failed: Username already exists",
          "/registration",
          200
        );
      }
    })
    .then(([results, fields]) => {
      if (results && results.length == 0) {
        return bcrypt.hash(password, 15);
      }
      else {
        throw new UserError(
          "Registration Failed: Email already exists",
          "/registration",
          200
        );
      }
    })
    .then((hashedPassword) => {
      let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?,?,?,now());"
      return db.execute(baseSQL, [username, email, hashedPassword]);
    })
    .then(([results, fields]) => {
      if (results && results.affectedRows) {
        successPrint("User.js --> User was created!!");
        req.flash('success', 'User account has been made');
        res.redirect('/login');
      } else {
        throw new UserError(
          "Server Error, user could not be created",
          "/registration",
          500
        );
      }
    })
    .catch((err) => {
      errorPrint("User could not be made", err);
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
      } else {
        next(err);
      }
    });  */
});

router.post("/login", (req, res, next) => {
  let password = req.body.password;
  let username = req.body.username;
 
  //validation needs to be done
  
  UserModel.authenticate(username, password)
    .then((loggedUserId) => {
      if (loggedUserId > 0) {
        successPrint(`User ${username} is logged in`);
        req.session.username = username;
        req.session.userId = loggedUserId;
        res.locals.logged = true;
        res.cookie("logged", username);
        req.flash('success', 'You have been successfully logged in');
        res.redirect("/");
      } else {
        throw new UserError("Invalid username and/or password!", "/login", 200);
      }
    })
    .catch((err) => {
      errorPrint("User login failed");
      if (err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect('/login');
      } else {
        next(err);
      }
    });
    
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      errorPrint('Session could not be destoryed.');
      next(err);
    } else {
      successPrint('Session was destroyed');
      res.clearCookie('csid');
      res.json({ status: "OK", message: "User is logged out" });
    }
  })
});

module.exports = router;

