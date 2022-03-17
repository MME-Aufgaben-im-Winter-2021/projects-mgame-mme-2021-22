/**
 * User enters nickname and submits
 */
 import {AppwriteDAL} from "./../../../services/appwriteConfig.js";
 var dal = new AppwriteDAL(), nickname = document.getElementById("nicknameInput"), password = document.getElementById("password"), email = document.getElementById("emailInput"), registerButton = document.getElementById("register"),
 signinButton = document.getElementById("signin");

//link event listener
 signinButton.addEventListener("click", signIn);
 registerButton.addEventListener("click", registerAcc);

function signIn(){
        dal.signIn(email.value, password.value);
}

function registerAcc() {
    if (email.value && password.value){
        dal.register(nickname.value, email.value, password.value);
    }else{
        console.log("Email or password invalid.");
    }
}
