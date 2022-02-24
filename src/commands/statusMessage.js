import { MessageEmbed } from 'discord.js';
import { getGuild } from '../utils';

export default async function (log, color) {
  const { guild } = await getGuild();

  const channel = guild.channels.cache.get(process.env.CHECK_CHANNEL_ID);
  if (!channel) return;

  const embed = new MessageEmbed().setColor(color).setTitle(log);

  channel.send({ embeds: [embed] });
}
