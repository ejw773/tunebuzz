const express=require('express')
const auth=express.Router()
const passport=require('passport')
const refresh=require('passport-oauth2-refresh')
const SpotifyStrategy = require('passport-spotify').Strategy;
const User=require('../models').User

const strategy=  new SpotifyStrategy(
    {
      clientID: process.env.SPOT_ID,
      clientSecret: process.env.SPOT_PASS,
      callbackURL: process.env.SPOT_CALL
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate({ 
      where: {
        spotifyId: profile.id,
        username: profile.username,
        country: profile.country
       },
      }).then(([profile, created]) => {
        //  store access token
        User.update({
          spotifyAccessToken: accessToken
        }, {
          where: {
            id: user.id
          },
          returning: true // returns the user after update
        }).then(result => {
          user = result[1][0]; // get user

          done(null, user)
        })
      console.log("Access Token: "+ accessToken)
      done(null,profile)
    })
    }
);
passport.use(strategy);
refresh.use(strategy);

passport.serializeUser(function(user, done) {
  //What goes INTO the session here; right now it's everything in User
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
  //This is looking up the User in the database using the information from the session "id"
});

auth.get('/spotify',passport.authenticate('spotify'));

auth.get('/spotify/callback',passport.authenticate('spotify',{failureRedirect:'/login'}),(req,res)=>{
    res.redirect('/dashboard.html')
});
module.exports={auth,passport}