const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const sheetdb = require('sheetdb-node');
const moment = require('moment');

/** API WHATSAPP */

// const client = new Client({
//   authStrategy: new LocalAuth(),
// });

// client.on('qr', (qr) => {
//   qrcode.generate(qr, { small: true });
// });

// client.on('ready', () => {
//   console.log('Client is ready!');
//   // client.sendMessage('5571999486598@c.us', 'pong');
// });

// client.initialize();

// client.on('ready', () => {
//   console.log('Sending Message!');
//   try {
//     client.sendMessage('557199486598@c.us', 'pruu');
//     client.sendMessage('5511983099880@c.us', 'pruu');
//   } catch (error) {
//     console.error(error);
//   }
// });

// create a config file
const config = {
  address: 'f2ujkaq8k2dub',
};

// Create new client
const client = sheetdb(config);

// const data = new Date().toLocaleDateString();
const data = moment().format('DD-MM-YY');

let notificacoes = [];

async function getNotificacoes() {
  //Read Dirigente
  await client
    .read({
      sheet: 'JulhoApi',
      search: { Data: data, Atv: 'Dirigente' },
    })
    .then(
      function (data) {
        console.log('Dirigente');
        data === '[]' ? '' : notificacoes.push(data);
        // console.log(data);
        console.log(notificacoes);
        return notificacoes;
      },
      function (err) {
        console.log(err);
      }
    );

  await client
    .read({
      sheet: 'JulhoApi',
      search: { Data: data, Atv: 'Operador' },
    })
    .then(
      function (data) {
        console.log('Operador');
        data === '[]' ? '' : notificacoes.push(data);
        // console.log(data);
        console.log(notificacoes);

        return notificacoes;
      },
      function (err) {
        console.log(err);
      }
    );

  // console.log(notificacoes);
  return JSON.parse(notificacoes);
}

getNotificacoes().then((notificacoes) => {
  console.log(notificacoes);
});
