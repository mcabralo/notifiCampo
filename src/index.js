const { Client, LocalAuth, List, Buttons } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../credentials.json');

const moment = require('moment');

// /** API WHATSAPP */

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.initialize();

client.on('message', async (message) => {
  if (message.body === 'a') {
    console.log('MESSAGE RECEIVED', message);
    let button = new Buttons();
    client.sendMessage(message.from, button);
  }
});

async function getDoc() {
  const doc = new GoogleSpreadsheet(credentials.sheetId);

  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key.replace(/\\n/g, '\n'),
  });
  await doc.loadInfo();
  return await doc;
}

// const data = moment().add(1, 'days').format('DD-MM-YY');
const data = moment().format('DD-MM-YY');
console.log(data);
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
        ['atv']: row.Atv,
        ['telefone']: row.Tel,
        ['hora']: row.Hora,
      }))
      .filter(getActualDate);

    listaNotificampo = rowsMapped;

    return rowsMapped;
  });
  return rowsMapped;
});

lista.then((rowsMapped) => {
  // if (moment().format('LT') == '09:00') {
  if (true) {
    for (let i = 0; i < rowsMapped.length; i++) {
      sendMessage(rowsMapped[i]);
    }
  }
  // console.log({ rowsMapped });
});

async function sendMessage(contato) {
  client.on('ready', () => {
    console.log('Sending Message!');
    try {
      msgOperador(contato);
    } catch (error) {
      console.error(error);
    }
  });
}

async function msgOperador(contato) {
  return client.sendMessage(
    `${contato.telefone}@c.us`,
    `Olá ${contato.nome}, bom dia mano! Esta é uma mensagem automática para lembrar que o irmão será o ${contato.atv} amanhã, ${contato.data} às ${contato.hora}! 
    
    Caso não possa assumir, favor contatar Matheus (71 99486598) que ele irá providenciar um substituto!`
  );
}
