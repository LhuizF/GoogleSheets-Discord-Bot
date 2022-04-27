import bot from '../../config/discord';

const getGuild = async () => {
  const guild = bot.guilds.cache.get(process.env.GUILD_ID);

  if (!guild) return;

  const channel = guild.channels.cache.get(process.env.CHANNEL_ID);

  const academy = guild.channels.cache.get(process.env.ACADEMY_CHANNEL_ID);

  const doubts = guild.channels.cache.get(process.env.DOUBTS_CHANNEL_ID);

  const roles = await guild.roles.fetch().then((role) => role);

  if (!channel || !roles) return;

  return {
    guild,
    channel,
    roles,
    academy,
    doubts
  };
};

export default getGuild;
