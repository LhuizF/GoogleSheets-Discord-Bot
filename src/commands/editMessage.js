import { getChannel, msgToObj } from '../utils';

export default async function (bot, idMsg, data) {
  const { channel, roles } = await getChannel(bot);

  const lastMsg = await channel.messages
    .fetch(idMsg)
    .then((msg) => msg)
    .catch(() => false);

  const arrMsg = msgToObj(lastMsg, roles);
  const arrRow = data._rawData;
  arrRow.splice(-1, 1);

  const compareArrays = (a, b) => {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  };

  const isEqual = compareArrays(arrRow, arrMsg);

  if (isEqual) {
    console.log('nada mudou');
  }
}
