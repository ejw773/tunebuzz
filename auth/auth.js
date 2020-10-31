const express=require('express')
const auth=express.Router()
const passport=require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOT_ID,
      clientSecret: process.env.SPOT_PASS,
      callbackURL: process.env.SPOT_CALL
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      //  User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
      //   return done(err, user);
      // });
      console.log("Access Token: "+ accessToken)
      done(null,profile)
    }
  )
);

auth.get('/spotify',passport.authenticate('spotify'));

auth.get('/spotify/callback',passport.authenticate('spotify',{failureRedirect:'/login'}),(req,res)=>{
    res.redirect('/')
});
module.exports={auth,passport}