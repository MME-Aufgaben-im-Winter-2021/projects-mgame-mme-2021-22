import { Event, Observable } from "../utils/Observable.js";

class ImageDownloader extends Observable {

  constructor() {
    super();
    this.images = [];
  }

  fetchData(tag) {
   // let data = new Promise((resolve, reject) => {
        fetch('./resources/meme_json_data.json')
          .then(respond => respond.json())
            .then(files => {
              for (let i = 0; i < files.length; i++) {
                if ((((Object.values(files[i]))[0])[0]).filename.includes(tag)) {
                  this.images.push((((Object.values(files[i]))[0])[0]).filename);
                }
              }
              let event = new Event("imagesFetched",this.images);
                  console.log(event);
                  this.notifyAll(event);
          }).catch(() => {
            console.log("ups");
          });
      
    }

}
export default ImageDownloader;