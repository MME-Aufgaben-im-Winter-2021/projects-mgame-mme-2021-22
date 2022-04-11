/* eslint-disable one-var */
import Config from "../../utils/Config.js";

class LobbyView {
  constructor() {
    this.playerList = document.getElementById("playerList");
    this.playerTemplate = document.getElementById("player-data");
    this.lobbyView = document.getElementById("lobby");
    //settings
    this.roundCountSlider = document.getElementById("round-count");
    this.roundLengthSlider = document.getElementById("round-length");
    this.roundCountInput = document.getElementById("input-round-count");
    this.roundLengthInput = document.getElementById("input-round-length");

  }

  setHidden(isHidden) {
    this.lobbyView.hidden = isHidden;
  }

  updateView(playerNames, rounds, duration) {
    this.updatePlayerList(playerNames);
    this.updateSettings(rounds, duration);
  }

  updateSettings(rounds, duration) {
    if (rounds !== null) {
      if (rounds <= Config.MAX_ROUNDS && rounds >= Config.MIN_ROUNDS) {
        this.roundCountInput.value = rounds;
        this.roundCountSlider.value = rounds;
      }
      if (rounds > Config.MAX_ROUNDS) { this.roundCountInput.value = Config
          .MAX_ROUNDS; }
      if (rounds < Config.MIN_ROUNDS) { this.roundCountInput.value = Config
          .MIN_ROUNDS; }
    }
    if (duration !== null) {
      if (duration <= Config.MAX_ROUND_DURATION && duration >= Config
        .MIN_ROUND_DURATION) { this.roundLengthInput.value = duration;
        this.roundLengthSlider.value = duration; }
      if (duration > Config.MAX_ROUND_DURATION) { this.roundLengthInput.value =
          Config.MAX_ROUND_DURATION; }
      if (duration < Config.MIN_ROUND_DURATION) { this.roundLengthInput.value =
          Config.MIN_ROUND_DURATION; }
    }
  }

  updatePlayerList(playerNames) {
    //erase old playerlsit
    while (this.playerList.childNodes.length > Config.PLAYER_LIST_UI_ELEMENTS) {
      this.playerList.removeChild(this.playerList.lastChild);
    }
    for (let i= 0; i<playerNames.length; i++) {
      let player = playerNames[i];
      if (player !== null) {
        let th = this.playerTemplate.content.querySelector("th"),
          td = this.playerTemplate.content.querySelectorAll("td");
        th.textContent = i+1;
        td[0].textContent = player;
        td[1].textContent = "connected";

        let clone = document.importNode(this.playerTemplate.content, true);
        this.playerList.appendChild(clone);
      }
    }
  }
}

export default LobbyView;