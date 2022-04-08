/* eslint-disable one-var */
class RoundScoreboard{

    constructor(){
        this.roundScoreboard = document.getElementById("roundScoreboard");
        this.scoreTemplate = document.getElementById("userWithScore");
        this.scoreboardView = document.getElementById("roundEnd");
        this.storyListView = document.getElementById("roundStories");
  
    }
    updateScoreboard(players){
        this.roundScoreboard.innerHTML= "";
        players.forEach(player => {
            if(player !==null){
                let name = this.scoreTemplate.content.getElementById("username"),
                points = this.scoreTemplate.content.getElementById("points");
                name.content = player.name;
                points.content = player.points;

                let clone = document.importNode(this.scoreTemplate.content, true);
                this.roundScoreboard.appendChild(clone);
            }
        });
    }

    sortByPoints(players){
        let sortedPlayers = [];

        for(let i = 0; i<players.length; i++){
            if(i === 0){
                sortedPlayers.push(players[i]);
            }
            else{
                for(let j = 0; j<sortedPlayers.length; j++){
                if(players[i].points > sortedPlayers[j].points){
                    sortedPlayers.splice(j,0,players[i]);
                    break;
                }
                else(sortedPlayers.push(players[i]))
            }
        }
        return sortedPlayers;
    }


}
export default RoundScoreboard;