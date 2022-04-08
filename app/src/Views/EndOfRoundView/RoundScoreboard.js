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


}
export default RoundScoreboard;