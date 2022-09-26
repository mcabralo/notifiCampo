const express = require('express');
const Logger = require('./Logger.js');
const app = express();
let log = new Logger();

module.exports = class Application {
  constructor() {
    const port = process.env.PORT || 6598;
    app.listen(port, () => log.info(`Servidor iniciado na porta ${port}`));
  }
};
