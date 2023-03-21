const moment = require('moment');
let appName;
let date;

module.exports = class Logger {
  constructor() {
    appName = '[Notificampo] - ';
  }
  info(message) {
    date = moment().format();
    console.log(`${appName}${date}: ${message}`);
  }
};
