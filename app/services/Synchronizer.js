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
    DAL.subscribe();
  }

  updateSession(payload) {
    if (payload.$id !== window.localStorage.getItem(Config
        .DOCUMENT_STORAGE_KEY)) {
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
        this.handleUpdateInGameEnd(payload);
        break;
      case Config.SESSION_ENDED:
        this.handleSessionEnd(payload);
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
      lobbyView.updateView(payload.UserIDs, payload.RoundCount, payload
        .RoundDuration);
    }
    //else switch ui to lobby
    else {
      lobbyView.updateView(payload.UserIDs, payload.RoundCount, payload
        .RoundDuration);
      currentGameState = Config.LOBBY_WAITING;
    }
  }

  handleUpdateInRound(payload) {
    let DAL = new AppwriteDAL();
    if (currentGameState === Config.GAME_STARTED) {
      //update prompt
      this.gameManager.setPrompt(payload.Prompt);
    } else {
      DAL.setRoundCount(payload.RoundCount);
      DAL.setRoundDuration(payload.RoundDuration);
      lobbyView.setHidden(true);
      this.gameManager.setGameStatePlay();
      currentGameState = Config.GAME_STARTED;
    }
  }

  handleUpdateInRating() {
    //download all meme docs once and ignore following updates for now
    if (currentGameState !== Config.RATING_PHASE) {
      currentGameState = Config
        .RATING_PHASE;
      this.gameManager.setGameStateRate();
    }
  }

  handleUpdateInRoundEnd() {
    if (currentGameState !== Config
      .ROUND_ENDED) {
      this.gameManager.setGameStateRoundEnd();
      currentGameState = Config.ROUND_ENDED;
    }
  }

  handleUpdateInGameEnd() {
    if (currentGameState !== Config.GAME_ENDED) {
      currentGameState = Config.GAME_ENDED;
    }
  }

  handleSessionEnd() {
    if (window.localStorage.getItem(Config.ROLE_KEY) !== Config.HOST_ROLE) {
      window.localStorage.clear();
      window.location.replace("homepage.html");
    }

  }

  //Host ends round early if all players submit meme before timer runs out
  checkForSubmissions() {
    return false;
  }
}

export default Synchronizer;