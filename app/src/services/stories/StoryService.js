import Prompt from "./Prompt.js";
import Story from "./Story.js";

const PROMPT_DATA_URL = "resources/prompt_json_data.json";

/**
 * Lädt die Prompts zum späteren Erstellen der Stories aus der als URL übergebenen 
 * JSON-Datei. Aus den dort Strings werden einzelne Prompt-Objekte erstellt und als Array zurückgegeben.
 * @returns Ein Promise, das aufgelöst wird, sobald alle Prompts erstellt wurden. Als Ergebnis
 * des Promise wird ein Array mit den geladenen Prompts übergeben.
 */
async function loadPromptFrom(url) {
  let raw = await fetch(url),
    json = await raw.json(),
    prompts = json.map((jsonPrompt) => new Prompt(jsonPrompt));
  return prompts;
}

/**
 * Dieser Dienst stellt Stories für andere Anwendungskomponenten bereit. Der Dienst operiert
 * auf den Daten der "prompt_json_data.json"-Datei, in der die Prompts als separate Strings mit
 * Platzhaltern aufgelistet sind. 
 */
class StoryService {

  /**
   * Initialisiert den Dienst, in dem die Daten aus der JSON-Datei eingelesen und als Prompt-
   * Objekte in ein internes Array überführt werden.
   *
   * @returns Ein Promise, das aufgelöst wird, wenn der Initialisierungsvorgang abgeschlossen
   * ist. Als Ergebnis des Promise wird eine Statusmeldung mit der Anzahl der geladenen Prompts
   * und der benötigen Ladezeit in Millisekunden übergeben.
   */
  async init() {
    let startTime = Date.now(),
      prompts = await loadPromptFrom(PROMPT_DATA_URL);
    this.prompts = prompts;
    return {
      numberOfPrompts: prompts.length,
      loadingTimeInMilliSeconds: Date.now() - startTime,
    };
  }

  /**
   * Gibt ein zufällig ausgewähltes Prompt zurück.
   * @returns Ein Promise, das aufgelöst wird, sobald das Prompt ausgewählt wurde.
   * Als Ergebnis des Promis wird das zufällig ausgewähltes Prompt-Objekt übergeben.
   */
  async getRandomPrompt() {
    let randomPrompt = this.prompts[Math.floor(Math.random() * this.prompts.length)];
    return randomPrompt;
  }

  /**
   * Erzeugt eine neue Story auf Basis eines zufällig ausgewählten Prompts.
   * @returns Ein Promise, das aufgelöst wird, sobald die Story erstellt wurde. Als Ergebnis 
   * des Promis wird die erstellte Story übergeben.
   */
  async createStory() {
      let prompt = await this.getRandomPrompt();
      return new Story(prompt);
  }

}

export default new StoryService();