import { Event, Observable } from "../utils/Observable.js";

const MEME_TEMPLATE = document.querySelector("#meme-template").content.querySelector("div.meme").innerHTML;
var draggedMeme,
currentLocation;


class Meme extends Observable{

    constructor(memeName, image){
        super();
        this.id = memeName;
        this.playingArea = document.querySelector(".playingArea");
        this.handArea = document.querySelector(".handArea");
        this.body = document.createElement("li");
        this.body.innerHTML = MEME_TEMPLATE;
        this.body.classList.add("meme");
        this.imageSource = this.body.querySelector(".picture");
        console.log(this.imageSource);
        this.imageSource.innerHTML = "<img src=\""+ image + "\">";
        console.log(this.imageSource.innerText);
        this.body.setAttribute("draggable", "true");
        this.body.addEventListener('dragstart', () => {
            this.body.classList.add('dragging');
            draggedMeme = this.id;
        });
        this.body.addEventListener('dragend', () => {
            this.body.classList.remove('dragging');
            this.notifyAll(new Event("dragEnded", [draggedMeme, currentLocation]));
        });
        this.body.addEventListener('dragenter', () => {
            console.log("swap");
        });
        this.playingArea.addEventListener('dragenter', () => {
            currentLocation = "playingArea";
            console.log(currentLocation);
        });
        this.handArea.addEventListener('dragenter', () => {
            currentLocation = "handArea";
            console.log(currentLocation);
        });
    }

    getImageSource()
    {
        return this.imageSource.innerHTML;
    }

    getId()
    {
        return this.id;
    }
}
export default Meme;
