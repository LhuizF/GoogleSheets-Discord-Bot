import { GoogleSpreadsheet } from 'google-spreadsheet';

const privateKey = process.env.PRIVATE_KEY;

const getDocGoogleSheet = async () => {
  const doc = new GoogleSpreadsheet(process.env.SPREAD_SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.CLIENT_EMAIL,
    private_key: privateKey.replace(/\\n/g, '\n')
  });
  await doc.loadInfo();
  return doc;
};

export default getDocGoogleSheet;
