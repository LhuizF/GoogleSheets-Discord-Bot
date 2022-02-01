import { MessageEmbed } from 'discord.js';

export const getGuild = async (bot) => {
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

export const makerEmbed = (data, bot) => {
  const embed = new MessageEmbed()
    .setColor('#00D718')
    .setFooter({
      text: `${data.rowNumber} - ${data.date}`
    })
    .setAuthor({
      name: bot.user.username,
      iconURL: bot.user.displayAvatarURL()
    })
    .setImage(data.image || '')
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
    );

  return { content: `Time responsável <@&${data.team}>`, embeds: [embed] };
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
    console.log('dados incompletos');
    return false;
  }

  return {
    rowNumber: data.rowNumber.toString(),
    date,
    operador,
    serviceTo,
    studentId,
    description,
    image,
    team: mentionTeam.id,
    msgId
  };
};

export const msgToObj = (msg, roles) => {
  const embed = msg.embeds[0];

  const date = embed.footer.text.split(' ')[2];
  const operador = embed.fields[0].value;
  const serviceTo = embed.fields[1].value;
  const studentId = embed.fields[2].value;
  const description = embed.fields[3].value;
  const image = embed.image?.url || '';
  const teamId = msg.content.replace(/[^0-9]/g, '');

  const team = roles.find((role) => role.id === teamId);

  return [date, operador, serviceTo, studentId, description, image, team.name];
};
