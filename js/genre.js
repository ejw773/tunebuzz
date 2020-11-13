// On click, grab the three genre names, and pass each one to the playlistGet() function; 
async function submitGenres() {
    let firstDropdown = document.getElementById("genre1");
    let secondDropdown = document.getElementById("genre2");
    let thirdDropdown = document.getElementById("genre3");
    let musicGenre1 = firstDropdown.options[firstDropdown.selectedIndex].text;
    let musicGenre2 = secondDropdown.options[secondDropdown.selectedIndex].text;
    let musicGenre3 = thirdDropdown.options[thirdDropdown.selectedIndex].text;
    let currentPlaylist = await playlistGet(musicGenre1, musicGenre2, musicGenre3)
    let playlistID = currentPlaylist.id;
    let embeddedPlayer = document.getElementById('embedded_player');
    let playerHTML = `<iframe class="player" src="https://open.spotify.com/embed/playlist/${playlistID}" frameborder="0" width="300" height="380" allowtransparency="true" allow="encrypted-media"></iframe>`;
    embeddedPlayer.innerHTML = '';
    embeddedPlayer.innerHTML = playerHTML;
}

// add query params to URL
async function playlistGet(musicGenre1, musicGenre2, musicGenre3) {
    return await fetch(`http://localhost:3000/api/playlist?musicGenre1=${musicGenre1}&musicGenre2=${musicGenre2}&musicGenre3=${musicGenre3}&userID=2`)
        .then(response => response.json())

}
