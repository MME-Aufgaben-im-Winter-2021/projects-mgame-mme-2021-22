/** player hand with cards and search function 
 * maybe split into output and input
 */
import Meme from "../../Controller/Meme.js";
import Observable from "../../utils/Observable.js";

var searchBar;

class Hand extends Observable {

  constructor() {
    super();
    this.HandSpace = document.querySelector(".memes");
    console.log(this.HandSpace);
    this.handArray = [];

  }
  addNewMeme(memeName, imageSource) {

    let newMeme = new Meme(memeName, imageSource);
    this.handArray.push(newMeme);
    console.log(imageSource);

  }

  onSearch() {
    console.log(searchBar.value);
    this.addNewMeme(searchBar.value,
      "https://unternehmer.de/wp-content/uploads/2019/02/meme-marketing-mehr-als-nur-ein-trend.jpg"
    );
    this.HandSpace.innerHTML = "";
    for (const meme of this.handArray) {

      this.HandSpace.appendChild(meme.body);
    }

  }

  removeMeme(memeName) {
    this.handArray = this.handArray.filter((meme) => meme.id !== memeName);
    this.updateHand();
  }

  updateHand() {
    for (const meme of this.handArray) {
      this.HandSpace.appendChild(meme.body);
    }
    console.log(this.HandSpace);
  }
}
export default Hand;