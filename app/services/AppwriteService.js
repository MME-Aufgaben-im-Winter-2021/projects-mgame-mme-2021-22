/* eslint-disable no-alert */
/* global Appwrite, Query */
import Config from "../src/utils/Config.js";
import Synchronizer from "./Synchronizer.js";

// Init your Web SDK
// eslint-disable-next-line no-undef
const appwrite = new Appwrite();

appwrite
  .setEndpoint(
    "https://appwrite.software-engineering.education/v1",
  ) // Your Appwrite Endpoint
  .setProject("62066432a2c67cb3f59e") // Your project ID
;

//Data Access Layer to Appwrite Collections and LocalStorage
class AppwriteDAL {
  constructor() {
    if (AppwriteDAL.instance instanceof AppwriteDAL) {
      return AppwriteDAL.instance;
    }
    this.sdk = appwrite;
    Object.freeze(this);
    AppwriteDAL.instance = this;
  }

  //create an account with appwrite
  //some pages check for valid login/acc before letting you open it
  register(nickname, email, password) {
    this.sdk.account.create("unique()", email, password,
      nickname);

    alert(Config.REGISTER_SUCCESS);
    //tell the user he actually made an account XD
  }

  signIn(email, password) {
    let promise = this.sdk.account.createSession(email, password);

    promise.then(function() {
      //user logged into his account successfully
      window.location.replace("homepage.html");
    }, function() {
      alert("Your password must be at least 8 characters long!");
    });
  }

  //client subscribes to all Session Documents 
  //callback from Synchronizer handles payload
  subscribe() {
    let channel = "collections." + Config.SESSIONS_COLLECTION_ID +
      ".documents",
      sync = new Synchronizer();

    try {
      this.sdk.subscribe(channel, function(response) {
        sync.updateSession(response
          .payload);
      });
    } catch (error) { alert(error); }

  }

  //Player opens Session Document and sets himself host in localStorage
  //Player creates Player Doc linked to Session ID
  async hostGame() {
    let promise = await this.sdk.database.createDocument(Config
      .SESSIONS_COLLECTION_ID,
      "unique()", {
        "UserIDs": [
          this.getUsername(),
        ],
        "RoundCount": Config.DEFAULT_ROUNDS,
        "RoundDuration": Config.DEFAULT_ROUND_DURATION,
        "GameState": "lobby",
      }, ["role:all"], ["role:all"]);

    try {
      window.localStorage.setItem(Config.DOCUMENT_STORAGE_KEY, promise.$id);
      window.localStorage.setItem(Config.ROLE_KEY, Config.HOST_ROLE);
      // eslint-disable-next-line no-unused-vars
      let player = await this.sdk.database.createDocument(Config
        .PLAYER_COLLECTION_ID, "unique()", { "PlayerName": this
          .getUsername(), "PlayerScore": 0, "GameSession": getDocumentIDFromLocalStorage() },
          ["role:all"], ["role:all"],
        );
     
    } catch (error) { alert(error); }

    return promise;
  }

  //Get all player documents of this session from appwrite db
  async getPlayers() {
    let promise = await this.sdk.database.listDocuments(Config
      .PLAYER_COLLECTION_ID, [Query.equal("GameSession",
        getDocumentIDFromLocalStorage())], Config.MAX_DOCUMENTS);
    return promise.documents;
  }

  //get current username, game session persistent only
  getUsername() {
    return window.localStorage.getItem("username");
  }

  //Update Session Document in Appwrite DB with Round Prompt
  updatePrompt(prompt) {
    this.sdk.database.updateDocument(Config.SESSIONS_COLLECTION_ID,
      getDocumentIDFromLocalStorage(), { "Prompt": prompt });
  }

  //Update Session Document in Appwrite DB with Game State (usually host only)
  updateGameState(state) {
    this.sdk.database.updateDocument(Config.SESSIONS_COLLECTION_ID,
      getDocumentIDFromLocalStorage(), { "GameState": state });
  }

  //Update client, usually called once manually after first entry into game session
  //before subscription kicks in
  async updateSession() {
    let id = window.localStorage.getItem(Config.DOCUMENT_STORAGE_KEY),
      sync = new Synchronizer();

    if (id !== null) {
      let promise = this.sdk.database.getDocument(
        Config.SESSIONS_COLLECTION_ID, id);
      promise.then(function(response) {
        sync.handleUpdateInLobby(response);

      }, function(error) {
        alert(error);
      });
      return promise;
    }
    return false;
  }

  //join existing Session with Token, set yourself as player
  //create player Document linked with Session ID
  async joinSession(token) {
    let promise = await this.sdk.database.getDocument(Config
      .SESSIONS_COLLECTION_ID,
      token);
    if (promise === null || promise === undefined) {
      return alert(
        "Document does not exist!");
    }
    //save current session token/id
    window.localStorage.setItem(Config.DOCUMENT_STORAGE_KEY,
      promise.$id);
    //update document player list
    // eslint-disable-next-line one-var
    let usersInGame = promise.UserIDs,
      user = this.getUsername();
    usersInGame.push(user);

    //update session document with player name
    // eslint-disable-next-line one-var
    let update = this.sdk.database.updateDocument(Config
      .SESSIONS_COLLECTION_ID, promise
      .$id, { "UserIDs": usersInGame });
    update.then(function() {
      window.localStorage.setItem(Config.ROLE_KEY, Config.PLAYER_ROLE);
    }, function(error) {
      alert(error);
    });

    this.sdk.database.createDocument(Config.PLAYER_COLLECTION_ID,
    "unique()", { "PlayerName": user, "PlayerScore": 0, "GameSession": getDocumentIDFromLocalStorage() }, ["role:all"], ["role:all"]);
    return update;
  }

  //logout and clear localStorage
  logout() {
    this.sdk.account.deleteSession("current").then(function() {
      window.localStorage.clear();
      window.location.replace("index.html");
    }, function(error) {
      alert(error);
    });
  }

  //as host remove all session files from app db
  // file removal now obsolete since query gets only necessary data and 100 doc limit no longer dangerous to game functionality 
  async leaveLobby() {
    if (window.localStorage.getItem(Config.ROLE_KEY) === Config.HOST_ROLE) {
      this.sdk.database.deleteDocument(Config.SESSIONS_COLLECTION_ID,
        getDocumentIDFromLocalStorage());

      this.sdk.teams.delete(window.localStorage.getItem(Config
        .TEAM_STORAGE_KEY));

      window.localStorage.setItem(Config.TEAM_STORAGE_KEY, "");
      window.localStorage.setItem(Config.DOCUMENT_STORAGE_KEY, "");
      window.localStorage.setItem(Config.ROLE_KEY, "");
      window.location.replace("homepage.html");
    } else {
      //remove name from user ids
      let sessionData = await this.updateSession(),
        username = window.localStorage.getItem("username"),
        unfiltered = sessionData.UserIDs,
        filtered = unfiltered.filter(function(
          value /*,index, arr*/ ) { return value !== username; }),
        // eslint-disable-next-line no-unused-vars
        update = this.sdk.database.updateDocument(Config
          .SESSIONS_COLLECTION_ID,
          sessionData.$id, { "UserIDs": filtered });

      window.location.replace("homepage.html");
    }

  }
//get Account connected to Appwrite rn
  getAccount() {
    let promise = this.sdk.account.get();
    promise.then(function(response) {
      window.localStorage.setItem("username",
        response.name);
    }, function(error) { alert(error); });
    return promise;
  }

  //Update player score, usually after rating their meme story
  //Updates total additive Score in Player Doc of Players Collection
  updatePlayerScore(id, score) {
    this.sdk.database.updateDocument(Config.PLAYER_COLLECTION_ID,
    id, { "PlayerScore": score });
  }

  //Triggered by Setting Options in Lobby
  //Update Session Doc in Appwrite DB with round count and duration
  updateSessionWithSettings(rounds, duration) {
    let sync = new Synchronizer();
    if (rounds !== null) {

      let promise = this.sdk.database.updateDocument(Config
        .SESSIONS_COLLECTION_ID,
        getDocumentIDFromLocalStorage(), {
          "RoundCount": Number(
            rounds),
        },
      );
      promise.then(response => sync.updateSession(response), error => alert(error));

    }
    if (duration !== null) {

      let promise = this.sdk.database.updateDocument(Config
        .SESSIONS_COLLECTION_ID,
        getDocumentIDFromLocalStorage(), {
          "RoundDuration": Number(
            duration),
        },
      );
      promise.then(response => sync.updateSession(response), error => alert(error));

    }
  }

  //Updates Score in MemeStory Collection of specific meme story
  async updateScore(score, documentId) {
    let promise = await this.sdk.database.getDocument(Config
        .MEMESTORY_COLLECTION_ID, documentId),
      newScore = score + promise.Score;
    this.sdk.database.updateDocument(Config.MEMESTORY_COLLECTION_ID,
      documentId, { "Score": newScore });
  }

  //Upload submitted Story to Appwrite Db MemeStoryCollection 
  // role:all allows other players to download them for rating phase
  uploadMemeStory(memeArray, roundPlayed) {
    this.sdk.database.createDocument(Config.MEMESTORY_COLLECTION_ID,
      "unique()", {
        "MemeStories": memeArray,
        "Session": getDocumentIDFromLocalStorage(),
        "Player": this.getUsername(),
        "Score": 0,
        "InRoundPlayed": roundPlayed,
      }, ["role:all"], ["role:all"]);
    //to do handle error
  }

  //Gets MemeStorie of all Players in Session of this round
  async downloadMemeStories(round) {
    let promise = await this.sdk.database.listDocuments(Config
      .MEMESTORY_COLLECTION_ID, [Query.equal("Session",
          getDocumentIDFromLocalStorage()),
        Query.equal("InRoundPlayed", round),
      ], Config.MAX_DOCUMENTS);
    return promise.documents;
  }

  setRoundDuration(duration) {
    window.localStorage.setItem("roundLength", duration);
  }
  getRoundDuration() {
    return window.localStorage.getItem("roundLength");
  }
  setRoundCount(count) {
    window.localStorage.setItem("roundCount", count);
  }
  getRoundCount() {
    return window.localStorage.getItem("roundCount");
  }

  //Called at Game end by host to remove all session files
  //obsolete as query in listDocuments now avoids 100 Doc limit that endangered game function over several sessions
  deleteGameFiles(){
    this.updateGameState(Config.SESSION_ENDED);
    //remove all player docs, meme docs and the session doc
    let players = this.sdk.database.listDocuments(Config.PLAYER_COLLECTION_ID, [Query.equal("GameSession", getDocumentIDFromLocalStorage())], Config.MAX_DOCUMENTS),
    stories = this.sdk.database.listDocuments(Config.MEMESTORY_COLLECTION_ID, [Query.equal("Session", getDocumentIDFromLocalStorage())], Config.MAX_DOCUMENTS),
    promise = this.sdk.database.deleteDocument(Config.SESSIONS_COLLECTION_ID, getDocumentIDFromLocalStorage());

    players.then(response => response.documents.forEach(doc => this.sdk.database.deleteDocument(Config.PLAYER_COLLECTION_ID, doc.$id)));
    stories.then(response => response.documents.forEach(doc => this.sdk.database.deleteDocument(Config.MEMESTORY_COLLECTION_ID, doc.$id)));

    promise.then(function(){window.localStorage.clear(); window.location.replace("homepage.html");});
  }
}

function getDocumentIDFromLocalStorage() {
  return window.localStorage.getItem(Config.DOCUMENT_STORAGE_KEY);
}

// eslint-disable-next-line no-unused-vars
function generatePassword() {
  var length = 5,
    i = 0,
    n = 0,
    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";

  for (i, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export { AppwriteDAL };