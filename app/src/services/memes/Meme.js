/**
 * Repräsentiert ein einzelne Meme, das im Spiel verwendet werden kann. Memes
 * bestehen aus einem Titel, einer URL zur jeweiligen Bilddatei und einem Array
 * mit das Meme beschreibenden Tags. Meme-Objekte sind immutable.
 */
 class Meme {

    constructor(title, url, tags) {
      this.title = title;
      this.url = url;
      this.tags = tags;
      Object.freeze(this);
    }
  
    /**
     * Erstellt ein neues Meme-Objekt auf Basis eines einzelne JSON-Objekts aus 
     * der geladenen JSON-Datei
     * @param {*} json Ein einzelnes JSON-Objekt aus der geladenen JSON-Datei
     * @returns Ein Meme-Objekt mit Titel, URL und Tags aus dem übergebenen JSON-Objekt
     */
    static fromJSON(json) {
      let title = Object.keys(json)[0],
        url = json[title][0].filename,
        tags = json[title][0].tags.split(",");
  
      tags = tags.map((tag) => tag.trim());
      return new Meme(title.trim(), url, tags);
    }

  }  

  export default Meme;