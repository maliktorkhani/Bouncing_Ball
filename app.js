/* Create a Class for the ball*/
class Ball {
    constructor(radius, color) {
        this.radius = radius;
        this.color = color;
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
    }
    /* Drawing the Ball */
    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
    }

}
/* Get element by id from HTML File For Canvas */
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

/*  g= gravity 
    radius= ball radius
    color = color of the ball
    isDragging= boolean value if the ball draged or not
*/
let g = 0.3;
let radius = 40;
let color = "#0c2aac";
let ball;
let isDragging = false;

/* Load the screen with init function */
window.onload = init;

/* main function */
function init() {
    ball = new Ball(radius, color);
    ball.x = 50;
    ball.y = canvas.height - radius;
    ball.vx = 0;
    ball.vy = 0;
    ball.draw(context);

    canvas.addEventListener('mousedown', function () {
        canvas.addEventListener('mousemove', onDrag, false);
        canvas.addEventListener('mouseup', onDrop, false);
    }, false);
    setInterval(onEachStep, 1000 / 60);
};

/* Function so you can Drag the ball */
function onDrag(evt) {
    isDragging = true;
    ball.x = evt.clientX;
    ball.y = evt.clientY;
}

/* Function for the Drop of The Ball */
function onDrop() {
    isDragging = false;
    canvas.removeEventListener('mousemove', onDrag, false);
    canvas.removeEventListener('mouseup', onDrop, false);
}

/* Function to lose velocity as it bounces */
function onEachStep() {
    if (isDragging == false) {
        ball.vy += g;
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.y > canvas.height - radius) {
            ball.y = canvas.height - radius;
            ball.vy *= -0.8;
        }
        if (ball.x > canvas.width + radius) {
            ball.x = -radius;
        }
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
};