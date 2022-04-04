import { MessageEmbed } from 'discord.js';
import { getGuild } from '../utils';
import statusMessage from '../commands/statusMessage';

class AcademyController {
  async send(req, res) {
    console.log(req.body);
    const { academy, roles } = await getGuild();
    const roleAcademy = roles.find((role) => role.name === 'Produtos');

    const embeds = new MessageEmbed()
      .setColor('#F86700')
      .setTitle(
        'Um novo curso acaba de ser adicionado para análise no Academy'
      );

    const message = {
      content: `Time responsável <@&${roleAcademy.id}>`,
      embeds: [embeds]
    };

    academy
      .send(message)
      .then(() => {
        statusMessage('Alerta do academy enviado com sucesso - 🎓', ' #F86700');
        return res
          .status(200)
          .json({ message: 'Mensagem enviada com sucesso' });
      })
      .catch((err) => {
        console.log(err);

        return res.status(400).json({ message: 'Mensagem não enviada' });
      });
  }
}

export default new AcademyController();
