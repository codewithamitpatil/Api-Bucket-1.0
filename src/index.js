
//importing Server Related packages
const   express = require('express');
const   cors = require('cors');
const   bodyParser = require('body-parser');
const   helmet = require('helmet');
const   HttpError = require('http-errors');
const   compression = require('compression');
const   methodOverride = require('method-override');

// importing mongodb connection
const  db = require('./db/mongo_init');

// intialize  env variables
require('dotenv').config();

// importing logger
//const logger = require('./logger/index');
//const statusMonitor = require('./logger/statusMonitor');

// importing error handler middleware
const {
        ErrorResponse ,
        Error404
      } = require('./middlewares/errorHandler');

// importing api routes 
const apiRoutes = require('./routes/index');

// global configrations
const { port , timeDelay } = require('./config'); 

// intialize app
   const app = express();

// server health monitor
 //  app.use(statusMonitor);

// enable cors
app.use('*',cors());

// Helmet: Set Headers for protection 
   app.use(helmet({contentSecurityPolicy: false,}));

// compress all
   app.use(compression());


// Support PUT, DELETE on client where it doesn't work
   app.use(methodOverride());

// server request logger
require('./logger/morgan-req-logger')(app);

// static folder intialize
app.use(express.static('./../public'));

// for json  parsing
app.use(bodyParser.json());

// for urlencode data parsing
app.use(bodyParser.urlencoded({extended:true}));

// intialize api routes
app.use('/api',apiRoutes);

// demo req 
app.get('/:id', (req, res) => {

  const msg = 'welcome from amit';
  res.send(msg.repeat(1000));

});

//  404 error handler
app.all('*',Error404);

// global error handler
app.use(ErrorResponse);

// intialize server
const listen = () => {
  app.listen(port,()=>{
   // console.log('server running');
    //   logger.info(`Server is listening on port : ${port}`);
  });
}

//start mongodb connection
  db()
  .on('error', err => { 
   //  logger.error('Failed to connect to mongo on startup - retrying in '+ timeDelay +' sec');
  })
  .on('disconnected', () => { 
   //  setTimeout(connect, timeDelay * 1000 )
  })
  .once('open', () => {
      console.log(' MongoDB connected Successfully!!!')
   //   logger.info(' MongoDB connected Successfully!!!')
      // start server
      listen();
  });




