/* eslint-disable no-alert */
import Config from "../src/utils/Config.js";
import Synchronizer from "./Synchronizer.js";

// Init your Web SDK
// eslint-disable-next-line no-undef
const appwrite = new Appwrite(),
  sync = new Synchronizer();

appwrite
  .setEndpoint(
    "https://appwrite.software-engineering.education/v1",
  ) // Your Appwrite Endpoint
  .setProject("62066432a2c67cb3f59e") // Your project ID
;

class AppwriteDAL {
  constructor() {
    if (AppwriteDAL.instance instanceof AppwriteDAL) {
      return AppwriteDAL.instance;
    }
    this.sdk = appwrite;
    Object.freeze(this);
    AppwriteDAL.instance = this;
  }

  register(nickname, email, password) {
    this.sdk.account.create("unique()", email, password,
      nickname);
    //tell the user he actually made an account XD
  }

  signIn(email, password) {
    let promise = this.sdk.account.createSession(email, password);

    promise.then(function(response) {
      //user logged into his account successfully
      console.log(response);

      window.location.replace("homepage.html");
    }, function() {
      alert("Your password must be at least 8 characters long!");
    });
  }

  subscribe() {
    console.log("Subscribed");
    let channel = "collections." + Config.SESSIONS_COLLECTION_ID +
      ".documents";
    try {
      this.sdk.subscribe(channel, function(response) {
        console.log("Update received!");
        sync.updateSession(response
          .payload);
      });
    } catch (error) { console.log(error); }

  }

  async hostGame() {
    let team = await this.createTeam(),
      teamId = "team:" + team.$id,
      promise = await this.sdk.database.createDocument(Config
        .SESSIONS_COLLECTION_ID,
        "unique()", {
          "SessionID": "test_session",
          "UserIDs": [
            this.getUsername(),
          ],
          "RoundCount": Config.DEFAULT_ROUNDS,
          "RoundDuration": Config.DEFAULT_ROUND_DURATION,
          "GameState": "lobby",
        }, ["role:all"], ["role:all"]);

    try {
      window.localStorage.setItem(Config.TEAM_STORAGE_KEY, team.$id);
      window.localStorage.setItem(Config.DOCUMENT_STORAGE_KEY, promise.$id);
      window.localStorage.setItem(Config.ROLE_KEY, Config.HOST_ROLE);
    } catch (error) { console.log(error); }
    return promise;
  }

  async createTeam() {
    let teamName = this.getUsername() + "HostsGame",
      promise = await this.sdk.teams.create("unique()", teamName);
    return promise;
  }

  getUsername() {
    return window.localStorage.getItem("username");
  }
  updateGameState(state){
    this.sdk.updateDocument(Config.SESSIONS_COLLECTION_ID, this.getDocumentIDFromLocalStorage(), {"GameState":state});
  }
  async updateSession() {
    let id = window.localStorage.getItem(Config.DOCUMENT_STORAGE_KEY);

    if (id !== null) {
      let promise = this.sdk.database.getDocument(
        Config.SESSIONS_COLLECTION_ID, id);
      promise.then(function(response) {
        console.log(response);
      }, function(error) {
        alert(error);
      });
      return promise;
    }
    return false;
  }

  async joinSession(token) {
    let promise = await this.sdk.database.getDocument(Config
      .SESSIONS_COLLECTION_ID,
      token);
    if (promise === null || promise === undefined) { return alert(
        "Document does not exist!"); }
    //save current session token/id
    window.localStorage.setItem(Config.DOCUMENT_STORAGE_KEY, 
      promise.$id);
    //update document player list
    // eslint-disable-next-line one-var
    let usersInGame = promise.UserIDs,
      user = this.getUsername();
    usersInGame.push(user);
      // eslint-disable-next-line one-var
      let update = this.sdk.database.updateDocument(Config
        .SESSIONS_COLLECTION_ID, promise
        .$id, { "UserIDs": usersInGame });
    update.then(function(response) {
      window.localStorage.setItem(Config.ROLE_KEY, Config.PLAYER_ROLE);
    }, function(error){console.log(update);alert(error); });
    return update;
  }

  logout() {
    this.sdk.account.deleteSession("current").then(function(response) {
      console.log(response);
      window.localStorage.clear();
      window.location.replace("login.html");
    }, function(error) {
      alert(error);
    });
  }

  joinTeam(token) {
    return null;
  }
  async leaveLobby() {
    if (window.localStorage.getItem(Config.ROLE_KEY) === Config.HOST_ROLE) {
      this.sdk.database.deleteDocument(Config.SESSIONS_COLLECTION_ID,
        getDocumentIDFromLocalStorage());

      this.sdk.teams.delete(window.localStorage.getItem(Config
        .TEAM_STORAGE_KEY));

      console.log("Leaving as host");
      window.localStorage.setItem(Config.TEAM_STORAGE_KEY, "");
      window.localStorage.setItem(Config.DOCUMENT_STORAGE_KEY, "");
      window.localStorage.setItem(Config.ROLE_KEY, "");
      window.location.replace("homepage.html");
    } else {
      //remove name from userids
      let sessionData = await this.updateSession(),
        username = window.localStorage.getItem("username"),
        unfiltered = sessionData.UserIDs,
        filtered = unfiltered.filter(function(
          value /*,index, arr*/ ) { return value !== username; }),
        update = this.sdk.database.updateDocument(Config
          .SESSIONS_COLLECTION_ID,
          sessionData.$id, { "UserIDs": filtered });
      console.log(update);
      console.log("leaving as player");
      window.location.replace("homepage.html");
    }

  }

  getAccount() {
    let promise = this.sdk.account.get();
    promise.then(function(response) {
      window.localStorage.setItem("username",
        response.name);
    }, function(error) { alert(error); });
    return promise;
  }

  updateGameState(state) {
    let documentId = getDocumentIDFromLocalStorage(),
      promise = this.sdk.database.updateDocument(Config
        .SESSIONS_COLLECTION_ID, documentId, { "GameState": state });
    promise.then(response => console.log(response), error => console.log(
      error));
  }

  updateSessionWithSettings(rounds, duration) {
    if (rounds !== null) {

      let promise = this.sdk.database.updateDocument(Config
        .SESSIONS_COLLECTION_ID,
        getDocumentIDFromLocalStorage(), {
          "RoundCount": Number(
            rounds),
        },
      );
      promise.then(response => sync.updateSession(response), error => console
        .log(error));

    }
    if (duration !== null) {

      let promise = this.sdk.database.updateDocument(Config
        .SESSIONS_COLLECTION_ID,
        getDocumentIDFromLocalStorage(), {
          "RoundDuration": Number(
            duration),
        },
      );
      promise.then(response => sync.updateSession(response), error => console
        .log(error));

    }
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