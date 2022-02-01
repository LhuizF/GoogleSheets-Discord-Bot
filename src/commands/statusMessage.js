import { getGuild } from '../utils';
import { MessageEmbed } from 'discord.js';
export default async function (bot) {
  const { guild } = await getGuild(bot);

  const channel = guild.channels.cache.get(process.env.CHECK_CHANNEL_ID);
  if (!channel) return;

  const embed = new MessageEmbed().setColor('#09D319').setTitle('Online  ✅');
  // .setAuthor({
  //   name: bot.user.username,
  //   iconURL: bot.user.displayAvatarURL()
  // });

  channel.send({ embeds: [embed] });
}
