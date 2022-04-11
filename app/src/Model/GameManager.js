
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
  searchBlockBoolean = false,
  clockSpeed = 0,
  timeRanOut = false,
  remainingTime = 60,
  lastSearchedTerm = "";
//manages all the events during the game phase
class GameManager extends Observable {

  constructor() {
    super();
    this.DAL = new AppwriteDAL();
    //initializing UI
    this.playingField = new PlayingField();
    this.hand = new Hand();
    this.ratingView = new RatingView();
    this.prompt = new Prompt();
    this.finalScore = new FinalScore();
    this.imageDownloader = new ImageDownloader();
    this.roundEndView = new RoundScoreboard();
    this.clock = document.getElementById("countdown");

    this.imageDownloader.addEventListener("imagesFetched", this.fillHand.bind(
      this));
    refreshButton.addEventListener("click", this.refreshHand.bind(this));
    saveButton.addEventListener("click", this.addNewKeyword.bind(this));
    submitButton.addEventListener("click", this.submitMemeStory.bind(this));
    searchBar.addEventListener("keydown", () => this.delay(Config.DELAY).then(
      () => this.onSearch()));

    this.fillHandWithRandomMemes();

  }

  clearIntervals() {
    var intervalId = window.setInterval(() => { return false; }, Config.CLEARAMOUNT);
    for (let i = 0; i < intervalId; i++) {
      window.clearInterval(i);
    }
  }

  initClock() {
    remainingTime = this.DAL.getRoundDuration();
    this.clearIntervals();
    timeRanOut = false;
    clockSpeed = Config.DEGREES / remainingTime;
    document.getElementById("clocktimer").style.transform = "rotate(" + 0 +
      "deg)";
  }

  updateClock() {
    if (timeRanOut === false) {
      let timerAngle = remainingTime * clockSpeed;
      remainingTime--;
      document.getElementById("clocktimer").style.transform = "rotate(" + -
        timerAngle + "deg)";

      if (remainingTime === -1) {
        timeRanOut = true;
        remainingTime=Number(this.DAL.getRoundDuration()) * Config
        .MS_TO_S_FACTOR;
      }
    }
  }

  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  //typing in the text bar requests memes from the json file
  onSearch() {
    if (searchBlockBoolean === false && searchBar.value.length >= 1) {
      searchBlockBoolean = true;
      this.delay(Config.DELAY).then(() => this.checkIfNewSearchIsNeeded());
      handArray = [];
      this.updateHand();
      lastSearchedTerm = searchBar.value;
      this.requestMemes(searchBar.value);
    }
  }

  checkIfNewSearchIsNeeded() {
    searchBlockBoolean = false;
    if (searchBar.value !== lastSearchedTerm) {
      this.onSearch();
    }
  }

  requestMemes(tag) {
    this.imageDownloader.fetchData(tag, 0);
  }

  //refreshes Hand with random memes
  refreshHand() {
    searchBlockBoolean = true;
    this.delay(Config.DELAY).then(() => searchBlockBoolean = false);
    handArray = [];
    searchBar.value = "";
    this.fillHandWithRandomMemes();
  }

  //fills hand with memes
  fillHand(event) {
    let data = event.data,
      size = data.length,
      dataRandomStartOffset = 0;
    if (size > Config.HAND_SIZE) {
      dataRandomStartOffset = this.getRandomIntBetween0AndMax(size - Config
        .HAND_SIZE);
    }

    for (let i = 0; i < Config.HAND_SIZE; i++) {
      if (i < size) {
        this.addNewMemeToHand(data[i + dataRandomStartOffset]);
      }
    }
  }

  getRandomIntBetween0AndMax(max) {
    let rand = Math.floor(Math.random() * max);
    return rand;
  }

  fillHandWithRandomMemes() {
    const alphabet = "abcdefghijklmnoprstuvwxyz";

    let randomCharacter = alphabet[Math.floor(Math.random() * alphabet
      .length)];
    this.imageDownloader.fetchData(randomCharacter, this
      .getRandomIntBetween0AndMax(Config.MAX_JSON_SEARCH_STARTPOINT));

  }

  //gets the meme url and sets it into the hand view
  addNewMemeToHand(imageSource) {

    if (handArray.length < Config.HAND_SIZE) {
      let newMeme = new Meme(imageSource, true);
      handArray.push(newMeme);
      newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));

    }
    this.updateHand();
  }
  //gets the meme url and sets it into the field view
  addNewMemeToField(imageSource) {
    if (fieldArray.length < Config.MAX_MEMES) {
      let newMeme = new Meme(imageSource,
        false);

      fieldArray.push(newMeme);
      newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));
      newMeme.isInHand = false;
    }
    this.updatePlayingField();
  }

  //checks if meme is supposed is in hand or field
  checkMeme(event) {
    let memeName = event.data[0],
      currentLocation = event.data[1],
      swappingMeme = event.data[2],
      isInHand = event.data[3];

    if (currentLocation === "playingArea") {

      if (isInHand) {

        this.addNewMemeToField(memeName);
      } else {
        this.swapMeme(memeName, swappingMeme);
      }
    } else if (isInHand === false) {
      this.removeMemeFromField(memeName);
    }
  }

  //swaps memes on field
  swapMeme(firstMeme, secondMeme) {
    let indexDragged,
      indexSwapped;

    for (let i = 0; i < fieldArray.length; i++) {
      let meme = fieldArray[i];
      if (meme.image === firstMeme) {
        indexDragged = i;
        break;
      }
    }
    for (let i = 0; i < fieldArray.length; i++) {
      let meme = fieldArray[i];
      if (meme.image === secondMeme) {
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
  //updates the field HTML
  updatePlayingField() {
    this.playingField.playingField.innerHTML = "";
    for (const meme of fieldArray) {
      this.playingField.playingField.appendChild(meme.body);
    }
    this.storePlayedMemes();
  }

  //sets the prompt
  setPrompt(prompt) {
    this.playingField.promptField.innerHTML = "";
    this.playingField.promptField.innerHTML = prompt;
    this.updatePlayingField();
  }
  //saves played memes in local storage
  storePlayedMemes() {
    window.localStorage.setItem("playedMemes", JSON.stringify(fieldArray));
  }

  //deletes memes
  removeMemeFromField(memeName) {
    fieldArray = fieldArray.filter((meme) => meme
      .image !==
      memeName);
    this.updatePlayingField();
  }

  //adds keyword to filter memes
  addNewKeyword() {
    let newKeyWord = new KeyWord(searchBar.value);
    newKeyWord.keyWordEL.addEventListener("click", () => {
      handArray = [];
      this.updateHand();
      this.requestMemes(newKeyWord.keyword);
    });
    // logs `false`);
    this.hand.keyWordArea.appendChild(newKeyWord.body);
  }

  //updates hand HTML
  updateHand() {
    this.hand.HandSpace.innerHTML = "";
    for (const meme of handArray) {
      this.hand.HandSpace.appendChild(meme.body);
    }
  }

  //submits the finished story
  submitMemeStory() {
    if (Config.HAS_SUBMITTED === false) {
      let memes = Array.from(new Set(JSON.parse(window
          .localStorage.getItem("playedMemes")))),
        memeIds = [];
      for (let meme of memes) { memeIds.push(meme.image); }
      this.DAL.uploadMemeStory(memeIds, roundCount);
      Config.HAS_SUBMITTED = true;
      submitButton.disabled = true;
    }

  }
  /*
   * HOST FUNCTIONS; 
   */

  //starts the rating phase
  async setGameStateRate() {
    this.playingField.playingFieldArea.hidden = true;
    this.ratingView.ratingArea.hidden = false;
    this.ratingView.ratingField.hidden = false;
    this.hand.handArea.hidden = true;
    this.clock.hidden = true;
    //
    let memes = await this.DAL.downloadMemeStories(roundCount),
      ratingManager = new RatingManager(memes, roundCount);
    ratingManager.displayMeme();
  }

  //starts the game phase
  setGameStatePlay() {
    this.clock.hidden = false;
    this.initClock();
    this.intervalID = window.setInterval(this.updateClock, Config.SECOND);
    this.roundEndView.scoreboardView.hidden = true;
    submitButton.disabled = false;
    Config.HAS_SUBMITTED = false;
    handArray = [];
    fieldArray = [];
    this.updatePlayingField();
    this.updateHand();
    this.playingField.gameView.hidden = false;
    this.playingField.playingFieldArea.hidden = false;
    this.ratingView.ratingArea.hidden = true;
    this.ratingView.ratingField.hidden = true;
    this.hand.handArea.hidden = false;
    //round timer
    if (window.localStorage.getItem(Config.ROLE_KEY) === Config.HOST_ROLE) {
      let roundDuration = Number(this.DAL.getRoundDuration()) * Config
        .MS_TO_S_FACTOR,
        prompt = this.prompt.generatePrompt();
      this.DAL.updatePrompt(prompt);
      //TO DO ADD ROUND DUR TO CLOCK ANIM
      setTimeout(this.hostSetGameStateRate.bind(this), roundDuration);
    }
    this.fillHandWithRandomMemes();
  }

  hostSetGameStateRate() {
    this.DAL.updateGameState(Config.RATING_PHASE);
  }

  //sets game state to round end
  setGameStateRoundEnd() {
    this.playingField.gameView.hidden = true;
    if (roundCount >= this.DAL.getRoundCount()) {
      let gameEndManager = new GameEndManager();
      gameEndManager.showFinalScore(roundCount);
    } else {
      let roundEndManager = new RoundEndManager();
      roundEndManager.showRoundScore(roundCount);
    }

    roundCount++;

  }

  //shows end screen
  setGameStateGameEnd() {
    this.playingField.gameView.hidden = true;
    let gameEndManager = new GameEndManager();
    gameEndManager.showFinalScore();
  }
}
export default GameManager;