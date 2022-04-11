/* eslint-disable one-var */

import { AppwriteDAL } from "../../../services/AppwriteService.js";

//Scoreboard View displays round score or final score
class RoundScoreboard {

  constructor() {
    this.DAL = new AppwriteDAL();
    this.roundScoreboard = document.getElementById("roundScoreboard");
    this.scoreTemplate = document.getElementById("userWithScore");
    this.scoreboardView = document.getElementById("roundEnd");
    this.storyListView = document.getElementById("roundStories");

  }
  
  updateScoreboard(storyDocs, playerDocs) {
    //TO DO move calculation and appwrite call to roundendmanager
    this.roundScoreboard.innerHTML = "";
    playerDocs.forEach(player => {
      
        let name = this.scoreTemplate.content.getElementById("username"),
          points = this.scoreTemplate.content.getElementById("points"),
          playerStory = storyDocs.find(story => story.Player === player.PlayerName);
        try{name.innerHTML = player.PlayerName;
          points.innerHTML = player.PlayerScore + " ( +" + playerStory.Score + ")";}catch(error){
            name.innerHTML = player.PlayerName;
          points.innerHTML = player.PlayerScore + " ( + 0 )" ;
          }
        
        let newScore = player.PlayerScore + playerStory.Score;
        this.DAL.updatePlayerScore(player.$id, newScore);
        let clone = document.importNode(this.scoreTemplate.content, true);
        this.roundScoreboard.appendChild(clone);
      
    });
  }

  sortByPoints(players) {
    let sortedPlayers = [];

    for (let i = 0; i < players.length; i++) {
      if (i === 0) {
        sortedPlayers.push(players[i]);
      } else {
        for (let j = 0; j < sortedPlayers.length; j++) {
          if (players[i].points > sortedPlayers[j].points) {
            sortedPlayers.splice(j, 0, players[i]);
            break;
          } else { sortedPlayers.push(players[i]); }
        }
      }

    }
    return sortedPlayers;
  }
}
export default RoundScoreboard;