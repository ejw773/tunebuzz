// $().ready(()=>{
    console.log('js is running.')
    // $('#getSong').submit ((e)=>{
        // e.preventDefault()
        function getSong(){
        fetch(`https://api.spotify.com/v1/playlists/52F3fjwogLegW4w5XAt1Hl/tracks?market=US`,{
        method:'GET',
        headers:{
            'Authorization':`Bearer BQDS0js7WrWk0_liJ7js3sxf7q5LowoI2vv7Hmo1_5Bo7K0xx0UbkQ4GW4rpy7POYe16HsynUKrAhluBif4WgtAAFM6j99BV0zQE6kbjbYDwghDSHb0RjRt81G4IlKCwuZ1_x7_Wvf6jaSmPU37Pltps168SzNoUWw`
        }
    })
        .then(response => response.json())
        .then(data => {
            // let playlist_id=jdsl2bsrp0c47vaugpc4pc8er
            console.log(data)
        async function track() {
            const songs=await data.items.map(item =>{
                return item.track.name
                })
                $('#tracks').html(`<h5>${songs}</h5>`)
                // console.log(item.track.name)
        }
         track()   
            // console.log(data.items.track.name)
        })
    }
    // })
// })
