import { getGuild, makerEmbed, msgToArray, checkDate } from '../utils';
import statusMessage from './statusMessage';

export default async function (idMsg, data) {
  const { channel, roles } = await getGuild();

  const lastMsg = await channel.messages
    .fetch(idMsg)
    .then((msg) => msg)
    .catch(() => false);

  const message = checkDate(data, roles);
  if (!message || !lastMsg) return;

  const arrMsg = msgToArray(lastMsg, roles);
  const arrRow = data._rawData;
  arrRow.splice(-1, 1);

  arrRow[3] = arrRow[3] || '-';
  arrRow[4] = arrRow[4].replace(/ /g, '');
  arrRow[5] = arrRow[5].replace(/\s+/g, ',');

  const compareArrays = (a, b) => {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  };

  const isEqual = compareArrays(arrRow, arrMsg);
  if (isEqual) return;

  const msg = makerEmbed(message);

  lastMsg.edit(msg).then(() => {
    const [{ footer }] = msg.embeds;
    const [line] = footer.text.split(' ');

    statusMessage(`Mensagem editada - linha ${line} - 📝`, '#F3E415');
  });
}
