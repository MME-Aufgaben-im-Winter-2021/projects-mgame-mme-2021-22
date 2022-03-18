/**Shows remaining time, player status and player score; players are sorted by score */
class GameProgressCard
{

constructor(){
    this.countdownNumberEL = document.getElementById("countdown-number");
    this.countdown = 10;
    console.log(this.countdownNumberEL);
    this.countdownNumberEL.textContent = this.countdown;

   
}
    
}
export default GameProgressCard;