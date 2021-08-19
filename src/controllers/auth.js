
const httpErrors       = require('http-errors');
const nodemailer       = require('nodemailer');
const otp              = require('in-memory-otp');

// includes
const AuthValidations  = require('./../validations/auth');

// importing auth service
const authService = require('./../services/auth');

module.exports = {

//  Signup  
    Signup:async(req,res,next) => {

    const valData = await AuthValidations.Signup.validateAsync(req.body);
    await authService.Signup(valData);
    return res.status(200).json({ 
    "status":200,
    "msg":"Your Account created successfully.Please Verify Email To Activate your acount ",

    });

    }
,

//  Login 
    Login:async(req,res,next) => {
  
        const valData = await AuthValidations.Login.validateAsync(req.body);
        const data = await authService.Login(valData);    
        return  res.send(data);
 
    }
,

//  Reset Password
    Reset_Password:async(req,res,next) => {
    
      const uid = req.payload.aud;
      const valData = await AuthValidations.Change_Password.
                            validateAsync(req.body);
      const data = await authService.Reset_Password(uid,valData);
      return res.json({status:'200',msg:'Password Updated Successfully'});
       
    }    
,

//  Delete Account 
    Delete_Account:async(req,res,next)=>{
      
      const uid = req.payload.aud;
      const temp = await authService.Delete_Account(uid);
      return res.json({'status':'200','msg':'Account Deleted Successfully'});

    }
,
//  Logout
    Logout : async(req,res,next) => {
        const valdata = await AuthValidations.Refresh_Token.validateAsync(req.body);
        const data = await authService.Logout(valdata);
        return res.json({
                  'status':200,
                  'msg':'user logged out successfully'
                });
        
    }
,

//  Refresh-Token 
    Refresh_Token:async(req,res,next) => {
    
    const valData = await AuthValidations.Refresh_Token.validateAsync(req.body);
    const data = await authService.Refresh_Token(valData);
    return res.send(data);
 
    }
,

//  Forgot Password 
    Forgot_Password:async(req,res,next)=>{

    const {email} = await AuthValidations.ForgotPass
                          .validateAsync(req.body);  
 
    const check = await authService.Forgot_Password(email);

    res.json({
        "status":200,
        "msg":"Check Your Email For The OTP ",
        "email":email
    });

    }
,

//  New Password 
    New_Password:async(req,res,next)=>{
      
      const uid =req.payload.aud;

      const valData = await AuthValidations.NewPass.
                            validateAsync(req.body);

      const HashPass = await authService.New_Password(valData,uid);

      return res.status(200).json({'status':200,'msg':'Your Password Changed SuccessFully.Now You Can Login With New Password'});
      
    }  
,

//  Verify Otp  
    Verify_Otp:async(req,res,next)=>{

    const valData  = await AuthValidations.VerifyOtp.validateAsync(req.body);  
    const data     =  await authService.Verify_Otp(valData);
    
    if(data){
      const { AccessToken , RefreshToken } = data;  
      return res.json( {'status':200,'msg':'Your Account Has Been Verified Successfully',AccessToken , RefreshToken});
    }else{
      return next(new httpErrors.Unauthorized(`The OTP You Entered Is Invalid .Plz Enter The Correct Otp`));
    }

    }    
    
}




















