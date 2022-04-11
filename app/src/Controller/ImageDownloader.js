import { Event, Observable } from "../utils/Observable.js";
//fetches images from the json file
class ImageDownloader extends Observable {

  constructor() {
    super();
    
  }

  fetchData(tag, placeToStartSearchingJsonFile) {
    let images = [];
        fetch("./resources/meme_json_data.json")
          .then(respond => respond.json())
            .then(files => {
              for (let i = placeToStartSearchingJsonFile; i < files.length; i++) {
                if ((((Object.values(files[i]))[0])[0]).filename.toLowerCase().includes(tag.toLowerCase())
                 ||(((Object.values(files[i]))[0])[0]).tags.toLowerCase().includes(tag.toLowerCase()) ) {
                  images.push((((Object.values(files[i]))[0])[0]).filename);
                }
              }
              let event = new Event("imagesFetched",images);
                  //console.log(event);
                  this.notifyAll(event);
          }).catch((e) => {
            this.notifyAll(e);
          });
      
    }

}
export default ImageDownloader;