import { MessageEmbed } from 'discord.js';
import { getGuild } from '../utils';

class ProductsMessage {
  async send(row) {
    const colors = {
      baixa: '#94EFFB',
      medio: '#FFC001',
      alta: '#FF1900'
    };

    const headerValues = row._sheet.headerValues;

    const fields = headerValues
      .map((header) => {
        if (header === 'id') return;
        return {
          name: header,
          value: row[header] || '-'
        };
      })
      .filter((a) => a);

    const trigged = row.STATUS;

    const { doubts, roles } = await getGuild();

    const products = roles.find((role) => role.name === 'Produtos');

    const embeds = new MessageEmbed()
      .setColor(colors[row[headerValues[2]]])
      .setFields(fields.map((field) => field))
      .setTitle(
        'Um novo curso acaba de ser adicionado para análise no Academy'
      );

    const message = {
      content: `Time responsável <@&${products.id}>`,
      embeds: [embeds]
    };

    // doubts.send(message);
  }
}

export default new ProductsMessage();
