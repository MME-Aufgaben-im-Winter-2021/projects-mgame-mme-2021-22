import { Event, Observable } from "../utils/Observable.js";

const MEME_TEMPLATE = document.querySelector("#meme-template").content
  .querySelector("div.meme").innerHTML;

var draggedMeme,
  swappingMeme,
  currentLocation,
  fileName;

class Meme extends Observable {

  constructor(image, isInHand) {
    super();
    this.id = image;
    this.image = image;
    this.isInHand = isInHand;
    this.playingArea = document.querySelector(".playingArea");
    this.handArea = document.querySelector(".handMemeArea");
    this.body = document.createElement("ul");
    this.body.innerHTML = MEME_TEMPLATE;
    this.body.classList.add("meme");
    this.imageSource = this.body.querySelector(".picture");
    this.imageSource.innerHTML = "<img src=\"\\resources\\images_full\\" + image + "\">";
    this.body.setAttribute("draggable", "true");
    this.body.addEventListener('dragstart', () => {
      this.body.classList.add('dragging');
      draggedMeme = this.id;
    });
    this.body.addEventListener('dragend', () => {
      this.body.classList.remove('dragging');
      this.notifyAll(new Event("dragEnded", [draggedMeme, currentLocation, swappingMeme, this.isInHand, this.imageSource]));
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
    
  }


  getImageSource() {
    return this.imageSource.innerHTML;
  }

  getId() {
    return this.id;
  }
}
export default Meme;