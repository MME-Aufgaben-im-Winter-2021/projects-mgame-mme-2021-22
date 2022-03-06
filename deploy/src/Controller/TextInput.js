import Observable from "../utils/Observable";

class TextInput extends Observable{
    constructor(){
        super();
        this.searchBar = document.querySelector("input");
        this.searchBar.addEventListener("change",this.notifyAll());
    }
}
export default TextInput;