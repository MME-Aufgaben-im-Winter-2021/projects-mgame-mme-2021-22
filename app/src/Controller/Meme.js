import { Event, Observable } from "../utils/Observable.js";

const MEME_TEMPLATES = document.querySelector("#meme-template").content
  .querySelector("div.meme").innerHTML;

var draggedMeme,
  swappingMeme,
  currentLocation;

class Meme extends Observable {

  constructor(memeName, image) {
    super();
    this.id = memeName;
    this.image = image;
    this.playingArea = document.querySelector(".playingArea");
    this.handArea = document.querySelector(".handMemeArea");
    this.body = document.createElement("ul");
    this.body.innerHTML = MEME_TEMPLATES;
    this.body.classList.add("meme");
    this.imageSource = this.body.querySelector(".picture");
    this.imageSource.innerHTML = "<img src=\"" + image + "\">";
    this.body.setAttribute("draggable", "true");
    this.body.addEventListener('dragstart', () => {
      this.body.classList.add('dragging');
      draggedMeme = this.id;
    });
    this.body.addEventListener('dragend', () => {
      this.body.classList.remove('dragging');
      this.notifyAll(new Event("dragEnded", [draggedMeme, currentLocation,swappingMeme]));
    });
    this.body.addEventListener('dragenter', () => {
      swappingMeme = this.id;
    });
    this.playingArea.addEventListener('dragenter', () => {
      currentLocation = "playingArea";
    });
    this.handArea.addEventListener('dragenter', () => {
      currentLocation = "handArea";
    });
    this.fetchData();
  }
  fetchData() {
    let data = new Promise((resolve, reject) => {
      fetch('./resources/meme_json_data.json')
        .then(respond => {
          resolve(respond.json());
        }).catch(err => {
          reject(err);
        });
    });

    data.then(meme => {
      console.log(meme[2,0]);

    });
    
  }

  getImageSource() {
    return this.imageSource.innerHTML;
  }

  getId() {
    return this.id;
  }
}
export default Meme;