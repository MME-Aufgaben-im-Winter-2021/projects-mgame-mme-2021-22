/** playing field. players drop cards in here */
import Meme from "../../Controller/Meme.js";
import Observable from "../../utils/Observable.js";
import Hand from "./Hand.js";

var playingField,
promptField,
playingFieldArray = [];


class PlayingField extends Observable
{

constructor()
{
super();
 playingField = document.querySelector(".field");
 promptField = document.querySelector(".promptField");
 promptField.innerHTML = "Describe your funniest moment last year";
 console.log(playingField);
}

addMeme(memeName, imageSource)
{
let newMeme = new Meme(memeName, imageSource);  
playingFieldArray.push(newMeme);
console.log(playingFieldArray);
newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));  
this.updatePlayingField();
}

removeMeme(memeName)
{
playingFieldArray = playingFieldArray.filter((meme) => meme.id !== memeName );
this.updatePlayingField();
}

updatePlayingField()
{
    playingField.innerHTML = "";
    for (const meme of playingFieldArray) {
        playingField.appendChild(meme.body);
    }
}
checkMeme(event) {
    let memeName = event.data[0],
      location = event.data[1];
      console.log(memeName, location);
  
    if (location === "handArea") {
      console.log(playingFieldArray);
        this.removeMeme(memeName);

      }
    } 
  
}
export default PlayingField;