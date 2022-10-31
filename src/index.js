// Declaração de Constantes
const Whatsapp = require('./class/Whatsapp.js');
const Sender = require('./class/Sender.js');
const Sheet = require('./class/Sheet.js');
const Server = require('./class/Server.js');
const Logger = require('./class/Logger.js');

// const job = nodeSchedule.npm('0 9 * * *', () => {
// /** API WHATSAPP */,

// Instância de Classes
new Server();
let log = new Logger();
let client = new Whatsapp();
let sender = new Sender();
let sheet = new Sheet();
let rowsMappedCarrinho;

log.info('Classes Instanciadas');

client.initialize();

log.info('Aplicação iniciada');

log.info('Data considerada: ' + sheet.getDate());

// let lista = sheet.getDoc();

// console.log({ lista });

let lista = sheet.getDesignacoes().then(async (doc) => {
  planilha = doc.sheetsByTitle['Api'];
  rowsMapped = await planilha.getRows().then(async (rows) => {
    rowsMapped = rows
      .map((row) => ({
        ['data']: row.Data,
        ['nome']: row.Nome,
        ['atv']: row.Atv,
        ['telefone']: row.Tel,
        ['hora']: row.Hora,
        ['territorio']: row.Terr ? row.Terr : ''
      }))
      .filter(sheet.getActualDate);

    listaNotificampo = rowsMapped;
    // console.log(listaNotificampo);

    return rowsMapped;
  });
  return rowsMapped;
});
log.info('Lista de designações gerada');

lista.then((rowsMapped) => {
  log.info('Lista mapeada');
  // console.log({rowsMapped});
  // if (moment().format('LT') == '9:00 AM') {
  if (true) {
    for (let i = 0; i < rowsMapped.length; i++) {
      sender.sendMessage(rowsMapped[i], client, log);
    }
  }
});
// }

let listaCarrinho = sheet.getCarrinho().then(async (doc) => {
  planilhaCarrinho = doc.sheetsByTitle['ApiTpl'];
  rowsMappedCarrinho = await planilhaCarrinho.getRows().then(async (rows) => {
    rowsMappedCarrinho = rows
    .map((row) => ({
      ['data']: row.Data,
      ['local']: row.Local,
      ['hora']: row.Hora,
      ['d1']: row.Designado_1,
      ['t1']: row.Tel_Designado_1,
      ['d1']: row.Designado_1,
      ['d2']: row.Designado_2,
      ['t2']: row.Tel_Designado_2,
    }))
    .filter(sheet.getActualWeek);

      // console.log({ rowsMappedCarrinho });
    return rowsMappedCarrinho;
  });
  return rowsMappedCarrinho;
});

listaCarrinho.then((rowsMappedCarrinho) => {
  log.info('Lista mapeada Carrinho');
  // if (moment().format('LT') == '9:00 AM') {
  if (true) {
    for (let i = 0; i < rowsMappedCarrinho.length; i++) {
      sender.sendMessage(rowsMappedCarrinho[i], client, log);
    }
  }
  // console.log({ rowsMappedCarrinho });
});

// }
