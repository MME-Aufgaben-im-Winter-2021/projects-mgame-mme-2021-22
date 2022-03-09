/**shows all created memestories one after the other */



class RatingView
{
constructor(memes){
    this.memes = memes;
    this.jsarray = JSON.parse(sessionStorage.getItem("jsArray"));
    this.titleField = document.querySelector(".title");
    this.firstMemeSpace = document.querySelector(".meme1");
    this.secondMemeSpace = document.querySelector(".meme2");
    this.thirdMemeSpace = document.querySelector(".meme3");
    console.log(this.titleField);
    this.updateView();
    
}

updateView(){
    console.log("here");
    this.firstMemeSpace.innerHTML = "";
    this.firstMemeSpace.appendChild(this.jsarray[0].body);
    this.secondMemeSpace.innerHTML = "";
    this.firstMemeSpace.appendChild(this.jsarray[1].body);
    this.thirdMemeSpace.innerHTML = "";
    this.firstMemeSpace.appendChild(this.jsarray[2].body);
}

}
export default RatingView;