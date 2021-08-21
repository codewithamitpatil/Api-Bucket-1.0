
   const mongoose    = require('mongoose');
   const bcrypt      = require('bcrypt');
   const httpErrors  = require('http-errors');
   const passwordHash = require('password-hash');

// User Schema
   const UserSchema = mongoose.Schema({

    username :  {
                type:String,
                required:true,
                unique:true
                },
    email    :  {
                type:String,
                required:true,
                unique:true
                },
    password :  {
                type:String,
                required:true
                },
     account :  {
                 type:String,
                 required:false,
                 default:'notverified'
                }           

   });

// for password hashing
   UserSchema.pre('save',async function(next){
  
  
    //  this.password    =  hashpass ;   
      this.password = passwordHash.generate(this.password);
       console.log(this.password);
      return next();

   });


// For Hashing New Password    
   UserSchema.statics.HashPass = async function(pass) {
      
       const salt       =  await bcrypt.genSalt(10);
       const hashpass   =  await bcrypt.hash(pass,salt);
       
       return hashpass;

   }


  const passCheck = async(pass1,pass2)=>{
     const temp = passwordHash.verify(pass1,pass2);
     console.log(temp);
     return temp;
  }


// Authentication Check Middleware (Authcheck)
   UserSchema.statics.Authentication = async function(data) {

      const { username , password } = data;

      const user = await this.findOne({

      $or:[ 
         {username:username}, {email:username} 
         ]    

      });

     
      const verifyCheck = await this.findOne({

      username:username, account :'verified'    

      });
      
      let temp = false;

      if(user !== null ) {
        temp   = await passCheck(password,user.password);
      }

      return new Promise((resolve ,reject)=>{
   
      if(!user) {
       reject(new httpErrors.Unauthorized('Invalid Username or Password')); 

      }
     
       if(!temp){
         reject(new httpErrors.Unauthorized('Invalid Username or Password')); 
       }


      if(!verifyCheck){
      return reject(new httpErrors.BadRequest('Your Account is not verified')); 
      }

      return resolve(user);
      });

   }

// Old Passwrd Check 
   UserSchema.statics.OldPassWordCheck = async function(data) {
    
    const user = await this.findOne({ _id:data.id });
      
    const passcheck = await passwordHash.verify(data.password,user.password);
  
    if(!passcheck)
    {
        return new httpErrors.BadRequest('password doesnot match with old password'); 
         return;
    }
    

    const hashpass  =  await passwordHash.generate(data.newpassword,salt);
 
    return hashpass;

   }

// User Model (Collection)
   const User = mongoose.model('Authentication',UserSchema);

// Export Module
   module.exports = User;
