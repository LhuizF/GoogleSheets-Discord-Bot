import { getGuild, makerEmbed, msgToObj, checkDate } from '../utils';

export default async function (bot, idMsg, data) {
  const { channel, roles } = await getGuild(bot);

  const lastMsg = await channel.messages
    .fetch(idMsg)
    .then((msg) => msg)
    .catch(() => false);

  const message = checkDate(data, roles);
  if (!message || !lastMsg) return;

  const arrMsg = msgToObj(lastMsg, roles);
  const arrRow = data._rawData;
  arrRow.splice(-1, 1);

  const compareArrays = (a, b) => {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  };

  const isEqual = compareArrays(arrRow, arrMsg);

  if (isEqual) return;

  const embed = makerEmbed(message, bot);
  lastMsg.edit(embed);
}
