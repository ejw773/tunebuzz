// const e = require("express");

// (1) Creates a new playlist on Spotify, and saves its ID in playlistID
// (2) Pulls 5 song recommendations from 3 different genres and randomizes them into shuffledURIs
<<<<<<< HEAD
// (3) 

// const e = require("express");


// Need to find a better solution to the hard coded accessToken below
const accessToken = "BQAXIzYM7CoPCYAyB_oSVorHWyccAfniVQQf_bKET7-TzB2e4cBoa1kXjloFSngBArbIZlF8S0LUMLK2vh0o76_dqq0o4n_iVg19aArkufSDdQ4rET5sQvvyjubmAspzEhv_nIsJ3E-e0yzefgy2UuyHLz67vbJ6tzAY6_F90Yo"
const user_id = "possumdiva";
=======
// add query params to URL
async function playlistGet(musicGenre1,musicGenre2,musicGenre3){
   return await fetch(`http://localhost:3000/api/playlist?musicGenre1=${musicGenre1}&musicGenre2=${musicGenre2}&musicGenre3=${musicGenre3}&userID=2`)
    .then (response=>response.json())
    
}
>>>>>>> 6cf6ec7bd69fe28e82b21a8620b546a11e4fdb74

// Call the fetchSongs function 3 times, passing in the different genre names each time, and saves the Spotify IDs as three separate arrays
async function submitGenres() {
    let firstDropdown = document.getElementById("genre1");
    let secondDropdown = document.getElementById("genre2");
    let thirdDropdown = document.getElementById("genre3");
    let musicGenre1 = firstDropdown.options[firstDropdown.selectedIndex].text;
    let musicGenre2 = secondDropdown.options[secondDropdown.selectedIndex].text;
    let musicGenre3 = thirdDropdown.options[thirdDropdown.selectedIndex].text;
    console.log(musicGenre1);
    console.log(musicGenre2);
    console.log(musicGenre3);

  
    let currentPlaylist = await playlistGet(musicGenre1,musicGenre2,musicGenre3)
    let playlistID = currentPlaylist.id;
    console.log(typeof playlistID);
    console.log(playlistID);
    let embeddedPlayer = document.getElementById('embedded_player');
    console.log(embeddedPlayer);
    let tempID = "1Kv9bdJzdgZW6KjfFkA9TL";
    let playerHTML = `<iframe class="player" src="https://open.spotify.com/embed/playlist/${playlistID}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    console.log(playerHTML);
    embeddedPlayer.innerHTML = '';
    embeddedPlayer.innerHTML = playerHTML;
}