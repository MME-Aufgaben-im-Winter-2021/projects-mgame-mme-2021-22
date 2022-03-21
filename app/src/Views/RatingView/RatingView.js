/**shows all created memestories one after the other */



class RatingView {
  constructor() {
    this.ratingField = document.getElementById("ratingField");
    this.ratingArea = document.getElementById("ratingArea");
    this.titleField = document.querySelector(".title");
    this.firstMemeSpace = document.querySelector(".card1");
    this.secondMemeSpace = document.querySelector(".card2");
    this.thirdMemeSpace = document.querySelector(".card3");
    
    console.log(this.titleField);
  }

  updateView(memes) {
    this.firstMemeSpace.innerHTML = "<img src=\"" + memes[0].image + "\">";
    this.secondMemeSpace.innerHTML = "<img src=\"" + memes[1].image + "\">";
    this.thirdMemeSpace.innerHTML = "<img src=\"" + memes[2].image + "\">";
  }
}
 

export default RatingView;