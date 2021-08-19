
const HttpError = require('http-errors');
const mongoose  = require('mongoose');
const otp       = require('in-memory-otp');

// importing auth model
const authModel = require('../models/auth');
// importing mail Handler
const { SendMail } = require('../helpers/mailSender');
// importing config
const { optValidForTime } = require('../config'); 
// importing redis connection
const redisClient      = require('./../db/init_redis');
// importing jwt helper
const jwtToken         = require('./../helpers/jwt'); 



const Signup = async(valData) => {
  
    const { email ,username } = valData;

    const Email = await DoesEmailExist(email);
    const Username = await DoesUsernameExist(username);

    return new Promise((resolve ,reject)=>{

    if(Email){
      return reject(new HttpError.BadRequest(`${email} This Email Is Already Taken`));
    }

    if(Username){   
      return reject(new HttpError.BadRequest(`${username} This Username Is Already Taken`));
    }

    const user         = new  authModel(valData);
    const savedUser    = user.save();               
    
    Send_Otp(email);

    return  resolve('ok')

    });

};

const Login = async(valData) => {


  try{

    const uid = await authModel.Authentication(valData);    
    const AccessToken  = await jwtToken.SignAccessToken(uid); 

    const RefreshToken = await jwtToken.SignRefreshToken(uid); 
                 
    return { AccessToken , RefreshToken };
      
   
  }catch(e)
  { 
    console.log(e);
     return e;
  }

};

const Logout = async(result) => {

const uid = await jwtToken.VerifyRefreshToken(result.RefreshToken);                     

return redisClient.del(uid.aud,(err,replay)=>{
    if(err)
    {  
      return next(new httpErrors.Unauthorized());
    }
    return replay;
});

             
};

const Reset_Password = async(uid,result) => {

    const data = { 
                id:uid,
                password:result.OldPassword ,
                newpassword:result.NewPassword 
            };

    const HashPass = await authModel.OldPassWordCheck(data);

    if(HashPass)
    {
        const UpdatePass = await authModel.findOneAndUpdate({_id:data.id},{password:HashPass});
       return true;
    }
  

};


const DoesEmailExist = async(email) => {

   const doesEmailExist = await authModel.findOne({email:email});
           
   return new Promise((resolve ,reject)=>{
      
    if(doesEmailExist !== null)
    {
      resolve(true);
  
    }

     resolve(false);
      
   });

  
};

const DoesUsernameExist = async(username) => {

   const doesUsernameExist = await authModel.findOne({username:username});
     
           
   return new Promise((resolve ,reject)=>{
      
    if(doesUsernameExist !== null)
    {
      resolve(true);
  
    }

     resolve(false);
      
   });

  
};

const Forgot_Password = async(email)=>{

    const Email = await DoesEmailExist(email);
    
    if(!Email)
    {   
    return new Promise((resolve ,reject)=>{
        return reject(new HttpError.BadRequest(`We Does Not Found Any Account With ${email} This Email`));
    });

    }
    // send otp mail
    Send_Otp(email);

    return 'ok';

};


const Send_Otp = async(email)=>{

    otp.startOTPTimer(new Date().getTime());

    const userOTP = otp.generateOTP(email, optValidForTime );

    const payload ={ otp : userOTP }; 

    SendMail(
                email,
                'Otp Verification',
                'Otp',
                payload
            ); 

     return 'ok';       

}

const Verify_Otp = async(result) => {

const Otpresult = otp.validateOTP(result.email, result.otp);

if(Otpresult){
    const UpdateStaus = await authModel.findOneAndUpdate({email:result.email},{account:'verified'},{new:true});
    const AccessToken  = await jwtToken.SignAccessToken(UpdateStaus); 
    const RefreshToken = await jwtToken.SignRefreshToken(UpdateStaus); 
    return { AccessToken , RefreshToken } ;
  }else{
    return false;
  }

};

const New_Password = async(result,uid) => {
      
      const HashPass = await authModel.HashPass(result.newpass);

      const UpdatePass = await authModel.findOneAndUpdate({_id:uid},{password:HashPass});
      
     return true;
};  

const Delete_Account = async(uid)=>{
   
      const temp = await authModel.findOneAndDelete({_id:uid});
      return true;

};

const Refresh_Token = async(result) => {
    
    
    const uid   = await jwtToken.VerifyRefreshToken(result.RefreshToken);                     
    
    const data =  {
                    _id:uid.aud ,
                    username :uid.username,
                    email:uid.email
                  };


    const AccessToken  = await jwtToken.SignAccessToken(data); 
    const RefreshToken = await jwtToken.SignRefreshToken(data); 
      
    return { AccessToken , RefreshToken };


    };

module.exports = {

Forgot_Password ,
DoesEmailExist ,
Signup,
Login,
Logout,
Reset_Password,
Verify_Otp,
New_Password,
Delete_Account,
Refresh_Token

};