require('dotenv').config();
const express=require('express');
const app=express();
const session=require('express-session')
const passport=require('passport')

app.use(session({
    secret:'super-secret'||'dev',
    cookie:{maxAge:60000}
}))

app.get('/',(req,res)=>{
    res.send('hello world')
})






app.listen(process.env.PORT,()=>{
    console.log(`The server is running`)
})