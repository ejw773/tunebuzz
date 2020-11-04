// $().ready(()=>{
    console.log('js is running.')
    // $('#getSong').submit ((e)=>{
        // e.preventDefault()
        function getSong(){
        fetch(`https://api.spotify.com/v1/playlists/52F3fjwogLegW4w5XAt1Hl/tracks?market=US`,{
        method:'GET',
        headers:{
            'Authorization':`Bearer BQCn1kO46ziZ0SSrej61ueyZ7-jgHFzJrIFY6y5wdjsQMzVCEZV386TuTs1Awd0F-kuL3j9jUlLw32CK5QyytAtOLvRFvB6PhWvLt7VvC-oqI-WMssS8LWT8YWHvABxpFqQNZ1Z0Upm7Tst_gXovBUWJsIUUjG4E2g`
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
