import Config from "../src/Model/Config.js";

// Init your Web SDK
const appwrite = new Appwrite();

appwrite
  .setEndpoint(
    "https://appwrite.software-engineering.education/v1"
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
    let promise = this.sdk.account.create("unique()", email, password,
      nickname);
    promise.then(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  signIn(email, password) {
    let promise = this.sdk.account.createSession(email, password);

    promise.then(function(response) {
      //user logged into his account successfully
      console.log(response);

      window.location.replace("homepage.html");
    }, function(error) {
      console.log(error);
    });
  }

  hostGame() {
    let promise = this.sdk.database.createDocument(Config.collectionID,
      "unique()", {
        "SessionID": "test_session",
        "UserIDs": [
          this.getAccount().name,
        ],
        "GameState": "lobby",
      }, ["role:all"], ["role:all"]);
    promise.then(function(response) {
      console.log(response);
    }, function(error) {
      console.log(error);
    });
    
    return promise;
  }

  async updateSession() {
      let id = JSON.parse(window.localStorage.getItem("documentID"));
      //this.sdk.subscribe(Config.collectionID.id, callback);
    if (id !== null) {
      let promise = this.sdk.database.getDocument(
        Config.collectionID, id);
      promise.then(function(response) {
        console.log(response);
      }, function(error) {
        console.log(error);
      });
      return promise;
    }
    return false;
  }

  joinSession(token) {
    let promise = this.sdk.database.getDocument(Config.collectionID, token);
    promise.then(response => this.registerPlayer(response),error => console.log(error));
    return promise;
  }

  registerPlayer(promise){
    //save current session token/id
    window.localStorage.setItem("documentID", JSON.stringify(promise.$id));
    //update document player list
    let usersInGame = promise.UserIDs, user = this.getAccount();
    usersInGame.push(user.name);
    // eslint-disable-next-line one-var
    let update = this.sdk.database.updateDocument(Config.collectionID, promise.$id, {"UserIDs": usersInGame});
    update.then(response => console.log(response), error => console.log(error));
  }

  logout() {
    this.sdk.account.deleteSession("current").then(function(response) {
      console.log(response);
      window.location.replace("login.html");
    }, function(error) {
      console.log(error);
    });
  }

  leaveLobby() {
    this.sdk.database.deleteDocument(Config.collectionID,
      getDocumentIDFromLocalStorage());
    window.location.replace("homepage.html");
  }

  getAccount(){
    let promise = this.sdk.account.get();
    return promise;
  }
}

function getDocumentIDFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem("documentID"));
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