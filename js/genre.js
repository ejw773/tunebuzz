const accessToken = "BQDyJMUV-ZyYkh-m52PiyAJgq03Bw3aiBeOi0U0byOopnli0s-DUujcRgQrko41vfBywMesW3P_lHeDctQG50kfwzBmiDnIyXJOAC2FQtxhzcByECbc08-_YeL9m30we2dhwq6A0-RZV476LMKRbCw"

function fetchData() {
    fetch('https://api.spotify.com/v1/recommendations?limit=25&seed_genres=acoustic', {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then((response) => {
                console.log(response.json().then(
                    (data) => { console.log(data) }
                ));
            });
        }

