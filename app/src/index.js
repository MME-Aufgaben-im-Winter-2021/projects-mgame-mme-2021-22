import NavigationController from "./Screens/NavigationController.js";

console.log("### The Meme Game ###");

/**
 * Demo des NavigationControllers. Alle anderen Funktionalitäten der Anwendung sind wahrscheinlich dadurch deaktiviert.
 */
NavigationController.init().then(() => {
    console.log("Switching to LoginScreen ...");
    NavigationController.showScreen("Login");
    console.log("Waiting ...");
    setTimeout(()=> {
        console.log("Switching to HomeScreen");
        NavigationController.showScreen("Home");
    }, 2000);
});