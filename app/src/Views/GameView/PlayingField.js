/** playing field. players drop cards in here */
import Meme from "../../Controller/Meme.js";
import Observable from "../../utils/Observable.js";


class PlayingField extends Observable {

  constructor() {
    super();
    this.playingFieldArray = [];
    this.playingField = document.querySelector(".field");
    this.promptField = document.querySelector(".promptField");

  }

  addMeme(memeName, imageSource) {
    if (this.playingFieldArray.length < 3) {
      let newMeme = new Meme(memeName + this.playingFieldArray.length,
        imageSource);
      this.playingFieldArray.push(newMeme);
      newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));
      this.updatePlayingField();
    }
  }

  removeMeme(memeName) {
    this.playingFieldArray = this.playingFieldArray.filter((meme) => meme
      .id !==
      memeName);
    this.updatePlayingField();
  }

  updatePlayingField() {
    console.log(this.playingField);
    this.playingField.innerHTML = "";
    for (const meme of this.playingFieldArray) {
      this.playingField.appendChild(meme.body);
    }
    this.storePlayedMemes();
  }
  checkMeme(event) {
    let memeName = event.data[0],
      location = event.data[1],
      swappingMeme = event.data[2];

    if (location === "handArea") {
      this.removeMeme(memeName);

    } else {
      this.swapMeme(memeName, swappingMeme);
      console.log("swapped");
    }
  }
  swapMeme(firstMeme, secondMeme) {
    let indexDragged,
      indexSwapped;

    for (let i = 0; i < this.playingFieldArray.length; i++) {
      let meme = this.playingFieldArray[i];
      if (meme.id === firstMeme) {
        indexDragged = i;
        break;
      }
    }
    for (let i = 0; i < this.playingFieldArray.length; i++) {
      let meme = this.playingFieldArray[i];
      if (meme.id === secondMeme) {
        indexSwapped = i;
        break;
      }
    }
    this.playingFieldArray[indexDragged] = this.playingFieldArray.splice(
      indexSwapped,
      1, this.playingFieldArray[indexDragged])[
    0]; //https://stackoverflow.com/questions/872310/javascript-swap-array-elements/872317
    this.updatePlayingField();
  }

  getElements() {
    console.log(this.playingFieldArray);
    return this.playingFieldArray;
  }

  storePlayedMemes() {
    window.localStorage.setItem('playedMemes', JSON.stringify(this
      .playingFieldArray));
  }

  setPrompt(prompt) {

    this.promptField.innerHTML = prompt;
    this.updatePlayingField();

  }

}
export default PlayingField;