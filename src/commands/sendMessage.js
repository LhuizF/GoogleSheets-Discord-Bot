import { getGuild, checkDate, makerEmbed } from '../utils';

export default async function (bot, lastRow) {
  const { channel, roles } = await getGuild(bot);

  const message = checkDate(lastRow, roles);

  if (!message) return;
  const embed = makerEmbed(message);

  return channel
    .send(embed)
    .then((msg) => {
      console.log('Mensagem enviado 📨');
      return msg.id;
    })
    .catch((err) => console.log(err));
}
