/** player hand with cards and search function 
 * maybe split into output and input
 */
import Observable from "../../utils/Observable.js";
//view of hand
class Hand extends Observable {

  constructor() {
    super();
    this.divider = document.getElementById("divider");
    this.handSpace = document.getElementById("hand");
    this.handArea = document.getElementById("handArea");
    this.keyWordArea = document.querySelector(".navbar-nav");
  }

  addMemeToHand(memeView){
  this.handSpace.innerHTML = memeView;
  }

  clearHand(){
    this.handSpace.innerHTML = "";
  }

  hideView(){
    this.divider.hidden = true;
    this.handSpace.hidden = true;
    this.handArea.hidden = true;
    this.keyWordArea.hidden = true;
  }

  showView(){
    this.divider.hidden = false;
    this.handSpace.hidden = false;
    this.handArea.hidden = false;
    this.keyWordArea.hidden = false;
  }

}
export default Hand;