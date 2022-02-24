import { getGuild, checkDate, makerEmbed } from '../utils';
import statusMessage from './statusMessage';

export default async function (lastRow) {
  const { channel, roles } = await getGuild();

  const message = checkDate(lastRow, roles);

  if (!message) return;
  const embed = makerEmbed(message);

  return channel
    .send(embed)
    .then((msg) => {
      const [{ footer }] = msg.embeds;
      const [line] = footer.text.split(' ');

      statusMessage(`Mensagem enviada - linha ${line} - 📨`, '#1aa7ec');
      return msg.id;
    })
    .catch((err) => console.log(err));
}
