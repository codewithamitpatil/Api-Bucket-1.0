
const morgan = require('morgan');
const moment = require('moment');
const fsr    = require('file-stream-rotator');
const { env,logLevel,logPath} = require('../config'); 


morgan.token('date', (req, res) => moment().format('YYYY-MM-DD HH:MM:SS'));

morgan.format('LogFormat', '[:date]":remote-addr :method :url" :status  - :response-time ms');

const accessLogStream = fsr.getStream({
  filename: logPath + '/access-%DATE%.logs',
  frequency: 'daily', 
  verbose: false
});

// export module

if(env === 'development'){
    module.exports = app => app.use(morgan('dev'));
}else{
   module.exports = app => app.use(morgan('LogFormat', {stream: accessLogStream}));
}
