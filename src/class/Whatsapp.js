class Whatsapp {
  constructor() {
    const { Client, LocalAuth, List, Buttons } = require('whatsapp-web.js');
  }

  connectWpp() {
    const client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    });
  }
}
