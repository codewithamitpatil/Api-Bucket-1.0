// for development
const development = {
  env:'development',
  port: process.env.PORT || 3000,
 
  // for jwt
  private_access_key:"amit is the best",
  private_refresh_key:"amit is the best",

  // for otp
  optValidForTime : 5 ,// mins

  // for logger
  logLevel:'silly',
  logPath : './../logs/', 
  // for mongodb
  mongodb: 'mongodb://localhost:27017/Task_1',
  mongodbOptions: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  // for redis
  redisDb:{
    port:6379,
    host:'127.0.0.1'
  },
 
  timeDelay:30,
  // for nodemailer
  nodemailerOptions:{
      service: "gmail",
      auth:{
            user: 'amitwebdev2019@gmail.com',
            pass: '8888565473'
           } ,
      tls: {
            rejectUnauthorized: false
           }
  },
  adminMail:'amitwebdev2019@gmail.com',
  // static folder path
  publicFolder:'http://localhost:3001/'


};

// for production
const production = {
  env:'production',
  // for jwt
  private_access_key:"amit is the best",
  private_refresh_key:"amit is the best",
  
  // for otp
  optValidForTime : 5 ,// mins

  logLevel:'silly',
  logPath : './logs/',
  port: process.env.PORT || 3001,
  mongodb:'mongodb+srv://amit_1:Amit123@authentication.qq25p.mongodb.net/auth?retryWrites=true&w=majority',
  mongodbOptions: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
    mongodbLogOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  
  timeDelay:30,

   // for redis
    redisDb:{
      port:17140,
      password:'61JlUUpoNN3t7m5KI7XhrSSmRaXVPmEE',
      host:'redis-17140.c245.us-east-1-3.ec2.cloud.redislabs.com'
    },
 

  // for nodemailer
  nodemailerOptions:{
      service: "gmail",
      auth:{
            user: 'amitwebdev2019@gmail.com',
            pass: '8888565473'
           } ,
      tls: {
            rejectUnauthorized: false
           }
  },
  adminMail:'amitwebdev2019@gmail.com',
  // static folder path
  publicFolder:'https://apibuckets.herokuapp.com/'

};


const isProduction =true;

if (isProduction){
   console.log('Production Env');
}else{
   console.log('Development Env');
}

//loadtest -c 100 --rps 1000  https://apibuckets.herokuapp.com/1
//heroku logs -t --app apibuckets

// module exports
module.exports = isProduction
  ? { ...production  }
  : { ...development };
