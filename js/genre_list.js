const selection1 = document.getElementById("genre1"); 
const selection2 = document.getElementById("genre2"); 
const selection3 = document.getElementById("genre3"); 
fetchGenreList();

// Call the Spotify API that returns a list of acceptable genres, for populating the drop-down menu
function fetchGenreList() {
    let theGenres = [];
    fetch(`https://api.spotify.com/v1/recommendations/available-genre-seeds`, {
        method: 'GET', headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        }
    })
        .then((response) => {
            response.json().then(
                (data) => {
                    let theData = data.genres;
                    for (let i = 0; i < theData.length; i++) {
                        let thisGenre = theData[i];
                        theGenres.push(thisGenre);
                    }
                    populateDropdown(selection1, theGenres);
                    populateDropdown(selection2, theGenres);
                    populateDropdown(selection3, theGenres);
                });

            });
    }

// Function that populates the dropdown menus
function populateDropdown(selection, masterGenres) {
    for(var i = 0; i < masterGenres.length; i++) {
        var opt = masterGenres[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selection.appendChild(el);
    }
}
