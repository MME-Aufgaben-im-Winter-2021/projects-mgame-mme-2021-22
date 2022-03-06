/** playing field. players drop cards in here */
import Meme from "../../Controller/Meme";
import Observable from "../../utils/Observable";
class PlayingField extends Observable
{

constructor()
{
    super();
 this.playingField = document.querySelector(".playingField");
 this.playingFieldArray = [];
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
    for (const meme of this.handArray) {
        this.HandSpace.appendChild(meme.body);
    }
}
}
export default PlayingField;