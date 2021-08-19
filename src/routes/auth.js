
   const express         = require('express');
   const router          = express.Router();
   
  // importing async handler to avoid try catch
   const asyncHandler = require('../middlewares/asyncHandler');

  // importing rate limiter
  const rateLimit = require('../middlewares/ratelimiter');

// includes
   const AuthController  = require('./../controllers/auth');
   const UserAuthGard    = require('./../helpers/jwt');

// signup
   router.post('/signup',asyncHandler(AuthController.Signup)); 
// login
   router.post('/signin',rateLimit,asyncHandler(AuthController.Login)); 
// logout
   router.post('/logout',asyncHandler(AuthController.Logout)); 
// Reset Password
   router.post('/reset-pass',UserAuthGard.VerifyAccessToken,asyncHandler(AuthController.Reset_Password)); 
// Delete Account
   router.delete('/',UserAuthGard.VerifyAccessToken,asyncHandler(AuthController.Delete_Account)); 
// refresh token 
   router.post('/refresh-token',asyncHandler(AuthController.Refresh_Token)); 
// forgot-password 
   router.post('/forgot-pass',asyncHandler(AuthController.Forgot_Password)); 
// New Password
   router.post('/new-pass',UserAuthGard.VerifyAccessToken,asyncHandler(AuthController.New_Password)); 
// Verify Otp
   router.post('/verify-otp',asyncHandler(AuthController.Verify_Otp)); 
  
// export routes
   module.exports = router;















