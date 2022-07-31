const { Client, LocalAuth, List, Buttons } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../credentials.json');

const moment = require('moment');

const nodeSchedule = require('node-schedule');

const puppeteer = require('puppeteer');

const express = require('express');
const router = express.Router();

const browser = puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

console.info('Aplicação Iniciada');
const job = nodeSchedule.scheduleJob('0 9 * * *', () => {
  // /** API WHATSAPP */,

  const client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.initialize();
  console.log('Aplicação iniciada');

  async function getDoc() {
    const doc = new GoogleSpreadsheet(credentials.sheetId);

    await doc.useServiceAccountAuth({
      client_email: credentials.client_email,
      private_key: credentials.private_key.replace(/\\n/gm, '\n'),
    });
    await doc.loadInfo();
    return await doc;
  }
  console.log('Conexão com planilha estabelecida');

  const data = moment().add(1, 'days').format('DD-MM-YY');
  // const data = moment().format('DD-MM-YY');
  console.log('Data considerada: ', data);
  let listaNotificampo, rowsMapped;

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
  console.log('Lista de designações gerada');

  lista.then((rowsMapped) => {
    console.log('Lista mapeada');
    // console.log(moment().format('LT'));
    // console.log(moment().format('LT') == '7:49 PM');
    // if (moment().format('LT') == '9:00 AM') {
    if (true) {
      for (let i = 0; i < rowsMapped.length; i++) {
        sendMessage(rowsMapped[i]);
      }
    }
    // console.log({ rowsMapped });
  });

  async function sendMessage(contato) {
    client.on('ready', () => {
      // console.log('Sending Message!');
      try {
        msgOperador(contato);
        console.log(`Enviando mensagem para ${contato.nome}, o ${contato.atv}`);
      } catch (error) {
        console.error(error);
      }
    });
  }

  async function msgOperador(contato) {
    console.log('Mensagem enviada');
    return client.sendMessage(
      `${contato.telefone}@c.us`,
      `Olá ${contato.nome}, bom dia mano! Esta é uma mensagem automática para lembrar que o irmão será o ${contato.atv} amanhã, ${contato.data} às ${contato.hora}! 
    
    Caso não possa assumir, favor contatar Matheus (71 99486598) que ele irá providenciar um substituto!`
    );
  }
});
// console.log({ job });
