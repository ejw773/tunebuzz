const SpotifyStrategy = require('passport-spotify').Strategy;
const passport=require('passport')
const db=require('../../models')

const spotifyStrategy = new SpotifyStrategy(
    {
      clientID: process.env.SPOT_ID,
      clientSecret: process.env.SPOT_PASS,
      callbackURL: process.env.SPOT_CALL
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      db.Users.findOrCreate({ 
      where: {
        spotifyID: profile.id,
        username: profile.username,
        country: profile.country
       },
      }).then(([profile, created]) => {
        //  store access token
        console.log('profile is '+ JSON.stringify(profile))
        db.Users.update({
          spotifyAccessToken: accessToken,
          spotifyRefreshToken: refreshToken,
        }, {
          where: {
            id: profile.id
          },
          returning: true // returns the user after update
        }).then(result => {
          console.log('result is '+ JSON.stringify(result))
          profile = result[1][0]; // get user

          done(null, profile)
        })
        .catch(e=>{
            console.log('error', e)
        })
      console.log("Access Token: "+ accessToken)
      done(null,profile)
    })
    }
);

passport.serializeUser(function(user, done) {
  //What goes INTO the session here; right now it's everything in User
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
  //This is looking up the User in the database using the information from the session "id"
});

module.exports = spotifyStrategy