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
import Observable  from "../utils/Observable.js";
import KeyWord from "../Controller/KeyWord.js";
import RoundScoreboard from "../Views/EndOfRoundView/RoundScoreboard.js";
import Story from "../Controller/Story.js";
import Config from "../utils/Config.js";
import ImageDownloader from "../Controller/ImageDownloader.js";
import FinalScore from "../Views/EndOfGameView/FinalScoreboard.js";


let submitButton = document.querySelector(".submit"),
  refreshButton = document.querySelector(".refresh"),
  saveButton = document.querySelector(".save"),
  goodButton = document.getElementById("good"),
  mehButton = document.getElementById("meh"),
  badButton = document.getElementById("bad"),
  searchBar = document.getElementById("searchBar"),
  continueButton = document.getElementById("continue"),
  handArray = [],
  fieldArray = [],
  roundCount = 0,
  searchBlockBoolean=false,
  lastSearchedTerm="",
  currentPrompt;

class GameManager extends Observable {

  constructor() {
    super();
    this.gameProgressCard = new GameProgressCard();
    this.playingField = new PlayingField();
    this.hand = new Hand();
    this.ratingView = new RatingView();
    this.prompt = new Prompt();
    this.roundScoreboard = new RoundScoreboard();
    this.finalScore = new FinalScore();
    this.imageDownloader = new ImageDownloader();
    
    this.imageDownloader.addEventListener("imagesFetched", this.fillHand.bind(this));
    refreshButton.addEventListener("click", this.refreshHand.bind(this));
    saveButton.addEventListener("click", this.addNewKeyword.bind(this));
    submitButton.addEventListener("click", this.setGameStateRate.bind(this));
    goodButton.addEventListener("click", this.votedGood.bind(this));
    mehButton.addEventListener("click", this.votedMeh.bind(this));
    badButton.addEventListener("click", this.votedBad.bind(this));
    //searchBar.addEventListener("change", this.onSearch.bind(this));
    //searchBar.addEventListener("change", this.onSearch);
    searchBar.addEventListener('keydown', () => this.delay(1000).then(() => this.onSearch()));

    continueButton.addEventListener("click", this.setGameStatePlay.bind(this));
    this.setPrompt(this.prompt.generatePrompt());
    this.fillHandWithRandomMemes();

  }

  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  onSearch() {
    if (searchBlockBoolean===false&&searchBar.value.length>1){
      searchBlockBoolean=true;
      this.delay(1000).then(() => this.checkIfNewSearchIsNeeded());
      console.log("onsearch method");
      handArray = [];
      this.updateHand();
      lastSearchedTerm=searchBar.value;
      this.requestMemes(searchBar.value);
    }
  }

  checkIfNewSearchIsNeeded(){
    searchBlockBoolean=false;
    if (searchBar.value!==lastSearchedTerm){
        this.onSearch();
    }
  }

  requestMemes(tag){
    this.imageDownloader.fetchData(tag,0);
  }

  refreshHand(){
    console.log("refresh");

    searchBlockBoolean=true;
    this.delay(1000).then(() => searchBlockBoolean=false);
    handArray=[];
    searchBar.value = "";
    this.fillHandWithRandomMemes();
  }

  fillHand(event){
    //console.log(event.data);

    let data = event.data,
    size = data.length,
    dataRandomStartOffset=0;
    if (size>Config.HAND_SIZE){
      dataRandomStartOffset=this.getRandomIntBetween0AndMax(size-Config.HAND_SIZE);
    }

    for (let i = 0; i < Config.HAND_SIZE; i++) {
      if (i<size){
        //console.log(size);
        this.addNewMemeToHand(data[i+dataRandomStartOffset]);
      }
    }
  }

  getRandomIntBetween0AndMax(max){
    let rand = Math.floor(Math.random() * max);
    return rand;
  }
  
  fillHandWithRandomMemes(){
    const alphabet = "abcdefghijklmnoprstuvwxyz";

    let randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)],
        data = this.imageDownloader.fetchData(randomCharacter,this.getRandomIntBetween0AndMax(Config.MAX_JSON_SEARCH_STARTPOINT));
  
    for (let i = 0; i < Config.HAND_SIZE; i++) {
      if (i< data.length){
        this.addNewMemeToHand(data[i]);
      }
    }  
  }

  addNewMemeToHand(imageSource) {
    //console.log(imageSource);
    
    if (handArray.length < Config.HAND_SIZE) {
      let newMeme = new Meme( imageSource, true);
      //console.log(handArray.length, Config.HAND_SIZE);
      handArray.push(newMeme);
      newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));
      
    }
    this.updateHand();
  }

  addNewMemeToField(imageSource) {
    console.log(imageSource);
    if (fieldArray.length < Config.MAX_MEMES) {
      let newMeme = new Meme(imageSource,
        false);

      fieldArray.push(newMeme);
      newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));
      newMeme.isInHand = false;
      console.log("add meme to field");
    }
    this.updatePlayingField();
  
  }

  checkMeme(event) {
    let memeName = event.data[0],
      currentLocation = event.data[1],
      swappingMeme = event.data[2],
      isInHand = event.data[3];
      

    if (currentLocation === "playingArea") {
      // this.removeMeme(memeName);

      if (isInHand) {

        this.addNewMemeToField(memeName);
      } else {
        this.swapMeme(memeName, swappingMeme);
      }
    } else if (isInHand === false) {
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
      0
    ]; //https://stackoverflow.com/questions/872310/javascript-swap-array-elements/872317
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
    currentPrompt = prompt;
    this.updatePlayingField();

  }
  storePlayedMemes() {
    window.localStorage.setItem("playedMemes", JSON.stringify(fieldArray));
  }

  removeMemeFromField(memeName) {
    fieldArray = fieldArray.filter((meme) => meme
      .id !==
      memeName);
    this.updatePlayingField();
  }


  addNewKeyword() {
    let newKeyWord = new KeyWord(searchBar.value);
    newKeyWord.keyWordEL.addEventListener("click", this.requestMemes(newKeyWord.keyword));
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
    this.playRatingSound(true);
    console.log("votedGood");
    if(roundCount < Config.MAX_ROUNDS){
    this.setGameStateRoundEnd();}
    else{
    this.setGameStateGameEnd();
    }
  }

  votedMeh() {
    console.log("votedMeh");
    if(roundCount < Config.MAX_ROUNDS){
      this.setGameStateRoundEnd();}
      else{
      this.setGameStateGameEnd();
      }
  }

  votedBad() {
    this.playRatingSound(false);
    console.log("votedBAD");
    if(roundCount < Config.MAX_ROUNDS){
      this.setGameStateRoundEnd();}
      else{
      this.setGameStateGameEnd();
      }
  }

  playRatingSound(good){
    
    if (good){
      let rand = Math.floor(Math.random() * Config.GOOD_AUDIO_NUM),

       audio = new Audio("/resources/rating_audio/good"+rand+".mp3");
      console.log("play rating sound: good:"+rand);
      switch(rand){
        case 2: audio.volume = 0.07; break;
        case 4: audio.volume = 0.07; break;
        case 6: audio.volume = 0.07; break;
        case 7: audio.volume = 0.35; break;
        case 8: audio.volume = 0.07; break;
        case 9: audio.volume = 0.17; break;
        case 10: audio.volume = 0.07; break;
        case 11: audio.volume = 0.06; break;
        case 12: audio.volume = 0.17; break;
        case 13: audio.volume = 0.2; break;
        case 15: audio.volume = 0.06; break;
        case 17: audio.volume = 0.06; break;
        case 18: audio.volume = 0.17; break;
        case 19: audio.volume = 0.05; break;
        default: audio.volume = 0.1; break;
      }
      audio.play();
    }
    else{
      let rand = Math.floor(Math.random() * Config.BAD_AUDIO_NUM),
      audio = new Audio("/resources/rating_audio/bad"+rand+".mp3");
      console.log("play rating sound: bad:"+rand);
      
      switch(rand){
        case 0: audio.volume = 0.07; break;
        case 2: audio.volume = 0.3; break;
        case 15: audio.volume = 0.4; break;
        case 18: audio.volume = 0.2; break;
        case 20: audio.volume = 0.07; break;

        default: audio.volume = 0.1; break;
      }
      audio.play();
    }
  }

  setGameStatePlay() {
    handArray = [];
    fieldArray = [];
    this.updatePlayingField();
    this.updateHand();
    this.gameProgressCard.start();
    this.setPrompt(this.prompt.generatePrompt());
    this.roundScoreboard.scoreboardView.hidden = true;
    this.playingField.gameView.hidden = false;
    this.playingField.playingFieldArea.hidden = false;
    //this.promptField.hidden = true;
    this.gameProgressCard.progressField.hidden = false;
    this.ratingView.ratingArea.hidden = true;
    this.ratingView.ratingField.hidden = true;
    this.hand.handArea.hidden = false;
    this.hand.divider.hidden = false;

  }


  setGameStateRate() {
    roundCount++;
    this.ratingView.updateView(Array.from(new Set(JSON.parse(window
      .localStorage.getItem("playedMemes")))));
    this.playingField.playingFieldArea.hidden = true;
    //this.promptField.hidden = true;
    this.gameProgressCard.progressField.hidden = true;
    this.ratingView.ratingArea.hidden = false;
    this.ratingView.ratingField.hidden = false;
    this.hand.handArea.hidden = true;
    this.hand.divider.hidden = true;
  }

  setGameStateRoundEnd() {
    this.playingField.gameView.hidden = true;
    this.roundScoreboard.scoreboardView.hidden = false;
    let story = new Story(currentPrompt, fieldArray, "Player1", 0);
    this.roundScoreboard.storyListView.appendChild(story.body);

  }

setGameStateGameEnd() {
    this.playingField.gameView.hidden = true;
    this.finalScore.endGameScreen.hidden = false;
    this.finalScore.addMemes(fieldArray);
    let story = new Story(currentPrompt, fieldArray, "Player1", 0);
    this.roundScoreboard.storyListView.appendChild(story.body);

  }
}
export default GameManager;