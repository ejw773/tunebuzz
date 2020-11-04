$().ready(()=>{
    console.log('js is running.')
    fetch(`https://api.spotify.com/v1/playlists/52F3fjwogLegW4w5XAt1Hl/tracks?market=US`,{
        method:'GET',
        headers:{
            'Authorization':`Bearer BQBe67Kxzlr2hcR9Xvtfms7H27MgKxUemamQEAVCbOhIEcrrEKJPDAQ6kU3mAcM1H_5REnP6Dgdijk4mqEAoxkpdcfNjiuhqTqtEYfuyYpLd-q4KJJfWOaRokMYuFwSVfiiPaPwQvzk0StQ2jW7zP6h8atLxN0NsPw`
        }
    })
    .then(response => response.json())
    .then(data => {
        // let playlist_id=jdsl2bsrp0c47vaugpc4pc8er
        console.log(data)
        console.log(data.items.track.name)
})
});
