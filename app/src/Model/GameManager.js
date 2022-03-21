/**import GameProgressCard from "../Views/GameView/GameProgressCard"
import PlayingField from "../Views/GameView/PlayingField";
import Prompt from "../Views/GameView/Prompt";
*/
import GameProgressCard from "../Views/GameView/GameProgressCard.js";
import PlayingField from "../Views/GameView/PlayingField.js";
import Hand from "../Views/GameView/Hand.js";
import RatingView from "../Views/RatingView/RatingView.js";
import Prompt from "../Views/GameView/Prompt.js";
import Meme from "../Controller/Meme.js";
import Observable from "../utils/Observable.js";
import KeyWord from "../Controller/KeyWord.js";


let submitButton = document.querySelector(".submit"),
    saveButton = document.querySelector(".save"),
    goodButton = document.getElementById("good"),
    mehButton = document.getElementById("meh"),
    badButton = document.getElementById("bad"),
    searchBar = document.getElementById("searchBar"),
    handArray = [],
    fieldArray = [];

class GameManager extends Observable {

  constructor() {
    super();
    this.gameProgressCard = new GameProgressCard();
    this.playingField = new PlayingField();
    this.hand = new Hand();
    this.ratingView = new RatingView();
    this.prompt = new Prompt();
    saveButton.addEventListener("click", this.addNewKeyword.bind(this));
    submitButton.addEventListener("click", this.setGameStateRate.bind(this));
    goodButton.addEventListener("click", this.votedGood.bind(this));
    mehButton.addEventListener("click", this.votedMeh.bind(this));
    badButton.addEventListener("click", this.votedBad.bind(this));
    searchBar.addEventListener("change", this.onSearch.bind(this));
    this.setGameStatePlay();


  }

  onSearch() {
    handArray = [];
    for (let i=0; i<10; i++){
    this.addNewMemeToHand(searchBar.value,
      "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/a5/3a/b7/a53ab703-a5dc-e293-d8cf-b0b5708889bd/source/256x256bb.jpg");
    this.hand.HandSpace.innerHTML = "";
    for (const meme of handArray) {
      this.hand.HandSpace.appendChild(meme.body);
    }
  }
  this.addNewKeyword();
  }

  addNewMemeToHand(memeName, imageSource) {
    if (handArray.length < 10) {
      let newMeme = new Meme(memeName, imageSource, true);
      handArray.push(newMeme);
      newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));
    }
  }

  addNewMemeToField(memeName, imageSource) {
    if (fieldArray.length < 3) {
      let newMeme = new Meme(memeName + fieldArray.length, imageSource, false);
      fieldArray.push(newMeme);
      newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));
      newMeme.isInHand = false;
    }
  }

  checkMeme(event) {
    let memeName = event.data[0],
        currentLocation = event.data[1],
        swappingMeme = event.data[2],
        isInHand = event.data[3];

    if (currentLocation === "playingArea") {
      // this.removeMeme(memeName);
      if(isInHand === false){
      this.addNewMemeToField(memeName,
        "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/a5/3a/b7/a53ab703-a5dc-e293-d8cf-b0b5708889bd/source/256x256bb.jpg");
      }
      else{
        this.swapMeme(memeName, swappingMeme);
      }
    }
    else if(isInHand === false){
      this.removeMemeFromField(memeName);
    }
  }

  swapMeme(firstMeme, secondMeme) {
    let indexDragged,
      indexSwapped;

    for (let i = 0; i < fieldArray.length; i++) {
      let meme = fieldArray[i];
      if (meme.id === firstMeme) {
        indexDragged = i;
        break;
      }
    }
    for (let i = 0; i < fieldArray.length; i++) {
      let meme = fieldArray[i];
      if (meme.id === secondMeme) {
        indexSwapped = i;
        break;
      }
    }
    fieldArray[indexDragged] = fieldArray.splice(
      indexSwapped,
      1, fieldArray[indexDragged])[
    0]; //https://stackoverflow.com/questions/872310/javascript-swap-array-elements/872317
    this.updatePlayingField();
  }


  updatePlayingField() {
    console.log(this.playingField.playingField);
    this.playingField.playingField.innerHTML = "";
    for (const meme of fieldArray) {
      console.log(fieldArray);
      this.playingField.playingField.appendChild(meme.body);
    }
    this.storePlayedMemes();
  }

  setPrompt(prompt) {
    
   this.playingField.promptField.innerHTML = prompt;
   this.updatePlayingField();

  }
  storePlayedMemes() {
    window.localStorage.setItem('playedMemes', JSON.stringify(fieldArray));
  }

  removeMemeFromField(memeName) {
    fieldArray =fieldArray.filter((meme) => meme
      .id !==
      memeName);
    this.updatePlayingField();
  }

  addNewKeyword(){
    let newKeyWord = new KeyWord(searchBar.value);
    this.hand.keyWordArea.appendChild(newKeyWord.body);
    console.log(newKeyWord);
  }
  updateHand() {
    this.hand.HandSpace.innerHTML = "";
    for (const meme of handArray) {
      this.hand.HandSpace.appendChild(meme.body);
    }
  }

  votedGood() {
    console.log("votedGood");
  }

  votedMeh() {
    console.log("votedMeh");
  }

  votedBad() {
    console.log("votedBAD");
  }

  setGameStatePlay() {
    this.gameProgressCard.start();
    this.setPrompt(this.prompt.generatePrompt());

  }


  setGameStateRate() {
    console.log( Array.from(new Set(JSON.parse(window.localStorage.getItem('playedMemes')))));
    this.RatingView.updateView( Array.from(new Set(JSON.parse(window.localStorage.getItem('playedMemes')))));
    this.playingFieldArea.hidden = true;
    //this.promptField.hidden = true;
    this.progressField.hidden = true;
    this.ratingArea.hidden = false;
    this.ratingField.hidden = false;
    this.handArea.hidden = true;
    this.divider.hidden = true;
  }

}
export default GameManager;