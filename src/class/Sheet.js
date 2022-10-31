const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('../../credentials.json');
const moment = require('moment');
const Logger = require('./Logger.js');
let data, dia, rowsMapped, rowsMappedCarrinho, dataFimSemana;
let log = new Logger();

module.exports = class Sheet {
  async getDesignacoes() {
    const doc = new GoogleSpreadsheet(credentials.sheetIdDesignacoes);

    await doc.useServiceAccountAuth({
      client_email: credentials.client_email,
      private_key: credentials.private_key.replace(/\\n/gm, '\n'),
    });
    await doc.loadInfo();
    log.info('Conexão com planilha estabelecida');
    return await doc;
  }
  async getCarrinho() {
    const doc = new GoogleSpreadsheet(credentials.sheetIdCarrinho);

    await doc.useServiceAccountAuth({
      client_email: credentials.client_email,
      private_key: credentials.private_key.replace(/\\n/gm, '\n'),
    });
    await doc.loadInfo();
    log.info('Conexão com planilha estabelecida');
    return await doc;
  }

  getDate() {
    data = moment().add(1, 'days').format('DD-MM-YY');
    // data = moment().format('DD-MM-YY');
    
    return data;
  }

  getEndDate() {
    return dataFimSemana;
  }

  getWeek() {
    return moment().isoWeekday();
  }

  getActualWeek(val) {
    let hoje = moment().add(1, 'days').format('DD-MM-YY');
  //   let hoje = moment().add(6, 'days').format('DD-MM-YY');
   dataFimSemana = moment().add(7, 'days').format('DD-MM-YY');
    // dataFimSemana = moment().add(4, 'days').format('DD-MM-YY');
    // console.log(hoje, val.data, dataFimSemana);
    // console.log(val.data ? val.data >= hoje && val.data <= dataFimSemana : "");
    // console.log({val});

    return val.data ? val.data >= hoje && val.data <= dataFimSemana : ""
  }

  getActualDate(val) {
    return val.data == data;
  }

  getList() {
    this.getDoc().then(async (doc) => {
      planilha = doc.sheetsByTitle['Api'];
      rowsMapped = await planilha.getRows().then(async (rows) => {
        rowsMapped = rows
          .map((row) => ({
            ['data']: row.Data,
            ['nome']: row.Nome,
            ['atv']: row.Atv,
            ['telefone']: row.Tel,
            ['hora']: row.Hora,
          }))
          .filter(sheet.getActualDate);

        listaNotificampo = rowsMapped;

        return rowsMapped;
      });
      return rowsMapped;
    });
    return rowsMapped;
  }
};
