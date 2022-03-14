/**shows all created memestories one after the other */



class RatingView
{
constructor(){
    this.titleField = document.querySelector(".title");
    this.firstMemeSpace = document.querySelector(".meme1");
    this.secondMemeSpace = document.querySelector(".meme2");
    this.thirdMemeSpace = document.querySelector(".meme3");
    this.goodButton = document.getElementById("good");
    this.mehButton = document.getElementById("meh");
    this.badButton = document.getElementById("bad");
    this.goodButton.addEventListener("click", this.votedGood.bind(this));
    this.mehButton.addEventListener("click", this.votedMeh.bind(this));
    this.badButton.addEventListener("click", this.votedBad.bind(this));
    console.log(this.titleField);
}

updateView(memes){
    console.log(memes);
    this.firstMemeSpace.innerHTML = "";
    this.firstMemeSpace.appendChild(memes[0].body);
    this.secondMemeSpace.innerHTML = "";
    this.secondMemeSpace.appendChild(memes[1].body);
    this.thirdMemeSpace.innerHTML = "";
    this.thirdMemeSpace.appendChild(memes[2].body);
}

votedGood(){
console.log("votedGood");
}

votedMeh(){
    console.log("votedMeh");
}

votedBad(){
    console.log("votedBAD");
}

}

export default RatingView;