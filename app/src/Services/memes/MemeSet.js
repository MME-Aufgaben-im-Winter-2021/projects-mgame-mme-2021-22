/**
 * Repräsentiert ein Set aus Memes, das von Spieler*innen zum Erstellen einer Meme-
 * Story verwendet werden kann. Eine MemeSet besteht aus einer Liste verfügbarer
 * Memes ("Hand"). Diese Liste kann ausgetauscht und gefiltert werden. Der dafür benötigte
 * MemeService wird dem Konstruktor als Proxy-Objekt übergeben.
 */
class MemeSet {

  constructor(serviceProxy) {
    this.service = serviceProxy;
    this.reload();
  }

  async init() {
      if (this.isInitialized) {
          throw new Error("MemeSet can only be initialized once!");
      } else {
          this.memes = await this.service.reload();  
          this.isInitialized = true;
          return;
      }
  }

  /**
   * Ersetzt alle Memes in diesem Set durch die gleiche Anzahl neuer, zufällig gezogener 
   * Memes aus dem MemeService. Das zurückgegebene Promise wird nach erfolgreichem Abschluss 
   * des Vorgangs ohne weitere Informationen aufgelöst.
   */
  async reload() {
    this.memes = await this.service.reload();
    return;
  }

  /**
   * Erstellt eine gefilterte Liste der aktuellen Memes dieses Sets zurück. In der Liste enthalten sind
   * alle Memes, von denen mindestens ein Tag vollständig oder teilweise mit der übergebenen Query 
   * übereinstimmt.
   * @param {String} query Zeichenkette, nach der in den Tags der aktuellen Memes gesucht werden soll. 
   * @returns Ein Promise, dass nach dem Filtervorgang mit der erstellten Teilliste an Memes aufgelöst wird.
   */
  async filter(query) {
      let filteredMemes = this.memes.filter((meme) => {
          let matchingTag = meme.tags.find((tag) => tag.includes(query));
          return matchingTag !== undefined;
      });
      return filteredMemes;
  }

}

export default MemeSet;