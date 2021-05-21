const username = document.getElementById('username')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')
const form = document.getElementById('form')
errorMessage1 = document.getElementById('error1');
errorMessage2 = document.getElementById('error2');
errorMessage3 = document.getElementById('error3');



form.addEventListener('submit', (e) => {

  var char1 = "/!@#$%^&*()_+-";
  var char2 = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
  var char3 = "123456789";
  var char4 = "abcdefghijklnopqrstuvwxyz";
  var temp1 = 0;
  var temp2 = 0;
  var temp3 = 0;
  var tempcount = 0;
  var usernamecheck = false;

  if (char4.indexOf(username.value.charAt(0)) != -1 || char2.indexOf(username.value.charAt(0)) != -1) {
    usernamecheck = true;
  }

  for (var i = 0; i < username.value.length; i++) {
    if (char2.indexOf(username.value.charAt(i)) != -1) {
      tempcount++;
    }
  }
  for (var i = 0; i < username.value.length; i++) {
    if (char3.indexOf(username.value.charAt(i)) != -1) {
      tempcount++;
    }
  }
  for (var i = 0; i < username.value.length; i++) {
    if (char4.indexOf(username.value.charAt(i)) != -1) {
      tempcount++;
    }
  }

  if (usernamecheck == false) {
    errorMessage1.innerText = 'Username must begin with a letter';
    e.preventDefault();
  } else if (username.value.length <= 2) {
    errorMessage1.innerText = 'Username must be at least 3 alphanumeric characters';
    e.preventDefault();
  } else if (username.value.length != tempcount) {
    errorMessage1.innerText = 'Username must use alphanumeric characters';
    e.preventDefault();
  } else {
    errorMessage1.innerText = '';
  }

  for (var i = 0; i < password.value.length; i++) {
    if (char1.indexOf(password.value.charAt(i)) != -1) {
      temp1 = 1;
    }
  }

  for (var i = 0; i < password.value.length; i++) {
    if (char2.indexOf(password.value.charAt(i)) != -1) {
      temp2 = 1;
    }
  }

  for (var i = 0; i < password.value.length; i++) {
    if (char3.indexOf(password.value.charAt(i)) != -1) {
      temp3 = 1;
    }
  }

  for (var i = 0; i < password.value.length; i++) {
    if (password.value.charAt(i) != password2.value.charAt(i)) {
      errorMessage3.innerText = 'Passwords must match';
      e.preventDefault();
    }
  }


  if (temp1 == 0) {
    errorMessage2.innerText = 'Password must contain at least 1 of the following special characters  / * - + ! @# $ ^ & * ';
    e.preventDefault();
  } else if (temp2 == 0) {
    errorMessage2.innerText = 'Password must contain at least 1 upper case letter';
    e.preventDefault();
  } else if (temp3 == 0) {
    errorMessage2.innerText = 'Password must contain at least 1 number';
    e.preventDefault();
  } else {
    errorMessage2.innerText = '';
  }

})