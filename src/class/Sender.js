const Logger = require('./Logger.js');
const { Buttons } = require('whatsapp-web.js');
let log = new Logger();
let Sheet = require('./Sheet.js');
let sheet = new Sheet();

module.exports = class Sender {
  async sendMessage(contato, client) {
    client.on('ready', () => {
      console.log('Sending Message!');
      try {
        if (contato.atv && contato.atv != "Dirigente-old") {
          if (sheet.getWeek() == '1') {
            // this.msgCampoLembrete(contato, client);
            log.info(`Enviando mensagem para ${contato.nome}, o ${contato.atv}`);
          } else {
            // this.msgCampoV2(contato, client);
            // this.msgCampo(contato, client);
            log.info(`Enviando mensagem para ${contato.nome}, o ${contato.atv}`);
          }
          //TODO -> Incluir validação para Campo e TPE
          // this.msgCampo(contato, client);
          // log.info(`Enviando mensagem para ${contato.nome}, o ${contato.atv}`);
        } else {
          // console.log(sheet.getWeek());
          if (sheet.getWeek() == '2') {
            // console.log({ contato });
            this.msgCarrinho(contato, client);
            log.info(`Enviando mensagem para ${contato.d1} e ${contato.d2}`);
          }
          if (sheet.getWeek() == '1') {
            // console.log({ contato });
            // this.msgCarrinhoLembrete(contato, client);
            log.info(`Enviando mensagem para ${contato.d1} e ${contato.d2}`);
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  async msgCampo(contato, client) {
    log.info('Mensagem enviada');
    return client.sendMessage(
      `${contato.telefone}@c.us`,
      `Olá ${
        contato.nome
      }, bom dia mano! Esta é uma mensagem automática para lembrar que o irmão será o *${
        contato.atv
      }* amanhã, *${contato.data}* às *${contato.hora}*! ${
        contato.atv == 'Dirigente' && contato.territorio > 0
          ? 'Está à sua disposição o/os território(s) *' +
            contato.territorio +
            '*.'
          : ''
      }
      
*Por favor, após o término do território, responder essa mensagem com quais quadras não foram feitas e se o território foi finalizado ou não.*

Caso não possa assumir, favor contatar Matheus (71 99486598) que ele irá providenciar um substituto!  Pedimos também que _não responda por este contato, sua mensagem pode ser perdida_.

Link para as designações: https://sites.google.com/view/cong-paraiso/campo?authuser=0#h.iu786ccb9ln7`
    );
  }

  async msgCampoV2(contato, client) {

    let message = `Olá ${
      contato.nome
    }, bom dia mano! Esta é uma mensagem automática para lembrar que o irmão será o *${
      contato.atv
    }* amanhã, *${contato.data}* às *${contato.hora}*! ${
      contato.atv == 'Dirigente' && contato.territorio > 0
        ? 'Está à sua disposição o/os território(s) *' +
          contato.territorio +
          '*.'
        : ''
    }
    
*Por favor, após o término do território, responder essa mensagem com quais quadras não foram feitas e se o território foi finalizado ou não.*

Caso não possa assumir, favor contatar Matheus (71 99486598) que ele irá providenciar um substituto!  Pedimos também que _não responda por este contato, sua mensagem pode ser perdida_.

Link para as designações: https://sites.google.com/view/cong-paraiso/campo?authuser=0#h.iu786ccb9ln7`;
let button = new Buttons(message, [{ body: 'Poderei' }, { body: 'Preciso de Substituição' }], `Designação de Campo - ${contato.nome}`, 'Congregação Paraíso');
    log.info('Mensagem enviada');
    return client.sendMessage(
      `${contato.telefone}@c.us`, button
    );
  }

  async msgCampoLembrete(contato, client) {
    log.info('Lembrete de campo enviada');
    return client.sendMessage(
      `${contato.telefone}@c.us`,
      `Olá ${
        contato.nome
      }, bom dia mano! Esta é uma mensagem automática para notificar que o irmão será o *${
        contato.atv
      }* esta semana, no dia *${contato.data}* às *${contato.hora}*!
      
*Por favor, após o término do território, responder essa mensagem com quais quadras não foram feitas e se o território foi finalizado ou não.*

Caso não possa assumir, favor contatar Matheus (71 99486598) que ele irá providenciar um substituto! Pedimos também que _não responda por este contato, sua mensagem pode ser perdida_.

Link para as designações: https://sites.google.com/view/cong-paraiso/campo`
    );
  }

  async msgCarrinho(contato, client) {
    log.info('Mensagem enviada ' + contato.d1);
    client.sendMessage(
      `${contato.t1}@c.us`,
      `Olá ${contato.d1}, bom dia! Esta é uma mensagem automática para informar que tem uma designação de TPL. No *${contato.local}*, *${contato.hora}*, dia *${contato.data}* com *${contato.d2}*!
Favor, contar o irmão Júlio (11 940424104) para confirmar que poderá assumir esta designação ou informar se não puder, para que ele possa providenciar um substituto! Pedimos também que não responda por este contato, _sua mensagem poderá ser perdida_. Caso não irá assumir a designação e já tiver conversado com o irmão Júlio, favor desconsiderar essa mensagem.
      
Link para as designações: https://sites.google.com/view/cong-paraiso/campo?authuser=0#h.iarv2rg3ftb9`
    );
    log.info('Mensagem enviada ' + contato.d2);
    client.sendMessage(
      `${contato.t2}@c.us`,
      `Olá ${contato.d2}, bom dia! Esta é uma mensagem automática para informar que tem uma designação de TPL. No *${contato.local}*, *${contato.hora}*, dia *${contato.data}* com *${contato.d1}*! 
Favor, contar o irmão Júlio (11 940424104) para confirmar que poderá assumir esta designação ou informar se não puder, para que ele possa providenciar um substituto! Pedimos também que não responda por este contato, _sua mensagem poderá ser perdida_. Caso não irá assumir a designação e já tiver conversado com o irmão Júlio, favor desconsiderar essa mensagem.

Link para as designações: https://sites.google.com/view/cong-paraiso/campo?authuser=0#h.iarv2rg3ftb9`
    );
  }

  async msgCarrinhoLembrete(contato, client) {
    log.info('Mensagem enviada ' + contato.d1);
    client.sendMessage(
      `${contato.t1}@c.us`,
      `Olá ${contato.d1}, bom dia! Este é um lembrete que tem uma designação de TPL. No *${contato.local}*, *${contato.hora}*, dia *${contato.data}* com *${contato.d2}*!`
    );
    log.info('Mensagem enviada ' + contato.d2);
    client.sendMessage(
      `${contato.t2}@c.us`,
      `Olá ${contato.d2}, bom dia! Este é um lembrete que tem uma designação de TPL. No *${contato.local}*, *${contato.hora}*, dia *${contato.data}* com *${contato.d1}*!`
    );
  }

  async msgCarrinhoLembreteAdapt(contato, client) {
    if (contato.data == '01-10-22') {
      log.info('Mensagem enviada ' + contato.d1);
      client.sendMessage(
        `${contato.t1}@c.us`,
        `Olá ${contato.d1}, bom dia! Este é um lembrete que tem uma designação de TPL. No *${contato.local}*, *${contato.hora}*, dia *${contato.data}* com *${contato.d2}*!`
      );
      log.info('Mensagem enviada ' + contato.d2);
      client.sendMessage(
        `${contato.t2}@c.us`,
        `Olá ${contato.d2}, bom dia! Este é um lembrete que tem uma designação de TPL. No *${contato.local}*, *${contato.hora}*, dia *${contato.data}* com *${contato.d1}*!`
      );
    } else if (contato.data == '02-10-22') {
      client.sendMessage(
        `${contato.t1}@c.us`,
        `Olá ${contato.d1}, bom dia! No dia *${contato.data}* não teremos carrinho em virtude da eleição. Por favor desconsidere a designação enviada anteriormente.`
      );
      log.info('Mensagem enviada ' + contato.d2);
      client.sendMessage(
        `${contato.t2}@c.us`,
        `Olá ${contato.d2}, bom dia! No dia *${contato.data}* não teremos carrinho em virtude da eleição. Por favor desconsidere a designação enviada anteriormente.`
      );
    }
  }
};
