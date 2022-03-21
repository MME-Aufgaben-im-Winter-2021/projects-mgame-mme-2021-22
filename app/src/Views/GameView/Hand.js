/** player hand with cards and search function 
 * maybe split into output and input
 */
import Meme from "../../Controller/Meme.js";
import Observable from "../../utils/Observable.js";
import PlayingField from "./PlayingField.js";
import KeyWord from "../../Controller/KeyWord.js";



  

class Hand extends Observable {

  constructor() {
    super();
    this.playingField = new PlayingField;
    this.handArray = [];
    this.HandSpace = document.querySelector(".hand");
    this.searchBar = document.getElementById("searchBar");
    this.searchBar.addEventListener("change", this.onSearch.bind(this));
    this.keyWordArea = document.querySelector(".navbar-nav");
  }

  onSearch() {
    for (let i=0; i<10; i++){
    this.addNewMeme(this.searchBar.value,
      "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/a5/3a/b7/a53ab703-a5dc-e293-d8cf-b0b5708889bd/source/256x256bb.jpg");
    this.HandSpace.innerHTML = "";
    for (const meme of this.handArray) {

      this.HandSpace.appendChild(meme.body);
    }
  }
  this.addNewKeyword();
  }

  addNewMeme(memeName, imageSource) {
    if (this.handArray.length < 10) {
      let newMeme = new Meme(memeName, imageSource);
      this.handArray.push(newMeme);
      newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));
    }
  }

  removeMeme(memeName) {
    this.handArray = this.handArray.filter((meme) => meme.id !== memeName);
    this.updateHand();
  }

  checkMeme(event) {
    let memeName = event.data[0],
      location = event.data[1];

    if (location === "playingArea") {

      // this.removeMeme(memeName);
      this.playingField.addMeme(memeName,
        "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/a5/3a/b7/a53ab703-a5dc-e293-d8cf-b0b5708889bd/source/256x256bb.jpg");

    }
  }

  updateHand() {
    this.HandSpace.innerHTML = "";
    for (const meme of this.handArray) {
      this.HandSpace.appendChild(meme.body);
    }
  }

  addNewKeyword(){
    let newKeyWord = new KeyWord(this.searchBar.value);
    this.keyWordArea.appendChild(newKeyWord.body);
    console.log(newKeyWord);
  }

}
export default Hand;