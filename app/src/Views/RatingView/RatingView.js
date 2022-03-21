/**shows all created memestories one after the other */



class RatingView {
  constructor() {
    this.titleField = document.querySelector(".title");
    this.firstMemeSpace = document.querySelector(".card1");
    this.secondMemeSpace = document.querySelector(".card2");
    this.thirdMemeSpace = document.querySelector(".card3");
    this.goodButton = document.getElementById("good");
    this.mehButton = document.getElementById("meh");
    this.badButton = document.getElementById("bad");
    this.goodButton.addEventListener("click", this.votedGood.bind(this));
    this.mehButton.addEventListener("click", this.votedMeh.bind(this));
    this.badButton.addEventListener("click", this.votedBad.bind(this));
    console.log(this.titleField);
  }

  updateView(memes) {
    this.firstMemeSpace.innerHTML = "<img src=\"" + memes[0].image + "\">";
    this.secondMemeSpace.innerHTML = "<img src=\"" + memes[1].image + "\">";
    this.thirdMemeSpace.innerHTML = "<img src=\"" + memes[2].image + "\">";
  }

  votedGood() {
    console.log("votedGood");
  }

  votedMeh() {
    console.log("votedMeh");
  }

  votedBad() {
    console.log("votedBAD");
  }

}

export default RatingView;