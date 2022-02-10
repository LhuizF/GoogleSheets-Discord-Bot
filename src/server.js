import 'dotenv/config';
import express from 'express';
import main from './app.js';
import bot from './config/discord.js';
import getDocGoogleSheet from './config/googleSheet.js';
import statusMessage from './commands/statusMessage.js';

const app = express();

app.listen(process.env.APP_PORT || 5000);

app.get('/', (req, res) => {
  const date = new Date().toLocaleTimeString();
  statusMessage(bot);
  console.log(`Online, ${date} ✅`);
  return res.json('okay');
});

bot.on('ready', () => {
  if (!bot.user) return;
  console.log(`${bot.user.username} online 🤖`);

  getDocGoogleSheet().then((doc) => {
    const sheet = doc.sheetsByIndex[0];
    console.log('Connected ⚙️');
    setInterval(() => {
      sheet.getRows().then((rows) => {
        const lastTenRow = rows.slice(-10);
        main(bot, lastTenRow);
      });
    }, 3000);
  });
});
