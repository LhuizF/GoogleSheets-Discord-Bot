import { getGuild, makerEmbed, msgToArray, checkDate } from '../utils/index.js';

export default async function (bot, idMsg, data) {
  const { channel, roles } = await getGuild(bot);

  const lastMsg = await channel.messages
    .fetch(idMsg)
    .then((msg) => msg)
    .catch(() => false);

  const message = checkDate(data, roles);
  if (!message || !lastMsg) return;

  const arrMsg = msgToArray(lastMsg, roles);
  const arrRow = data._rawData;
  arrRow.splice(-1, 1);

  arrRow[5] = arrRow[5].replace(/\s+/g, ',');

  const compareArrays = (a, b) => {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  };

  const isEqual = compareArrays(arrRow, arrMsg);
  if (isEqual) return;

  const embed = makerEmbed(message);
  lastMsg.edit(embed).then(() => console.log('Mensagem editada 📝'));
}
