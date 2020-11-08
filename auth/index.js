const express=require('express')
const router=express.Router();
const passport=require('passport');


router.get('/spotify',passport.authenticate('spotify'));

router.get('/spotify/callback',passport.authenticate('spotify',{failureRedirect:'/login'}),(req,res)=>{
    res.redirect('/dashboard.html')
});

module.exports = router