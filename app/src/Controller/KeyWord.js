const KEYWORD_TEMPLATES = document.querySelector("#keyword-template").content
  .querySelector("li.nav-item").innerHTML;

class KeyWord{
constructor(keyword){



    this.keyword = keyword;
    this.body = document.createElement("ul");
    this.body.innerHTML = KEYWORD_TEMPLATES;
    this.body.classList.add("nav-item");
    this.keyWordEL = this.body.querySelector(".nav-link");
    this.keyWordEL.innerHTML = this.keyword;
    this.body.addEventListener("click", console.log("joffof"));
    console.log(this.keyWordEL);

}

}
export default KeyWord;