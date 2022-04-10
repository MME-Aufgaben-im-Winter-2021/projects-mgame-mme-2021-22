/**shows all created memestories one after the other */

class RatingView {
  constructor() {
    this.ratingArea = document.getElementById("ratingArea");
    this.ratingField = document.getElementById("ratingField");
    this.firstMemeSpace = document.querySelector(".card1");
    this.secondMemeSpace = document.querySelector(".card2");
    this.thirdMemeSpace = document.querySelector(".card3");
    this.ratingMemeBad = document.getElementById("ratingMemeBad");
    this.ratingMemeGood = document.getElementById("ratingMemeGood");
    //this.goodButton.addEventListener("click", this.votedGood.bind(this));
    //this.mehButton.addEventListener("click", this.votedMeh.bind(this));
    //this.badButton.addEventListener("click", this.votedBad.bind(this));
  }

  updateView(memes) {
    console.log("ratingview updated");

    if (this.ratingMemeBad===null){
      console.log("ratingmemebad is null");
    }
    else{
      console.log("ratingmemebad is NOT null");
    }
    if (this.ratingMemeGood===null){
      console.log("ratingmemeGOOD is null");
    }
    else{
      console.log("ratingmemeGOOD is NOT null");
    }
    this.setRatingMemeImages();
    //clear old images
    this.firstMemeSpace.innerHTML= "";
    this.secondMemeSpace.innerHTML ="";
    this.thirdMemeSpace.innerHTML ="";
    //try to fill image slots with selected memes
    try{
      if(memes.length > 0){this.firstMemeSpace.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[0] + "\">";}
      if(memes.length > 1){this.secondMemeSpace.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[1] + "\">";}
      if(memes.length > 2){this.thirdMemeSpace.innerHTML = "<img src=\"\\resources\\images_full\\" + memes[2] + "\">";}
    }
    catch{
      console.error("CATCH: CANT READ MEME DATA IN RATINGVIEW");
    }
  }

  setRatingMemeImages(){
    console.log("set rating meme images called");
    let names = ["girl","anyway","brain","dad","disappoint","drake","familyguy","gru","guy","hank","incredible","joey","joy","kanye","leonardo","life","look","obama","padme","patrick","pool","read","spiderman","spongebob","sports","squidgame","surprise"],
        rand = Math.floor(Math.random() * names.length);
      console.log("random bild:"+names[rand]);
    this.ratingMemeBad.src="\\resources\\rating_memes\\"+names[rand]+"_bad.png";
   
    this.ratingMemeGood.src="\\resources\\rating_memes\\"+names[rand]+"_good.png";
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