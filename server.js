require('dotenv').config();
const passport = require('passport')
const express = require('express');
const app = express();
const session = require('express-session')
const fetch = require('node-fetch')

const auth = require('./auth')
// const {auth,passport}=require('./auth/auth')
const router = require('./routes/songs')
const spotifyStrategy = require('./auth/strategy/spotify')
app.use(session({
    secret: 'super-secret' || 'dev',
    cookie: { maxAge: 60000 }
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(spotifyStrategy)

app.use('/auth', auth)
app.use('/api', router)

app.use('/', express.static(__dirname + '/public'))
app.use('/js', express.static(__dirname + '/js'))
app.use("/css", express.static(__dirname + '/css'))




app.get('/', (req, res) => {
    res.send(`<h1>Hello world from server</h1>
    <h2>Session</h2>
    <pre>${JSON.stringify(req.session, null, '\t')}</pre>`)
    console.log(req.isAuthenticated())
})


app.listen(process.env.PORT, () => {
    console.log(`The server is running`)
})