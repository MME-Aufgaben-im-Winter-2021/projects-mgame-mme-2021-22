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
 promptField.innerHTML = "<h1> Describe your funniest moment last year </h1>";
}

addMeme(memeName, imageSource)
{
  if(playingFieldArray.length < 3){
let newMeme = new Meme(memeName, imageSource);  
playingFieldArray.push(newMeme);
newMeme.addEventListener("dragEnded", this.checkMeme.bind(this));  
this.updatePlayingField();
  }
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
      location = event.data[1],
      swappingMeme = event.data[2];
  
    if (location === "handArea") {
        this.removeMeme(memeName);

      }
      else{
        this.swapMeme(memeName,swappingMeme);
        console.log("swapped");
      }
    }
swapMeme(firstMeme, secondMeme)
{
  let indexDragged,
   indexSwapped;

  for (let i = 0; i < playingFieldArray.length; i++) {
      let meme = playingFieldArray[i];
      if (meme.id === firstMeme) {
          indexDragged = i;
          break;
      }
  }
  for (let i = 0; i < playingFieldArray.length; i++) {
      let meme = playingFieldArray[i];
      if (meme.id === secondMeme) {
          indexSwapped = i;
          break;
      }
  }
  playingFieldArray[indexDragged] = playingFieldArray.splice(indexSwapped, 1, playingFieldArray[indexDragged])[0]; //https://stackoverflow.com/questions/872310/javascript-swap-array-elements/872317
  this.updatePlayingField();
} 

getPlayingFieldArrayLength(){
  return playingFieldArray.length;
}
  
}
export default PlayingField;