import { MongoClient } from 'mongodb';

const user = 'admin';
const userPwd = 'XkHoZDTFTCBxBlsb';
const cluster = 'tinyhouse-v1.c3hzl';

const url = `mongodb+srv://${user}:${userPwd}@${cluster}.mongodb.net/<dbname>?retryWrites=true&w=majority`;

export const connectDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('main');

  return {
    listings: db.collection('test_listings'),
  };
};
