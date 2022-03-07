/** player hand with cards and search function 
 * maybe split into output and input
 */
import Meme from "../../Controller/Meme.js";
import Observable from "../../utils/Observable.js";
import PlayingField from "./PlayingField.js";

var searchBar,
  HandSpace,
  handArray = [],
  playingField = new PlayingField;

class Hand extends Observable {

  constructor() {
    super();
    HandSpace = document.querySelector(".hand");
    searchBar = document.querySelector("input");
    searchBar.addEventListener("change", this.onSearch.bind(this));

  }

  onSearch() {
    this.addNewMeme(searchBar.value,
      "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/a5/3a/b7/a53ab703-a5dc-e293-d8cf-b0b5708889bd/source/256x256bb.jpg"
      );
    HandSpace.innerHTML = "";
    for (const meme of handArray) {

      HandSpace.appendChild(meme.body);
    }

  }
  addNewMeme(memeName, imageSource) {
    let newMeme = new Meme(memeName, imageSource);
    handArray.push(newMeme);
    newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));
  }
  
  removeMeme(memeName) {
    handArray = handArray.filter((meme) => meme.id !== memeName);
    this.updateHand();
  }
  
  checkMeme(event) {
    let memeName = event.data[0],
      location = event.data[1];
  
    if (location === "playingArea") {

        this.removeMeme(memeName);
        playingField.addMeme(memeName,
          "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/a5/3a/b7/a53ab703-a5dc-e293-d8cf-b0b5708889bd/source/256x256bb.jpg" );
  
    }
  }
  
  updateHand() {
    HandSpace.innerHTML = "";
    for (const meme of handArray) {
      HandSpace.appendChild(meme.body);
    }
  }

}
export default Hand;