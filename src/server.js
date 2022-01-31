import 'dotenv/config';
import express from 'express';
import main from './app';
import bot from './config/discord';
import getDocGoogleSheet from './config/googleSheet';

const app = express();

app.listen(5000);

app.get('/', (req, res) => {
  const date = new Date().toLocaleTimeString();
  console.log(`Online, ${date} ✅`);
  return res.json('okay');
});

bot.on('ready', () => {
  if (!bot.user) return;
  console.log(`${bot.user.username} online 🤖`);

  getDocGoogleSheet().then((doc) => {
    const sheet = doc.sheetsByIndex[0];
    console.log('Connected ⚙️');

    sheet.getRows().then((rows) => {
      const lastTenRow = rows.slice(-10);
      main(bot, lastTenRow);
    });
  });
});
