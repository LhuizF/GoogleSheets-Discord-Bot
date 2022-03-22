import statusMessage from '../../commands/statusMessage';

const checkDate = (data, roles) => {
  const head = data._sheet.headerValues;

  const date = data[head[0]];
  const operador = data[head[1]];
  const serviceTo = data[head[2]];
  const studentId = data[head[3]] || '-';
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

  if (!date || !team || !operador || !serviceTo || !description) {
    statusMessage(`Dados incompletos - 🎲`, '#F35B15');
    return false;
  }

  const teams = team.split('/');
  const idTeams = [];

  roles.find((role) => {
    if (teams.includes(role.name)) {
      idTeams.push(role.id);
    }
  });

  if (idTeams.length === 0) {
    statusMessage('Cargo não encontrado - ❌', '#F84043');
    return;
  }

  return {
    rowNumber: data.rowNumber.toString(),
    date,
    operador,
    serviceTo,
    studentId,
    description,
    images: imgs,
    team: idTeams.reverse(),
    msgId
  };
};

export default checkDate;
