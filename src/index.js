const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

/** API WHATSAPP */

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Client is ready!');
  // client.sendMessage('5571999486598@c.us', 'pong');
});

client.initialize();

client.on('ready', () => {
  console.log('Sending Message!');
  try {
    client.sendMessage('557199486598@c.us', 'pruu');
    client.sendMessage('5511983099880@c.us', 'pruu');
  } catch (error) {
    console.error(error);
  }
});
