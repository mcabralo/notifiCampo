const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../credentials.json');

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

async function getDoc() {
  const doc = new GoogleSpreadsheet(credentials.sheetId);

  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key.replace(/\\n/g, '\n'),
  });
  await doc.loadInfo();
  return await doc;
}
// getDoc().then((doc) => {
//   console.log(doc.title);
// });

const data = moment().format('DD-MM-YY');
let listaNotificampo;
let rowsMapped;

function getActualDate(val) {
  return val.data == data;
}

let lista = getDoc().then(async (doc) => {
  sheet = doc.sheetsByIndex[0];
  rowsMapped = await sheet.getRows().then(async (rows) => {
    rowsMapped = rows
      .map((row) => ({
        ['data']: row.Data,
        ['nome']: row.Nome,
        ['telefone']: row.Tel,
      }))
      .filter(getActualDate);

    listaNotificampo = rowsMapped;

    return rowsMapped;
  });
  return rowsMapped;
});

lista.then((rowsMapped) => {
  console.log({ rowsMapped });
});
