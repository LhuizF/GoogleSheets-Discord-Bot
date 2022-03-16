import bot from '../../config/discord';

const getGuild = async () => {
  const guild = bot.guilds.cache.get(process.env.GUILD_ID);

  if (!guild) return;

  const channel = guild.channels.cache.get(process.env.CHANNEL_ID);

  const roles = await guild.roles.fetch().then((role) => role);

  if (!channel || !roles) return;

  return {
    guild,
    channel,
    roles
  };
};

export default getGuild;
