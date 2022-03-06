/** player hand with cards and search function 
 * maybe split into output and input
*/
import Meme from "../../Controller/Meme.js";
import Observable from "../../utils/Observable.js";

var searchBar,
handArray = [];

function addNewMeme(memeName,imageSource)
{

let newMeme = new Meme(memeName, imageSource);
handArray.push(newMeme);
console.log(imageSource);

}

class Hand extends Observable
{

constructor(){
    super();
    this.HandSpace = document.querySelector(".memes");
    console.log(this.HandSpace);
    this.handArray = [];

  

}

onSearch(){
    console.log(searchBar.value);
    addNewMeme(searchBar.value, "https://unternehmer.de/wp-content/uploads/2019/02/meme-marketing-mehr-als-nur-ein-trend.jpg");
    this.HandSpace.innerHTML = "";
    for (const meme of handArray) {
        
        this.HandSpace.appendChild(meme.body);
    }
    
}



removeMeme(memeName)
{
this.handArray = this.handArray.filter((meme) => meme.id !== memeName );
this.updateHand();
}

updateHand()
{
    for (const meme of handArray) {
        this.HandSpace.appendChild(meme.body);
    }
    console.log(this.HandSpace);
}
}
export default Hand;