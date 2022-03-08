/** player hand with cards and search function 
 * maybe split into output and input
 */
import Meme from "../../Controller/Meme.js";
import Observable from "../../utils/Observable.js";
import PlayingField from "./PlayingField.js";
const data = new Promise((resolve, reject) => {
  fetch('./resources/meme_json_data.json')
      .then(respond => {
          resolve(respond.json());
      }).catch(err => {
          reject(err);
   });
  });

var searchBar,
  HandSpace,
  playingField = new PlayingField;

class Hand extends Observable {

  constructor() {
    super();
    this.handArray = [];
    HandSpace = document.querySelector(".hand");
    searchBar = document.querySelector("input");
    searchBar.addEventListener("change", this.onSearch.bind(this));
    console.log(data);

  }

  onSearch() {
    this.addNewMeme(searchBar.value,
      "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/a5/3a/b7/a53ab703-a5dc-e293-d8cf-b0b5708889bd/source/256x256bb.jpg");
    HandSpace.innerHTML = "";
    for (const meme of this.handArray) {

      HandSpace.appendChild(meme.body);
    }

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
      playingField.addMeme(memeName,
        "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/a5/3a/b7/a53ab703-a5dc-e293-d8cf-b0b5708889bd/source/256x256bb.jpg");

    }
  }

  updateHand() {
    HandSpace.innerHTML = "";
    for (const meme of this.handArray) {
      HandSpace.appendChild(meme.body);
    }
  }

}
export default Hand;