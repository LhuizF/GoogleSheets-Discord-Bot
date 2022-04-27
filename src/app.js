import sendMessage from './commands/sendMessage';
import editMessage from './commands/editMessage';
import productsMessage from './Controller/productsMessage';
class Main {
  operacoes(data) {
    data.map(async (row) => {
      if (!row.msgId) {
        const msgId = await sendMessage(row);

        if (msgId) {
          row.msgId = msgId;
          row.save();
        }

        return;
      }

      const idMsg = row.msgId;
      editMessage(idMsg, row);
    });
  }

  produtos(data) {
    data.map(async (row) => {
      if (!row.id) {
        productsMessage.send(row);
        const id = false;

        if (id) {
          row.msgId = id;
          row.save();
        }
      }
    });
  }
}

export default new Main();
