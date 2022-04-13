import Simplifyable from "../../utils/Simplifyable.js";
import Prompt from "./Prompt.js";

class Story extends Simplifyable {

  constructor(prompt, createdAt = Date.now()) {
    super();
    this.createdAt = createdAt;
    this.prompt = prompt;
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