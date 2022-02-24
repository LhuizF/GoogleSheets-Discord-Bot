import { MessageEmbed } from 'discord.js';
import bot from '../config/discord';

export const getGuild = async () => {
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

export const makerEmbed = (data) => {
  const embeds = [];

  embeds.push(
    new MessageEmbed()
      .setColor('#00D718')
      .setFooter({
        text: `${data.rowNumber} - ${data.date}`
      })
      .setImage(data.images[0] || '')
      .setFields(
        {
          name: 'Operador',
          value: data.operador
        },
        {
          name: 'Atendimento(à)ao',
          value: data.serviceTo,
          inline: true
        },
        {
          name: 'ID Aluno',
          value: data.studentId,
          inline: true
        },
        {
          name: 'Descrição do atendimento:',
          value: data.description
        }
      )
  );

  if (data.images.length > 1) {
    data.images.map((img, i) => {
      if (i === 0) return;
      embeds.push(new MessageEmbed().setImage(img || '').setColor('#00D718'));
    });
  }

  return { content: `Time responsável <@&${data.team}>`, embeds };
};

export const checkDate = (data, roles) => {
  const head = data._sheet.headerValues;

  const date = data[head[0]];
  const operador = data[head[1]];
  const serviceTo = data[head[2]];
  const studentId = data[head[3]];
  const description = data[head[4]];
  const image = data[head[5]];
  const team = data[head[6]];
  const msgId = data[head[7]];

  const imgs = image
    ? image
        .replace(/\n/g, ' ')
        .split(' ')
        .filter((img) => img)
    : '';

  const mentionTeam = roles.find((role) => role.name === team);

  if (
    !date ||
    !team ||
    !operador ||
    !serviceTo ||
    !studentId ||
    !description ||
    !mentionTeam
  ) {
    return false;
  }

  return {
    rowNumber: data.rowNumber.toString(),
    date,
    operador,
    serviceTo,
    studentId,
    description,
    images: imgs,
    team: mentionTeam.id,
    msgId
  };
};

export const msgToArray = (msg, roles) => {
  const embed = msg.embeds[0];

  const date = embed.footer.text.split(' ')[2];
  const operador = embed.fields[0].value;
  const serviceTo = embed.fields[1].value;
  const studentId = embed.fields[2].value;
  const description = embed.fields[3].value;
  const image = embed.image?.url || '';
  const teamId = msg.content.replace(/[^0-9]/g, '');
  const team = roles.find((role) => role.id === teamId);

  if (msg.embeds.length > 1) {
    const images = msg.embeds
      .map((item) => {
        return item.image?.url;
      })
      .toString();

    return [
      date,
      operador,
      serviceTo,
      studentId,
      description,
      images,
      team.name
    ];
  }

  return [date, operador, serviceTo, studentId, description, image, team.name];
};
