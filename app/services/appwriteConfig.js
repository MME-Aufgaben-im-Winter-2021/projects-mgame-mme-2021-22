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

}
export {AppwriteDAL};