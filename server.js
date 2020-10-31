require('dotenv').config();
const express=require('express');
const app=express();
const session=require('express-session')

const {auth,passport}=require('./auth/auth')
app.use(session({
    secret:'super-secret'||'dev',
    cookie:{maxAge:60000}
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth',auth)

passport.serializeUser(function(user, done) {
    //What goes INTO the session here; right now it's everything in User
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
    //This is looking up the User in the database using the information from the session "id"
});


app.get('/',(req,res)=>{
    res.send(`<h1>Hello world from server</h1>
    <h2>Session</h2>
    <pre>${JSON.stringify(req.session, null, '\t')}</pre>`)
    console.log(req.isAuthenticated())
})






app.listen(process.env.PORT,()=>{
    console.log(`The server is running`)
})