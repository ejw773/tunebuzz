const express=require('express')
const auth=express.Router()
const passport=require('passport')
const refresh=require('passport-oauth2-refresh')
const SpotifyStrategy = require('passport-spotify').Strategy;
const Users = require('../models').User

const strategy=  new SpotifyStrategy(
    {
      clientID: process.env.SPOT_ID,
      clientSecret: process.env.SPOT_PASS,
      callbackURL: process.env.SPOT_CALL
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      Users.findOrCreate({ 
      where: {
        spotifyId: profile.id,
        username: profile.username,
        country: profile.country
       },
      }).then(([users, created]) => {
        //  store access token
        Users.update({
          spotifyAccessToken: accessToken
        }, {
          where: {
            id: users.id
          },
          returning: true // returns the user after update
        }).then(result => {
          users = result[1][0]; // get user

          done(null, users)
        })
      })
      console.log("Access Token: "+ accessToken)
      done(null,profile)
    
    }
);
passport.use(strategy);
refresh.use(strategy);

auth.get('/spotify',passport.authenticate('spotify'));

auth.get('/spotify/callback',passport.authenticate('spotify',{failureRedirect:'/login'}),(req,res)=>{
    res.redirect('/')
});
module.exports={auth,passport}