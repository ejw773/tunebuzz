const express=require('express')
const router=express.Router()
const db=require('../models')

router.get('/songs',async (req,res)=>{
    let songList=await db.song.findAll()
    res.send(songList)
})
router.get('/songs/:id', async(req,res)=>{
    let songID=parseInt(req.params.id)
    const song=await db.song.findByPk(songID);

    if (song){
        res.send(song)
    } else{
        res.status(404).send('Song not found')
    }
})




module.exports=router