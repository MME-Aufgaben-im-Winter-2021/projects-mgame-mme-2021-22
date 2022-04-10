/** player hand with cards and search function 
 * maybe split into output and input
 */
import Observable from "../../utils/Observable.js";

class Hand extends Observable {

  constructor() {
    super();
    this.divider = document.getElementById("divider");
    this.handArray = [];
    this.HandSpace = document.querySelector(".hand");
    this.handArea = document.getElementById("handArea");
    this.keyWordArea = document.querySelector(".navbar-nav");
  }

}
export default Hand;