const PROMPT_ARRAY = ["Describe your funniest moment this year",
  "How would your perfect date go?", "How would you describe your last exam"];


class Prompt {

constructor(){
  this.promptField = document.getElementById("promptField");
  }


  getRandomInt(max) {

    return Math.floor(Math.random() * max);

  }

  generatePrompt() {

    let randomNumber = this.getRandomInt(PROMPT_ARRAY.length);
    return PROMPT_ARRAY[randomNumber];
  }

}
export default Prompt;