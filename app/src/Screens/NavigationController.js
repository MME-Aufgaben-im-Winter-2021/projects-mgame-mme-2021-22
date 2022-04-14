import HomeScreen from "./HomeScreen/HomeScreen.js";
import LoginScreen from "./LoginScreen/LoginScreen.js";

// Liste der verfügbaren Screens. Neue Screens werden nach gleichem Muster ergänzt.
const SCREENS = [{
  name: "Login",
  obj: LoginScreen,
}, {
  name: "Home",
  obj: HomeScreen,
}];

/**
 * Zentraler Controller für die Navigation zwischen den unterschiedlichen Screens der Anwendung.
 */
class NavigationController {

  /**
   * Erstellt der NavigationController
   * @param {HTMLElement} host Host-Element, in dem die verschiedenen Screens auf der Webseite angezeigt werden sollen. 
   */
  constructor(host) {
    this.host = host;
  }

  /**
   * Initialisiert den NavigationController, in dem alle Screens geladen und zum Host-Element hinzugefügt werden.
   * Diese Methode muss beim Anwendungsstart einmal aufgerufen werden. Erst wenn die Initialisierung (asynchron!)
   * abgeschlossen ist, kann der Controller verwendet werden.
   * @returns Ein Promise, das aufgelöst wird, sobald alle Screens geladen und zum Host-Element hinzugefügt wurden.
   */
  async init() {
    let promises = [];
    SCREENS.forEach((screen) => {
      let attachScreenPromise = screen.obj.attachToHost(this.host);
      promises.push(attachScreenPromise);
    });
    await Promise.all(promises);
    return;
  }

  /**
   * Zeigt den Screen mit dem übergebenen Namen an. Alle anderen Screens werden ausgeblendet.
   * @param {Screen} name Name des Screens, der eingeblendet werden soll.
   */
  showScreen(name) {
    let newScreen = SCREENS.find((screen) => screen.name === name),
      visibleScreens = SCREENS.filter((screen) => screen.obj.isVisible());
    if (newScreen === undefined) {
      return;
    }
    visibleScreens.forEach((screen) => screen.obj.hide());
    newScreen.obj.show();
  }

}

export default new NavigationController(document.querySelector(".screens"));