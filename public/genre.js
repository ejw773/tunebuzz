let genreList = [];
// Write Javascript code!
const accessToken = "BQAY0neg3s3x44ZIVailx8DaUVdjoOzHx_vTVgQ5OtihiK4hTRwzpnM9UncuecBfacymbj_4cbEVxglcsEz_PcWUw8f9TcoAvCJK6JIjlD8Bdk9LOk5GYdgZsfTVVWoqYvNr5SkynaE"
fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds?limit=50', {
    method: 'GET', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
    }
})
    .then((response) => {
        response.json().then(
            (data) => {
                genreList = data.genres
            }
        );
    });

// const appDiv = document.getElementById("app");
// appDiv.innerHTML = `<h1>JS Starter</h1>`;
// const genreBar = document.createElement("input");
const myUl = document.createElement("ul");
// genreBar.setAttribute("type", "text");
// appDiv.appendChild(genreBar);
// appDiv.append(myUl);
function autoSearch(event) {
    console.log(event.target);
    let value = event.target.value;
    const searchData = document.querySelector(".searchBar-1", ".searchBar-2")

    // searchData.querySelectorAll("ul").remove();
    for (let i = 0; i < genreList.length; i++) {
        console.log(i);
        if (genreList[i].includes(value)) {
            const myLi = document.createElement("li");
            myLi.innerText = genreList[i];
            myLi.addEventListener("click", function () {
                console.log(genreList[i]);
            })
            myUl.append(myLi);
        }
    }

    searchData.append(myUl)
}
// autoSearch();
const genreBar1 = document.querySelector("#genreBar-1")
genreBar1.addEventListener("input", function (event) {
    autoSearch(event);
});
const genreBar2 = document.querySelector("#genreBar-2")
genreBar2.addEventListener("input", function (event) {
    autoSearch(event);
});
const genreBar3 = document.querySelector("#genreBar-3")
genreBar3.addEventListener("input", function (event) {
    autoSearch(event);
});

