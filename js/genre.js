// const e = require("express");

// (1) Creates a new playlist on Spotify, and saves its ID in playlistID
// (2) Pulls 5 song recommendations from 3 different genres and randomizes them into shuffledURIs
// (3) 

// const e = require("express");


// Need to find a better solution to the hard coded accessToken below
const accessToken = "BQDBKCGrweBE0HC4hLCgsof6F1G-hp0F5-eETSA81pmrpG2u3ZxCfMbPXQi-P35SW2A2P98i-huSa65apv1cvOOnb7Cze_gaAyhM3JceX2i8D5Dpcu0EPvxrG71b6K5v1sO2GN_E_NDLW5vM52MKUOgEf07EIu73dInFDQ7yb2k"
const user_id = "possumdiva";
// add query params to URL
async function playlistGet(musicGenre1, musicGenre2, musicGenre3) {
    return await fetch(`http://localhost:3000/api/playlist?musicGenre1=${musicGenre1}&musicGenre2=${musicGenre2}&musicGenre3=${musicGenre3}&userID=2`)
        .then(response => response.json())

}

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


    let currentPlaylist = await playlistGet(musicGenre1, musicGenre2, musicGenre3)
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