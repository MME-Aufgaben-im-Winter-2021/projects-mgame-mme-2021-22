/**Shows remaining time, player status and player score; players are sorted by score */

class GameProgressCard
{


    
    

    constructor(timeLeft = 12.0){
    this.progressField = document.getElementById("progressField");
    
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.clockMagnifyFactor = 0.8;
    this.timeLeft = timeLeft; // in seconds
    this.canvasUpdateDelayRate = 1000; //canvas gets updated every 1000 ms
    this.radius = (this.canvas.height / 2);
    //this.clockEl = document.querySelector(".clock");
    //this.clockHandle = this.clockEl.querySelector(".handle");
    this.ctx.translate(this.radius/this.clockMagnifyFactor, this.radius); // setting central point for clock relative to canvas
    this.radius = this.radius * 0.90 * this.clockMagnifyFactor;
    this.drawClock();
    this.setInterval(this.drawClock, this.canvasUpdateDelayRate);
    }


    drawClock() {
        this.ctx.arc(0, 0, this.radius, 0 , 2 * Math.PI);
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.drawFace(this.ctx, this.radius);
        this.drawTime(this.ctx, this.radius);
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
        this.width = radius*0.02;
        this.length = radius*0.85;
        this.pos = ((60-this.timeLeft)*Math.PI/30);
        ctx.beginPath();
        ctx.lineWidth = this.width;
        ctx.lineCap = "round";
        ctx.moveTo(0,0);
        ctx.rotate(this.pos);
        ctx.lineTo(0, -length);
        ctx.stroke();
        ctx.rotate(-this.pos);
        this.timeLeft--;
        if(this.timeLeft===0){
            //zum bewertungsbildschirm

        }
    }

    start() {
        //this.clockHandle.classList.add("handle-animated");
    }

    reset() {
        //this.clockHandle.classList.remove("handle-animated");
    }
}


export default GameProgressCard;