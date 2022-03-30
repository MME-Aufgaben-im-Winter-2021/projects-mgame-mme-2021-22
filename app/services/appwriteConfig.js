import Config from "../src/Model/Config.js";

// Init your Web SDK
const appwrite = new Appwrite();

appwrite
  .setEndpoint(
  "https://appwrite.software-engineering.education/v1") // Your Appwrite Endpoint
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
    let promise = this.sdk.database.createDocument("62248d05d88cb88edf41",
      "unique()", { "SessionID": "test_session", "UserIDs": [
          "Mikkelanschelo",
        ], "GameState": "lobby" });
    promise.then(function(response) {
      console.log(response);
    }, function(error) {
      console.log(error);
    });
    return promise;
  }

  async updateSession() {
    let promise = "session ID is broken",
    id = JSON.parse(window.localStorage.getItem("documentID"));
    console.log("during update id = " + id);
    if (id !== null) {
      promise = await this.sdk.database.getDocument(
        "62248d05d88cb88edf41", id);
    }
    return promise;
  }

  joinSession() {
    return 0;
  }

  logout() {
    this.sdk.account.deleteSession("current").then(function(response) {
      console.log(response);
      window.location.replace("login.html");
    }, function(error) {
      console.log(error);
    });
  }
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