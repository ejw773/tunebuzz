const express=require('express')
const router=express.Router();
const passport=require('passport');


router.get('/spotify',passport.authenticate('spotify',{
    scope:['playlist-modify-public','streaming']
}));

router.get('/spotify/callback',passport.authenticate('spotify',{failureRedirect:'/index.html'}),(req,res)=>{
    res.redirect('/dashboard.html')
});

module.exports = router