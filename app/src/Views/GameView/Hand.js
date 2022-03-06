/** player hand with cards and search function 
 * maybe split into output and input
 */
import Meme from "../../Controller/Meme.js";
import Observable from "../../utils/Observable.js";

var searchBar,
  HandSpace = document.querySelector(".memes"),
  handArray = [];

function addNewMeme(memeName, imageSource) {
  let newMeme = new Meme(memeName, imageSource);
  handArray.push(newMeme);
  newMeme.addEventListener("dragEnded", checkMeme);
}

function removeMeme(memeName) {
  handArray = handArray.filter((meme) => meme.id !== memeName);
  updateHand();
}

function checkMeme(event) {
  let memeName = event.data[0],
    location = event.data[1],
    memeExists = false;

  if (location === "playingArea") {
    for (let i = 0; i < handArray.length; i++) {
      const meme = handArray[i];
      if (meme.id === memeName) {
        memeExists = true;

      }
    }
    if (memeExists === true) {
      removeMeme(memeName);

    }

  } else {
    addNewMeme(memeName,
      "https://docrdsfx76ssb.cloudfront.net/static/1645730902/pages/wp-content/uploads/2020/05/illo-mobile-810x480-1.jpg"
      );
  }
}

function updateHand() {
  HandSpace.innerHTML = "";
  for (const meme of handArray) {
    HandSpace.appendChild(meme.body);
  }
}

class Hand extends Observable {

  constructor() {
    super();
    HandSpace = document.querySelector(".memes");
    handArray = [];
    searchBar = document.querySelector("input");
    searchBar.addEventListener("change", this.onSearch);

  }

  onSearch() {
    addNewMeme(searchBar.value,
      "https://unternehmer.de/wp-content/uploads/2019/02/meme-marketing-mehr-als-nur-ein-trend.jpg"
      );
    HandSpace.innerHTML = "";
    for (const meme of handArray) {

      HandSpace.appendChild(meme.body);
    }

  }


  removeMeme(memeName) {
    this.handArray = this.handArray.filter((meme) => meme.id !== memeName);
    this.updateHand();
  }

}
export default Hand;