/**shows all created memestories one after the other */



class RatingView
{
constructor(){
    this.titleField = document.querySelector(".title");
    this.firstMemeSpace = document.querySelector(".meme1");
    this.secondMemeSpace = document.querySelector(".meme2");
    this.thirdMemeSpace = document.querySelector(".meme3");
    console.log(this.titleField);
}

updateView(memes){
    console.log(memes);
    this.firstMemeSpace.innerHTML = "";
    this.firstMemeSpace.appendChild(memes[0].body);
    this.secondMemeSpace.innerHTML = "";
    this.firstMemeSpace.appendChild(memes[1].body);
    this.thirdMemeSpace.innerHTML = "";
    this.thirdMemeSpace.appendChild(memes[2].body);
}

}
export default RatingView;