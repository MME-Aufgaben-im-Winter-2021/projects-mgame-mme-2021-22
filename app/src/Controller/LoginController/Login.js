/**
 * User enters nickname and submits
 */
 import {AppwriteDAL} from "./../../../services/appwriteConfig.js";
 var dal = new AppwriteDAL();
dal.login("fake");


function init(){
    console.log("Login.js");
}

init();