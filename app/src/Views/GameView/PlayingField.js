/** playing field. players drop cards in here */
import Meme from "../../Controller/Meme.js";
import Observable from "../../utils/Observable.js";

var playingField;

class PlayingField extends Observable
{

constructor()
{
super();
 playingField = document.querySelector(".playingField");
 this.playingFieldArray = [];
 playingField.addEventListener("dragEnded", this.checkMeme);  
 console.log(playingField);
}

addMeme(memeName, imageSource)
{
let newMeme = new Meme(memeName, imageSource);  
this.playingFieldArray.push(newMeme);
this.updatePlayingField();
}

removeMeme(memeName)
{
this.playingFieldArray = this.playingFieldArray.filter((meme) => meme.id !== memeName );
this.updatePlayingField();
}

updatePlayingField()
{
    this.playingField.innerHTML = "";
    for (const meme of this.handArray) {
        this.HandSpace.appendChild(meme.body);
    }
}
checkMeme(event) {
    let memeName = event.data[0],
      location = event.data[1],
      memeExists = false;
      console.log(memeName, location);
  
    if (location === "handArea") {
      for (let i = 0; i < this.playingFieldArray.length; i++) {
        const meme = this.playingFieldArray[i];
        if (meme.id === memeName) {
          memeExists = true;
  
        }
      }
      if (memeExists === true) {
        this.removeMeme(memeName);
        console.log(memeName, location);
  
      }
  
    } else {
      this.addMeme(memeName,
        "https://docrdsfx76ssb.cloudfront.net/static/1645730902/pages/wp-content/uploads/2020/05/illo-mobile-810x480-1.jpg"
        );
    }
  }
}
export default PlayingField;