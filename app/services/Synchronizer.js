
class Synchronizer {
     synchronizeGameState(targetState){
        let currentState = window.location.pathname;
        currentState = currentState.split("/").pop();
        if (currentState !== targetState) {
            switch(targetState){
                case "lobby": window.location.replace("lobby.html"); break;
                case "home": window.location.replace("homepage.html"); break;
                default: break;
            }
            return "Switching page to: " + targetState;
        }
        return "Page correct";
    }
}

export default Synchronizer;