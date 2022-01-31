import { getChannel, checkDate, makerEmbed } from '../utils';

export default async function (bot, lastRow) {
  const { channel, roles } = await getChannel(bot);

  const message = checkDate(lastRow, roles);
  const contentMsg = makerEmbed(message);

  return channel.send(contentMsg).then((msg) => msg.id);
}
