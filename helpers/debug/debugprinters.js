const colors = require('colors');

colors.setTheme({
    error: ['black', 'bgRed'],
    error: ['black', 'bgGreen'],
    error: ['black', 'bgWhite'],
})

const printers = {
    errorPrint: (message) => {
        console.log(colors.error(message));
    },

    successPrint: (message) => {
        console.log(colors.error(message));
    },

    requestPrint: (message) => {
        console.log(colors.error(message));
    },

}

module.exports = printers;