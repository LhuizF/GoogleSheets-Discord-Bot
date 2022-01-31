import { Client, Intents } from 'discord.js';

const bot = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

bot.login(process.env.DISCORD_TOKEN);

export default bot;
