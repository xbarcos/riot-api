import React, { useState } from 'react';
import axios from 'axios'; 
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [playerData, setPlayerData] = useState({});
  const API_KEY = "RGAPI-65355e4b-935d-4363-9819-1c1470191b79"
  
  function searchForPlayer(event) {
    var APICallString = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + "?api_key=" + API_KEY;
    axios.get(APICallString).then(function (response) {
      setPlayerData(response.data);
    }).catch(function(error){
      console.log(error);
    })
  }
  console.log(playerData);

  return (
    <div className="App">
      <div className="container">
        <h5>Lolzinho</h5>
        <input type="text" onChange={ e => setSearchText(e.target.value) }></input>
        <button onClick={ e => searchForPlayer(e) }>Search</button>
      </div>

      {JSON.stringify(playerData) != '{}' ? 
        <div>
          <p>{playerData.name}</p>
          <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/12.15.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
          <p>Level: {playerData.summonerLevel}</p>
        </div>
        : 
        null
      }
    </div>
  );
}

export default App;
