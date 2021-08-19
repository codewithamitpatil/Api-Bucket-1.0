
const rateLimit  = require("express-rate-limit");

const limiter = rateLimit({

  windowMs: 5 * 60 * 1000, // 1 hour window
  max:5, // start blocking after 5 requests
  handler: function(req, res , next) {
     res.status(200).json({"status": 499 ,"message":"too many attempts , please try again after 5 mins"});
  }

});

// module exports
module.exports = limiter;
