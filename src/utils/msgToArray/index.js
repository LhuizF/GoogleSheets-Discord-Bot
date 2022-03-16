const msgToArray = (msg, roles) => {
  const embed = msg.embeds[0];

  const date = embed.footer.text.split(' ')[2];
  const operador = embed.fields[0].value;
  const serviceTo = embed.fields[1].value;
  const studentId = embed.fields[2].value;
  const description = embed.fields[3].value;
  const image = embed.image?.url || '';
  const teamId = msg.content
    .split('/')
    .map((team) => team.replace(/[^0-9]/g, ''));

  const team = [];

  roles.find((role) => {
    if (teamId.includes(role.id)) {
      team.push(role.name);
    }
  });

  const strTeam = team.reverse().toString().replace(',', '/');

  if (msg.embeds.length > 1) {
    const images = msg.embeds
      .map((item) => {
        return item.image?.url;
      })
      .toString();

    return [date, operador, serviceTo, studentId, description, images, strTeam];
  }

  return [date, operador, serviceTo, studentId, description, image, strTeam];
};

export default msgToArray;
