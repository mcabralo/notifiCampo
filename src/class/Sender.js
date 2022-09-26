const Logger = require('./Logger.js');
let log = new Logger();
let Sheet = require('./Sheet.js');
let sheet = new Sheet();

module.exports = class Sender {
  async sendMessage(contato, client) {
    client.on('ready', () => {
      // console.log('Sending Message!');
      try {
        if (contato.atv) {
          //TODO -> Incluir validação para Campo e TPE
          this.msgCampo(contato, client);
          log.info(`Enviando mensagem para ${contato.nome}, o ${contato.atv}`);
        } else {
          // console.log(sheet.getWeek());
          if (sheet.getWeek() == '1') {
            // console.log({ contato });
            this.msgCarrinho(contato, client);
            log.info(`Enviando mensagem para ${contato.d1} e ${contato.d2}`);
          }
          if (sheet.getWeek() == '5') {
            // console.log({ contato });
            this.msgCarrinhoLembrete(contato, client);
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
        contato.atv == 'Dirigente'
          ? 'Está à sua disposição o/os território(s) *' +
            contato.territorio +
            '*.'
          : ''
      }
      
Caso não possa assumir, favor contatar Matheus (71 99486598) que ele irá providenciar um substituto!  Pedimos também que _não responda por este contato, sua mensagem pode ser perdida_.

Link para as designações: https://sites.google.com/view/cong-paraiso/campo?authuser=0#h.iu786ccb9ln7`
    );
  }

  async msgCarrinho(contato, client) {
    log.info('Mensagem enviada ' + contato.d1);
    client.sendMessage(
      `${contato.t1}@c.us`,
      `Olá ${contato.d1}, bom dia! Esta é uma mensagem automática para informar que tem uma designação de TPL. No *${contato.local}*, *${contato.hora}*, dia *${contato.data}* com *${contato.d2}*!
Caso não possa assumir, favor contatar diretamente o rimão Julio (11 940424104) que ele irá providenciar um substituto! Pedimos também que _não responda por este contato, sua mensagem pode ser perdida_.
      
Link para as designações: https://sites.google.com/view/cong-paraiso/campo?authuser=0#h.iarv2rg3ftb9`
    );
    log.info('Mensagem enviada ' + contato.d2);
    client.sendMessage(
      `${contato.t2}@c.us`,
      `Olá ${contato.d2}, bom dia! Esta é uma mensagem automática para informar que tem uma designação de TPL. No *${contato.local}*, *${contato.hora}*, dia *${contato.data}* com *${contato.d1}*! 
      
Caso não possa assumir, favor contatar diretamente o rimão Julio (11 940424104) que ele irá providenciar um substituto! Pedimos também que _não responda por este contato, sua mensagem pode ser perdida_.

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
};
