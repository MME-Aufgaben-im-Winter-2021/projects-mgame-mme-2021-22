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

import Config from "../utils/Config.js";
import ImageDownloader from "../Controller/ImageDownloader.js";
import FinalScore from "../Views/EndOfGameView/FinalScoreboard.js";
import { AppwriteDAL } from "../../services/AppwriteService.js";
import RatingManager from "./RatingManager.js";
import RoundScoreboard from "../Views/EndOfRoundView/RoundScoreboard.js";
import RoundEndManager from "./RoundEndManager.js";
import GameEndManager from "./GameEndManager.js";


let submitButton = document.querySelector(".submit"),
  refreshButton = document.querySelector(".refresh"),
  saveButton = document.querySelector(".save"),
  searchBar = document.getElementById("searchBar"),
  handArray = [],
  fieldArray = [],
  roundCount = 1,
  searchBlockBoolean=false,
  clockspeed=0,
  timeRanOut=false,
  remainingTime=12,
  lastSearchedTerm="";

class GameManager extends Observable {

  constructor() {
    //GameManager gets called often because of bad MVC implementation; singleton for now
    if(GameManager.instance instanceof GameManager){
      return AppwriteDAL.instance;
    }
    super();
    this.DAL = new AppwriteDAL();
    this.gameProgressCard = new GameProgressCard();
    this.playingField = new PlayingField();
    this.hand = new Hand();
    this.ratingView = new RatingView();
    this.prompt = new Prompt();
    this.finalScore = new FinalScore();
    this.imageDownloader = new ImageDownloader();
    this.roundEndView = new RoundScoreboard();
    
    this.imageDownloader.addEventListener("imagesFetched", this.fillHand.bind(this));
    refreshButton.addEventListener("click", this.refreshHand.bind(this));
    saveButton.addEventListener("click", this.addNewKeyword.bind(this));
    submitButton.addEventListener("click", this.submitMemeStory.bind(this));
    //searchBar.addEventListener("change", this.onSearch.bind(this));
    //searchBar.addEventListener("change", this.onSearch);
    searchBar.addEventListener("keydown", () => this.delay(Config.DELAY).then(() => this.onSearch()));
    this.fillHandWithRandomMemes();
    
    this.initClock();
    this.intervalID = window.setInterval(this.updateClock, 1000);
    Object.freeze(this);
    GameManager.instance = this;
  }

  clearIntervals(){
    var interval_id = window.setInterval(()=>{return false;}, 99999);
    for (let i = 0; i < interval_id; i++){
      window.clearInterval(i);
    }
  }

  initClock(){
      this.clearIntervals();
      timeRanOut=false;
      clockspeed=360/remainingTime;
      document.getElementById("clocktimer").style.transform = "rotate(" + 0 + "deg)";
  }


  updateClock(){
    console.log("clock");
    if (timeRanOut===false){
      console.log("clock ranout false");
      let timerAngle = remainingTime * clockspeed;
      remainingTime--;
      document.getElementById("clocktimer").style.transform = "rotate(" + -timerAngle + "deg)";

      if (remainingTime===-1){
        console.log("CLOCK DONE");
        timeRanOut=true;

      }
    }
  }


  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  onSearch() {
    if (searchBlockBoolean===false&&searchBar.value.length>=1){
      searchBlockBoolean=true;
      this.delay(Config.DELAY).then(() => this.checkIfNewSearchIsNeeded());
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
    searchBlockBoolean=true;
    this.delay(Config.DELAY).then(() => searchBlockBoolean=false);
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

    let randomCharacter = alphabet[Math.floor(Math.random() * alphabet.length)];
       this.imageDownloader.fetchData(randomCharacter,this.getRandomIntBetween0AndMax(Config.MAX_JSON_SEARCH_STARTPOINT));
        /*
    for (let i = 0; i < Config.HAND_SIZE; i++) {
      if (i< data.length){
        this.addNewMemeToHand(data[i]);
      }
      
    }  */
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
    //console.log(imageSource);
    if (fieldArray.length < Config.MAX_MEMES) {
      let newMeme = new Meme(imageSource,
        false);

      fieldArray.push(newMeme);
      newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));
      newMeme.isInHand = false;
      //console.log("add meme to field");
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
    this.playingField.playingField.innerHTML = "";
    for (const meme of fieldArray) {
      this.playingField.playingField.appendChild(meme.body);
    }
    this.storePlayedMemes();
  }
  
  setPrompt(prompt) {
    this.playingField.promptField.innerHTML ="";
    this.playingField.promptField.innerHTML = prompt;
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
    newKeyWord.keyWordEL.addEventListener("click", () => {
      handArray = [];
      this.updateHand();
      this.requestMemes(newKeyWord.keyword); });
      // logs `false`);
    this.hand.keyWordArea.appendChild(newKeyWord.body);
  }

  updateHand() {
    this.hand.HandSpace.innerHTML = "";
    for (const meme of handArray) {
      this.hand.HandSpace.appendChild(meme.body);
    }
  }

  submitMemeStory() {
    if(Config.HAS_SUBMITTED === false){
      let memes = Array.from(new Set(JSON.parse(window
        .localStorage.getItem("playedMemes")))), memeIds = [];
      for(let meme of memes){ memeIds.push(meme.id);}
      this.DAL.uploadMemeStory(memeIds, roundCount);
      Config.HAS_SUBMITTED = true;
      submitButton.disabled = true;
    }
    
  }

  async setGameStateRate(){
    this.playingField.playingFieldArea.hidden = true;
    this.gameProgressCard.progressField.hidden = true;
    this.ratingView.ratingArea.hidden = false;
    this.ratingView.ratingField.hidden = false;
    this.hand.handArea.hidden = true;
    //
    let memes = await this.DAL.downloadMemeStories(roundCount),
    ratingManager = new RatingManager(memes);
    ratingManager.displayMeme();
  }
  /*
   * HOST FUNCTIONS; 
   */
  setGameStatePlay() {
    this.roundEndView.scoreboardView.hidden = true;
    submitButton.disabled = false;
    Config.HAS_SUBMITTED = false;
    handArray = [];
    fieldArray = [];
    this.updatePlayingField();
    this.updateHand();
    //this.gameProgressCard.start();
    this.playingField.gameView.hidden = false;
    this.playingField.playingFieldArea.hidden = false;
    //this.promptField.hidden = true;
    //this.gameProgressCard.progressField.hidden = false;
    this.ratingView.ratingArea.hidden = true;
    this.ratingView.ratingField.hidden = true;
    this.hand.handArea.hidden = false;
    //round timer
    if(window.localStorage.getItem(Config.ROLE_KEY) === Config.HOST_ROLE){
      let roundDuration = Number(this.DAL.getRoundDuration()) * Config.MS_TO_S_FACTOR, prompt = this.prompt.generatePrompt();
      this.DAL.updatePrompt(prompt);
      //TO DO ADD ROUND DUR TO CLOCK ANIM
      setTimeout(this.hostSetGameStateRate.bind(this), roundDuration);
    }
    this.fillHandWithRandomMemes();
  }

  hostSetGameStateRate(){
    this.DAL.updateGameState(Config.RATING_PHASE);
  }

  setGameStateRoundEnd() {
    this.playingField.gameView.hidden = true;
    if(roundCount >= this.DAL.getRoundCount()){
      let gameEndManager = new GameEndManager();
      gameEndManager.showFinalScore(roundCount);
    }else{
      let roundEndManager = new RoundEndManager();
      roundEndManager.showRoundScore(roundCount);
    }
    
    roundCount++;
      //let story = new Story(currentPrompt, fieldArray, "Best Story: " + this.getCurrentRoundWinningPlayerName(), 0);
      //this.roundScoreboard.storyListView.appendChild(story.body);
      //document.getElementById("titleOfTheStory").innerHTML=currentPrompt;
    
  }

  getCurrentRoundWinningPlayerName(){
    return "winner";
  }

  setGameStateGameEnd() {
    this.playingField.gameView.hidden = true;
    let gameEndManager = new GameEndManager();
    gameEndManager.showFinalScore();
  }
}
export default GameManager;