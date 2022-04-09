class KeyWord{
constructor(keyword){

  this.KEYWORD_TEMPLATES = document.querySelector("#keyword-template").content
  .querySelector("li.nav-item").innerHTML;
    this.keyword = keyword;
    this.body = document.createElement("ul");
    this.body.innerHTML = this.KEYWORD_TEMPLATES;
    this.body.classList.add("nav-item");
    this.keyWordEL = this.body.querySelector(".btn");
    this.keyWordEL.innerHTML = this.keyword;
    this.keyWordEL.addEventListener("click", console.log("joffof"));
    console.log(this.keyWordEL);

}

}
export default KeyWord;