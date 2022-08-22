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
      <h1>League Finder</h1>
      <div class="container">
        <input class="player-input" type="text" placeholder="Digite um Nickname" onChange={ e => setSearchText(e.target.value) }></input>
        <button class="material-symbols-outlined"onClick={ e => searchForPlayer(e) }>search</button>
      </div>

      {JSON.stringify(playerData) !== '{}' ? 
        <div class="player-container">
          <div class="flex">
            <img class="icon" alt="Icone de Invocador" src={"http://ddragon.leagueoflegends.com/cdn/12.15.1/img/profileicon/" + playerData.profileIconId + ".png"}></img>
            <p>{playerData.name}</p>
            <p>Level: {playerData.summonerLevel}</p>
          </div>
        </div>
        : 
        null
      }
    </div>
  );
}

export default App;
