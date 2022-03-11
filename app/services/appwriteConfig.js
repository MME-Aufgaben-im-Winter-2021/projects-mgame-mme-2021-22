// eslint-disable-next-line no-undef
var appwrite = new Appwrite();

appwrite
  .setEndpoint(
  'https://appwrite.software-engineering.education/v1') // Your Appwrite Endpoint
  .setProject('62066432a2c67cb3f59e') // Your project ID
;

class AppwriteDAL {
  constructor() {
    if(AppwriteDAL.instance instanceof AppwriteDAL){
        return AppwriteDAL.instance;
    }
    this.sdk = appwrite;
    Object.freeze(this);
    AppwriteDAL.instance = this;
  }

  print() {
    console.log("AppwriteDAL printing!");
  }

  login(nickname) {
    this.sdk.account.create("unique()", "not@used.com", "password",
        nickname)
      .then(response => {
        console.log(response);
      }, error => {
        console.log(error);
      });
  }

  createSession(nickname){
    this.login(nickname);
    let promise = this.sdk.database.createDocument("[Sessions]", "unique()", {});
    promise.then(function (response) {
      console.log(response);}, function (error) {
        console.log(error);
    });
    return 0;
  }

  joinSession(){
    return 0;
  }

}

function generatePassword() {
  var length = 5, i = 0, n = 0,
      charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
 
  for (i, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export {AppwriteDAL};