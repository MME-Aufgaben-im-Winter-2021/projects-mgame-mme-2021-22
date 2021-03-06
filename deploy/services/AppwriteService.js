import Config from "../src/Model/Config.js";

// Init your Web SDK
// eslint-disable-next-line no-undef
const appwrite = new Appwrite();

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
    let promise = this.sdk.account.create("unique()", email, password,
      nickname);
      console.log(promise);
      //tell the user he actually made an account XD
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

  subscribe(callback){
    console.log("Subscribed");
    let channel = "collections." + Config.collectionID + ".documents";
    this.sdk.subscribe(channel, function(response){ callback(response.payload);});
  }

  hostGame() {
    let promise = this.sdk.database.createDocument(Config.collectionID,
      "unique()", {
        "SessionID": "test_session",
        "UserIDs": [
          this.getUsername(),
        ],
        "GameState": "lobby",
      }, ["role:all"], ["role:all"]);
    promise.then(function(response) {
      console.log(response);
      window.localStorage.setItem("role","host");
    }, function(error) {
      console.log(error);
    });
    console.log(this.getUsername());
    return promise;
  }

  getUsername(){
    return window.localStorage.getItem("username");
  }

  async updateSession() {
      let id = JSON.parse(window.localStorage.getItem("documentID"));
      
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

  //implement try catch
  registerPlayer(promise){
    //save current session token/id
    window.localStorage.setItem("documentID", JSON.stringify(promise.$id));
    //update document player list
    let usersInGame = promise.UserIDs, user = this.getUsername();
    usersInGame.push(user);
    console.log(usersInGame);
    // eslint-disable-next-line one-var
    let update = this.sdk.database.updateDocument(Config.collectionID, promise.$id, {"UserIDs": usersInGame});
    update.then(function(response){console.log(response); window.localStorage.setItem("role", "player");}, error => console.log(error));
    console.log(window.localStorage.getItem("role"));
  }

  logout() {
    this.sdk.account.deleteSession("current").then(function(response) {
      console.log(response);
      window.location.replace("index.html");
    }, function(error) {
      console.log(error);
    });
  }

  async leaveLobby() {
    if(window.localStorage.getItem("role") === "host"){
      this.sdk.database.deleteDocument(Config.collectionID,
        getDocumentIDFromLocalStorage());
        console.log("Leaving as host");
        window.localStorage.setItem("role", "");
      window.location.replace("homepage.html");
    }else{
      //remove name from userids
      let sessionData = await this.updateSession(), username = window.localStorage.getItem("username"),
      unfiltered = sessionData.UserIDs,
      filtered = unfiltered.filter(function(value /*,index, arr*/){return value !== username;}),
      update = this.sdk.database.updateDocument(Config.collectionID, sessionData.$id, {"UserIDs": filtered});
      console.log(update);
      console.log("leaving as player");
      window.location.replace("homepage.html");
    }
    
  }

  getAccount(){
    let promise = this.sdk.account.get();
    promise.then(function(response) {window.localStorage.setItem("username", response.name);}, function(error){console.log(error);});
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