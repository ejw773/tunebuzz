window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'BQDp0Yx-XB0Qn3vu02lkBVA1-l18r-vY_dMxSPdzNmzugTLoDrkvnejHtrLzTgsC2ceiGU24iwdw_sLw9GlIE_E84Na5Kj9EsAclxsdBg3AQkN2m8NoibB9WUhOTUvqZhlNcre-XusCNEDq4MAWa1-CRG60e5j1LAQ';
    const player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });
  
    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });
  
    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });
  
    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });
  
    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });
  
    // Connect to the player!
    player.connect();
  };