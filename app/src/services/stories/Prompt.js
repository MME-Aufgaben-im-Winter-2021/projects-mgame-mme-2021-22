const BLANK_PLACEHOLDER = "ˍˍˍˍˍˍˍˍˍˍˍˍˍ",
  BLANK_REGEX = new RegExp(BLANK_PLACEHOLDER, "g");

/**
 * Repräsentiert einen Story-Prompt, der aus einem String mit beliebig vielen (auch 
 * keinen) Platzhaltern erstellt wird.
 */
class Prompt {

  constructor(text) {
    this.text = text.trim();
    this.numberOfBlanks = (text.match(BLANK_REGEX) || []).length;
    Object.freeze(this);
  }

}

export default Prompt;