import { MessageEmbed } from 'discord.js';

const makerEmbed = (data) => {
  try {
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

    const teams = data.team
      .map((t) => `<@&${t}>`)
      .toString()
      .replace(',', '/');

    return { content: `Time responsável ${teams}`, embeds };
  } catch (e) {
    console.log(e);
  }
};

export default makerEmbed;
