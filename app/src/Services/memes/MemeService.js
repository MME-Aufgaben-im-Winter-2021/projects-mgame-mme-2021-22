import Meme from "./Meme.js";
import MemeSet from "./MemeSet.js";

const MEME_DATA_URL = "resources/meme_json_data.json",
  DEFAULT_MEME_SET_SIZE = 10;

/**
 * Lädt die Memes aus der als URL übergebenen JSON-Datei. Aus den dort hinterlegten Meta-
 * Informationen werden einzelne Meme-Objekte erstellte und als Array zurückgegeben.
 * @returns Ein Promise, das aufgelöst wird, sobald alle Memes erstellt wurden. Als Ergebnis
 * des Promise wird ein Array mit den geladenen Memes übergeben.
 */
async function loadMemesFrom(url) {
  let memes = [],
    raw = await fetch(url),
    json = await raw.json();
  memes = json.map((jsonMeme) => Meme.fromJSON(jsonMeme));
  return memes;
}

/**
 * Dieser Dienst stellt Memes für andere Anwendungskomponenten bereit. Der Dienst operiert
 * auf den Daten der "meme_json_data.json"-Datei, in der die Metainformationen und URLs zu
 * den extrahierten Memes gesammelt werden. 
 */
class MemeService {

  /**
   * Initialisiert den Dienst, in dem die Daten aus der JSON-Datei eingelesen und als Meme-
   * Objekte in ein internes Array überführt werden.
   *
   * @returns Ein Promise, das aufgelöst wird, wenn der Initialisierungsvorgang abgeschlossen
   * ist. Als Ergebnis des Promise wird eine Statusmeldung mit der Anzahl der geladenen Memes
   * und der benötigen Ladezeit in Millisekunden übergeben.
   */
  async init() {
    let startTime = Date.now(),
      memes = await loadMemesFrom(MEME_DATA_URL);
    this.memes = memes;
    return {
      numberOfMemes: memes.length,
      loadingTimeInMilliSeconds: Date.now() - startTime,
    };
  }

  /**
   * Gibt ein zufällig ausgewähltes Meme zurück.
   * @returns Ein Promise, das aufgelöst wird, sobald das Meme ausgewählt wurde.
   * Als Ergebnis des Promis wird das zufällig ausgewähltes Meme-Objekt übergeben.
   */
  async getRandomMeme() {
    let randomMeme = this.memes[Math.floor(Math.random() * this.memes
      .length)];
    return randomMeme;
  }

  /**
   * Gibt ein Array mit zufällig ausgewählten Memes zurück.
   * @param {Number} count Anzahl der Memes, die zurückgegeben werden sollen.
   * @returns Ein Promise, das aufgelöst wird, sobald die Memes ausgewählt wurden.
   * Die Liste der zufälligen Meme-Objekte wird als Ergebnis des Promise übergeben.
   */
  async getRandomMemes(count) {
    let memes = [],
      availableMemes = [...this.memes];
    for (let i = 0; i < count; i++) {
      let randomMemeIndex = Math.floor(Math.random() * availableMemes.length);
      memes.push(availableMemes[randomMemeIndex]);
      availableMemes.splice(randomMemeIndex, 1);
    }
    return memes;
  }

  /**
   * Erstellt eine neues, zufällig zusammengestelltes MemeSet, das von den Spieler*innen verwendet werden kann.
   * @param {Number} numberOfMemes Anzahl der Memes, die in diesem Set enthalten sein sollen.
   * @returns Ein Promise, aufgelöst wird, sobald das erstellte MemeSet mit einer ersten, zufälligen Liste an Memes
   * initialisiert wurde. Als Ergebnis des Promise wird das jetzt verwendbare MemeSet übergeben.
   */
  async createMemeSet(numberOfMemes = DEFAULT_MEME_SET_SIZE) {
    let memeSet = new MemeSet({
      /*
       * Statt den Service als Ganzes zu übergeben, wird ein Proxy-Objekt mit einer einzelnen Methode zum (Nach-) Laden 
      der benötigen Anzahl an Memes übergeben.
       */
      reload: this.getRandomMemes.bind(this, numberOfMemes),
    });
    await memeSet.init();
    return memeSet;
  }

}

export default new MemeService();