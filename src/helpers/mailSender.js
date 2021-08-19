
const nodemailer   = require('nodemailer');

// importing config
const { nodemailerOptions ,adminMail } = require('../config');

// importing mail templates
const { 
    ExceptionTemplate, LogsTemplate,
    Template2nd, OtpTemplate
} = require('../utils/mailTemplate/index');


// module exports
module.exports = {

SendMail:async(To,Subject,Type,Payload)=>{

   let template;
   const transport = nodemailer.createTransport(nodemailerOptions);

    switch(Type) {
        case 'Exception':
        template = await ExceptionTemplate(Payload);    
        break;
        case 'Logs':
        template = await LogsTemplate();  
        break;
        case 'Otp':
        template = await OtpTemplate(Payload);  
        break;

        default:
        template = await Template2nd();    
    }
    // return template;
    transport.sendMail({
        from: adminMail,
        to: To,
        subject:Subject,
        html: template
    });

}

}