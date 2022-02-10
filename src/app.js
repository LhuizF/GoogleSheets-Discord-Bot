import sendMessage from './commands/sendMessage.js';
import editMessage from './commands/editMessage.js';

export default async function (bot, data) {
  data.map(async (row) => {
    if (!row.msgId) {
      const msgId = await sendMessage(bot, row);

      if (msgId) {
        row.msgId = msgId;
        row.save();
      }

      return;
    }

    const idMsg = row.msgId;
    editMessage(bot, idMsg, row);
  });
}
