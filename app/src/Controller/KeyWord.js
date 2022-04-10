class KeyWord {
  constructor(keyword) {

    this.KEYWORD_TEMPLATES = document.querySelector("#keyword-template")
      .content
      .querySelector("li.nav-item").innerHTML;
    this.keyword = keyword;
    this.body = document.createElement("ul");
    this.body.innerHTML = this.KEYWORD_TEMPLATES;
    this.body.classList.add("nav-item");
    this.keyWordEL = this.body.querySelector(".nav-link");
    this.keyWordEL.innerHTML = this.keyword;
  }

}
export default KeyWord;