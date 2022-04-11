/**Shows remaining time, player status and player score; players are sorted by score */

class GameProgressCard
{


    
    

    constructor(){
    this.progressField = document.getElementById("progressField");
    /*
    this.canvas = document.getElementById("canvas");
    this.ctx = document.getElementById("canvas").getContext("2d");
    this.clockMagnifyFactor = 0.8;
    this.timeLeft = 12; // in seconds
    this.canvasUpdateDelayRate = 1000; //canvas gets updated every 1000 ms
    this.radius = (document.getElementById("canvas").height / 2);*/
    //this.clockEl = document.querySelector(".clock");
    //this.clockHandle = this.clockEl.querySelector(".handle");


    }
   /* ctx.translate(radius/clockMagnifyFactor, radius); // setting central point for clock relative to canvas
    radius = radius * 0.90 * clockMagnifyFactor;


    drawClock();
    setInterval(drawClock, canvasUpdateDelayRate);



    drawClock() {
        ctx.arc(0, 0, radius, 0 , 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        drawFace(ctx, radius);
        drawTime(ctx, radius);
    }


    drawFace(ctx, radius) {
            var grad;

            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();

            grad = ctx.createRadialGradient(0, 0 ,radius * 0.95, 0, 0, radius * 1.05);
            grad.addColorStop(0, 'grey');
            grad.addColorStop(0.6, 'white');
            grad.addColorStop(1, '#333');
            ctx.strokeStyle = grad;
            ctx.lineWidth = radius*0.1;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, radius * 0.04, 0, 2 * Math.PI);
            ctx.fillStyle = '#888';
            ctx.fill();
        }



    drawTime(ctx, radius) {
        width = radius*0.02;
        length = radius*0.85;
        pos = ((60-timeLeft)*Math.PI/30);
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.moveTo(0,0);
        ctx.rotate(pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-pos);
        timeLeft--;
        if(timeLeft===0){

        }
    }
*/
    start() {
        //this.clockHandle.classList.add("handle-animated");
    }

    reset() {
        //this.clockHandle.classList.remove("handle-animated");
    }
}


export default GameProgressCard;