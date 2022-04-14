import Simplifyable from "../../utils/Simplifyable.js";
import Prompt from "./Prompt.js";

/**
 * Repräsentiert eine Story, die in einer Spielrunde von den Spieler*innen mit 
 * Memes erzählt werden soll. Zu einer Story gehört ein Prompt, ein Text
 * mit beliebig vielen PLatzhaltern, die von den Spieler*innen durch Memes von
 * ihrer Hand ersetzt werden, um die dargestellte Geschichte zu erzählen.
 * 
 * Für die einfache Verwendung im Kontext der Appwrite-Datenbank wird der 
 * Simplifyable-Prototype verwendet. Innerhalb des Client-Codes wird eine Story
 * dabei immer als Objekt vom Prototypen Story verwendet. Für den Datenaustausch und
 * das Speichern im serverseitigen State-Dokument wird die vereinfachte Variante verwendet,
 * aus der bei Bedarf wieder ein voll funktionstüchtiges Story-Objekt erstellt werden kann.
 */
class Story extends Simplifyable {

  constructor(prompt, createdAt = Date.now()) {
    super();
    this.createdAt = createdAt;
    this.prompt = prompt;
    Object.freeze(this);
  }

  toSimpleObject() {
      return JSON.parse(JSON.stringify(this));
  }

  static fromSimpleObject(simpleObject) {
    let prompt = new Prompt(simpleObject.prompt.text),
    createdAt = simpleObject.createdAt;
    return new Story(prompt, createdAt);
  }
}

export default Story;