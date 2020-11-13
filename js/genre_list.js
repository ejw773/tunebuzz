const selection1 = document.getElementById("genre1");
const selection2 = document.getElementById("genre2");
const selection3 = document.getElementById("genre3");

fetchGenreList()

// Fetch the list of valid genres from Spotify, then call the function for populating the dropdown menus
function fetchGenreList() {
    // const params=new URLSearchParams()
    // params.set('userID',)
    fetch('./api/genre')
        .then(response => response.json())
        .then(genres => {
            populateDropdown(selection1, genres);
            populateDropdown(selection2, genres);
            populateDropdown(selection3, genres);
        })
};

// Function that populates the dropdown menus
function populateDropdown(selection, masterGenres) {
    for (var i = 0; i < masterGenres.length; i++) {
        var opt = masterGenres[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selection.appendChild(el);
    }
}
