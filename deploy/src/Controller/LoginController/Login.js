/**
 * User enters nickname and submits
 */
import {appwrite} from "./services/appwriteConfig.js";

var username = "Bonifatius", lobbyId = "9SK8KL";

// Register User
appwrite
    .account.create("unique()", username, lobbyId)
        .then(response => {
            console.log(response);
        }, error => {
            console.log(error);
        });

let promise = appwrite.account.createAnonymousSession();

promise.then(function (response) {
    console.log(response); // Success
}, function (error) {
    console.log(error); // Failure
});

