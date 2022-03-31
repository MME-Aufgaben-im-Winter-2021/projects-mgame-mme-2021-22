/* eslint-disable one-var */

class PlayerList{
    constructor(playerNames){
        this.playerList = document.getElementById("playerList");
        this.playerTemplate = document.getElementById("player-data");
        console.log(typeof(playerNames));
        console.log(playerNames.length);
        for (let player of playerNames){
            if(player !== null){
                console.log(player);
                let th = this.playerTemplate.content.querySelector("th"),
                td = this.playerTemplate.content.querySelectorAll("td");
                th.textContent = "PlayerNumber";
                td[0].textContent = player;
                td[1].textContent = "connected";

                let clone = document.importNode(this.playerTemplate.content, true);
                this.playerList.appendChild(clone);
            } 
        }
    }
}

export default PlayerList;