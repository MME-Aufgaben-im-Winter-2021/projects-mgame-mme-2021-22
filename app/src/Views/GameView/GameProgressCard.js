/**Shows remaining time, player status and player score; players are sorted by score */
class GameProgressCard
{

constructor(){
   this.progressField = document.getElementById("progressField");
   this.clockEl = document.querySelector(".clock");
   this.clockHandle = this.clockEl.querySelector(".handle");

}

     start() {
        this.clockHandle.classList.add("handle-animated");
    }

    reset() {
        this.clockHandle.classList.remove("handle-animated");
    }
}
export default GameProgressCard;