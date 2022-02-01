import sendMessage from './commands/sendMessage';
import editMessage from './commands/editMessage';

export default async function (bot, data) {
  data.map(async (row) => {
    if (!row.msgId) {
      const msgId = await sendMessage(bot, row);

      row.msgId = msgId;
      row.save();
      return;
    }

    const idMsg = row.msgId;
    editMessage(bot, idMsg, row);
  });
}
