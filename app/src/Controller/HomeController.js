//Homepage allows user to sign out of session or join a game
import { AppwriteDAL } from "../../services/appwriteConfig.js";
var dbLink = new AppwriteDAL(), logoutButton = document.getElementById("logout"), joinButton = document.getElementById("join"), hostButton = document.getElementById("host");

logoutButton.addEventListener("click", logout);
hostButton.addEventListener("click", hostGame);

function logout(){
    dbLink.logout();
}

function hostGame(){
    let i = dbLink.hostGame();
    console.log(i);
}