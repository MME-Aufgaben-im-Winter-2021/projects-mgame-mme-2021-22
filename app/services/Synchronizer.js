/* eslint-disable no-alert */
import { AppwriteDAL } from "./AppwriteService.js";
import Config from "../src/utils/Config.js";
import LobbyView from "../src/Views/LobbyView/LobbyView.js";
import GameManager from "../src/Model/GameManager.js";
var lobbyView = new LobbyView(),
  currentGameState = "";

class Synchronizer {
  constructor() {
    this.gameManager = new GameManager();
  }

  subscribeToGame() {
    let DAL = new AppwriteDAL();
    console.log("subscribed with sync");
    DAL.subscribe();
  }

  updateSession(payload) {
    if (payload.$id !== window.localStorage.getItem(Config
        .DOCUMENT_STORAGE_KEY)) {
      alert(Config.CONNECTION_UNSTABLE_WARNING);
      return false;
    }

    switch (payload.GameState) {
      case Config.LOBBY_WAITING:
        this.handleUpdateInLobby(payload);
        break;
      case Config.GAME_STARTED:
        this.handleUpdateInRound(payload);
        break;
      case Config.ROUND_ENDED:
        this.handleUpdateInRoundEnd(payload);
        break;
      case Config.RATING_PHASE:
        this.handleUpdateInRating(payload);
        break;
      case Config.GAME_ENDED:
        break;
      case Config.SESSION_ENDED:
        break;
      default:
        return false;
    }
    //if gamestate changed -> synchronize Game State
    //if round changed -> synchronize round
    //if meme collection received -> display collection rating

    return false;
  }

  handleUpdateInLobby(payload) {
    //if already waiting in lobby only update content values
    if (currentGameState === Config.LOBBY_WAITING) {
      console.log("Update lobby content.");
      lobbyView.updateView(payload.UserIDs, payload.RoundCount, payload
        .RoundDuration);
    }
    //else switch ui to lobby
    else {
      console.log("Switch to lobby through update.");
      lobbyView.updateView(payload.UserIDs, payload.RoundCount, payload
        .RoundDuration);
      currentGameState = Config.LOBBY_WAITING;
    }
  }

  handleUpdateInRound(payload) {
    let DAL = new AppwriteDAL();
    if (currentGameState === Config.GAME_STARTED) {
    //update prompt
    console.log("Updated Prompt");
    this.gameManager.setPrompt(payload.Prompt);
    } else {
      console.log("Switched to Round through Update");
      DAL.setRoundCount(payload.RoundCount);
      DAL.setRoundDuration(payload.RoundDuration);
      lobbyView.setHidden(true);
      this.gameManager.setGameStatePlay();
      currentGameState = Config.GAME_STARTED;
    }
  }

  handleUpdateInRating() {
    //download all meme docs once and ignore following updates for now
    if (currentGameState === Config.RATING_PHASE) { console.log(
        "Update in rating ignored!"); } else { currentGameState = Config
        .RATING_PHASE;
      this.gameManager.setGameStateRate(); }
  }

  handleUpdateInRoundEnd() {
    if (currentGameState !== Config
    .ROUND_ENDED) { console.log("Round ended"); this.gameManager.setGameStateRoundEnd(); currentGameState = Config.ROUND_ENDED; } else{console.log("Update in Round end ignored!");}
  }

  //Host ends round early if all players submit meme before timer runs out
  checkForSubmissions() {
    return false;
  }
}

export default Synchronizer;