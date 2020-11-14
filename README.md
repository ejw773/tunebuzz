# Tunebuzz :speaker: :musical_note: :musical_keyboard:

![GitHub language count](https://img.shields.io/github/languages/count/ejw773/tunebuzz)
![GitHub last commit](https://img.shields.io/github/last-commit/ejw773/tunebuzz)
![GitHub contributors](https://img.shields.io/github/contributors/ejw773/tunebuzz?color=purple)
![GitHub top language](https://img.shields.io/github/languages/top/ejw773/tunebuzz?color=red)
![NPM](https://img.shields.io/npm/l/express)


**Get out of your old music rut by discovering new tunes.** :musical_note:

[Live website](https://dry-beach-63193.herokuapp.com/)

## Project Purpose
Tunebuzz is an app for all the music lovers out there who love discovering new music. The application allows a user to create a new awesome playlist after selecting (3) song genres. Once the user selects their genres they will see a new playlist displayed with new songs to dance to.

## :hammer_and_wrench: Technologies Used

- HTML
- CSS
- Javascript
- Node.js
- Express.js
- Passport.js
- PostgreSQL
- Sequelize
- Spotify API


 ## 🖥 Screenshots:
#### :point_down: Tunebuzz Home Page
![image](https://user-images.githubusercontent.com/35972972/99134351-50519c00-25eb-11eb-8c31-e4e3ee1c2363.png)
<br />
#### Tunebuzz Dashboard
![image](https://user-images.githubusercontent.com/35972972/99134365-60697b80-25eb-11eb-80ae-1fd9b763d330.png)
<br />
#### Tunebuzz Generated Playlist
![image](https://user-images.githubusercontent.com/35972972/99134379-6cedd400-25eb-11eb-9134-adcdda15818d.png)
<br />
#### Tunebuzz Contact Page
![image](https://user-images.githubusercontent.com/35972972/99134386-74ad7880-25eb-11eb-93cf-375a6c59a21a.png)
<br /> 

## ⚙ How to run 

### 1. Fork this respository
Click the Fork button on the upper right-hand side of this repository's page.
### 2. Clone the repository
1. Under the repository name, click on the code button and copy the clone URL for the repository.
2. Open your terminal and type ```git clone https://github.com/ejw773/tunebuzz```.
### 3. Open the folder
After cloning the repository, use your favorite code editor to open the folder. We recommend [Visual Studio Code](https://code.visualstudio.com/).
### 4. Install package dependencies
Run `npm install` in the project directory.
### 5. Start the server
Run `npm run start` to start the server.
### 6. View the project
Visit `http://localhost:3000` to view the project page.

## Code Snippet

Create a new playlist in Spotify

```
async function songsIntoPlaylist(playlistID, shuffledURIs) {
    let theURL = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    let theParams = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            "uris": shuffledURIs
        })
    };
    const completedPlaylist = await fetch(theURL, theParams)
        .then(response => {
            return response.json()
        })
        .then(data => data);
    return completedPlaylist;
}
```
## :busts_in_silhouette: Team Members:
  
  * Stacey Graham <br>
  [GitHub](https://github.com/stashag)

  * Heather Luttrell <br>
  [GitHub](https://github.com/possumdiva)
  
  * Lewis Ritenour <br>
  [GitHub](https://github.com/LewRit)
  
  * Elijah Wilcott <br>
  [GitHub](https://github.com/ejw773)
  
