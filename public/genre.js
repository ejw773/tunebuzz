let genreList = [];
const searchBars = document.getElementsByClassName("searchBars")[0];
const genreBar1 = document.getElementById("genreBar-1");
const genreBar2 = document.getElementById("genreBar-2");
const genreBar3 = document.getElementById("genreBar-3");
const searchList = document.getElementsByClassName("searchList")[0];



const accessToken = "BQAnSw7oozCozhjwphBtXVjUhFlg5pnMYciiemvrVxO8eD-LcG4nguGuBM37ZBDz19gj0rR4XSWBNg0-LFPkeC2av-IxB4CqdxBXrBQjKg4cpJBByy571DGApYG-CY_Kzk8RuI-tRF0"
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
function autoSearch(event, bar) {
    console.log(event.target);
    let value = event.target.value;
    // const searchData = document.querySelector(".searchBar-1", ".searchBar-2")


    // searchData.querySelectorAll("ul").remove();
    for (let i = 0; i < genreList.length; i++) {
        if (genreList[i].includes(value)) {
            const myLi = document.createElement("li");
            myLi.innerText = genreList[i];
            myLi.addEventListener("click", function () {
                bar.value = genreList[i];
                console.log(bar);

            })
            myUl.append(myLi);
        }
    }

    searchList.append(myUl)
}
// autoSearch();
// const genreBar1 = document.querySelector("#genreBar-1")
genreBar1.addEventListener("input", function (event) {
    autoSearch(event, genreBar1);
});
// const genreBar2 = document.querySelector("#genreBar-2")
genreBar2.addEventListener("input", function (event) {
    autoSearch(event, genreBar2);
});
// const genreBar3 = document.querySelector("#genreBar-3")
genreBar3.addEventListener("input", function (event) {
    autoSearch(event, genreBar3);
});

