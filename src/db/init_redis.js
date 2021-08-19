
const redis = require('redis');
const { redisDb } = require('./../config/index');

const client = redis.createClient(redisDb);

client.on('connect',async()=>{
  console.log('redis connected');
});

client.on('error',async(err)=>{
  console.log(err.message);
});

client.on('end',async()=>{
  console.log('redis end');
});

process.on('SIGINT',()=>{
   client.quit();
   process.exit(0);
});

module.exports = client;



