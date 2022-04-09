/* eslint-disable no-alert */
import { AppwriteDAL } from "./AppwriteService.js";
import Config from "../src/utils/Config.js";
import LobbyView from "../src/Views/LobbyView/LobbyView.js";
var lobbyView = new LobbyView();

class Synchronizer {
    
    subscribeToGame(){
        let DAL = new AppwriteDAL();
        console.log("subscribed with sync");
        DAL.subscribe();
    }
  
    updateSession(payload){
        console.log("payload received");
        if(payload.$id !== window.localStorage.getItem(Config.DOCUMENT_STORAGE_KEY)){
            alert(Config.CONNECTION_UNSTABLE_WARNING);
            return false;
        }
        
        switch(payload.GameState){
            case "lobby": console.log("update lobby"); lobbyView.updateView(payload.UserIDs, payload.RoundCount, payload.RoundDuration); break;
            case "Game": console.log("update game"); break;
            default: return false; 
        }
        //if gamestate changed -> synchronize Game State
        //if round changed -> synchronize round
        //if meme collection received -> display collection rating
        
        return false;
    }

    synchronizeGameState(targetState){
        try{let currentState = window.location.pathname;
            currentState = currentState.split("/").pop();
            if (currentState !== targetState) {
                switch(targetState){
                    case "lobby": window.location.replace("lobby.html"); break;
                    case "home": window.location.replace("homepage.html"); break;
                    default: break;
                }
                return "Switching page to: " + targetState;
            }
            return "Page correct";}catch(error){console.log(error);}
        return true;
    }
}

export default Synchronizer;