import { Event, Observable } from "../utils/Observable.js";

var draggedMeme,
  swappingMeme,
  currentLocation;
//Draggable object, template with the meme pictures
class MemeView extends Observable {

  constructor(meme) {
    super();
    this.MEME_TEMPLATE = document.querySelector("#meme-template").content
      .querySelector("div.meme").innerHTML;
    this.image = meme.url;
    //the meme has to know where it is 
    this.playingArea = document.querySelector(".playingArea");
    this.handArea = document.querySelector(".handMemeArea");
    this.body = document.createElement("ul");
    this.body.innerHTML = this.MEME_TEMPLATE;
    this.body.classList.add("meme");
    this.imageSource = this.body.querySelector(".picture");
    this.imageSource.innerHTML = "<img src=\"\\resources\\images_full\\" +
      this.image + "\">";
    this.body.setAttribute("draggable", "true");
    this.body.addEventListener("dragstart", () => {
      this.body.classList.add("dragging");
      draggedMeme = this.image;
    });
    this.body.addEventListener("dragend", () => {
      this.body.classList.remove("dragging");
      this.notifyAll(new Event("dragEnded", [draggedMeme, currentLocation,
        swappingMeme, this.isInHand, this.imageSource]));
    });
    this.body.addEventListener("dragenter", () => {
      swappingMeme = this.image;
    });
    this.playingArea.addEventListener("dragenter", () => {
      currentLocation = "playingArea";
    });
    this.handArea.addEventListener("dragenter", () => {
      currentLocation = "handArea";
    });

  }

}
export default MemeView;