import sendMessage from './commands/sendMessage';
import editMessage from './commands/editMessage';

export default async function (bot, data) {
  data.map(async (row) => {
    if (!row['ID Msg']) {
      const msgId = await sendMessage(bot, row);
      row['ID Msg'] = msgId;
      row.save();
    }
    const idMsg = row['ID Msg'];
    editMessage(bot, idMsg, row);
  });
}
