const MEME_TEMPLATE = document.querySelector("#meme-template").content.querySelector("li.meme").innerHTML;
var draggedMeme;

class Meme{

    constructor(memeName, image){
        this.id = memeName;
        this.body = document.createElement("li");
        this.body.innerHTML = MEME_TEMPLATE;
        this.body.classList.add("meme");
        this.imageSource = this.body.querySelector(".picture");
        console.log(this.imageSource);
        this.imageSource.innerHTML = "<img src\""+ image + "\">";
        console.log(this.imageSource.innerText);
        this.body.setAttribute("draggable", "true");
        this.body.addEventListener('dragstart', () => {
            this.body.classList.add('dragging');
            draggedMeme = this.id;
        });
        this.body.addEventListener('dragend', () => {
            this.body.classList.remove('dragging');
            this.notifyAll(new Event("dragEnded", draggedMeme));
        });
        this.body.addEventListener('dragenter', () => {
            draggedMeme = this.id;
        });
    
    }

    getImageSource()
    {
        return this.imageSource;
    }

    getId()
    {
        return this.id;
    }
}
export default Meme;
