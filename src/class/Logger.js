const moment = require('moment');
let appName;
let date;

module.exports = class Logger {
  constructor() {
    appName = '[Notificampo] - ';
    date = moment().format();
  }
  info(message) {
    console.log(`${appName}${date}: ${message}`);
  }
};
