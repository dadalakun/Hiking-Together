import mongo from './src/mongo.js';
import server from './src/server.js';

mongo.connect();
const port = 5001;

server.start({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
