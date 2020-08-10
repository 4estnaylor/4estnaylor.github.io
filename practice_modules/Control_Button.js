
/*
A control button class for a button that can change colors when clicked as specified in the activate function;
*/

class Control_Button {


    constructor(canvas, posX, posY) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.radius = this.canvas.height * 0.05;

        this.posX = posX;
        this.posY = posY;


        this.state = 'submit';

        this.locked_color = '#aaa';
        this.ready_color = 'powderblue';
        this.correct_color = 'palegreen';

        this.current_color = this.locked_color;
    }

    check_for_unlock() {
        this.canvas.addEventListener('click', (event) => {
            if (this.state === 'submit') {
                this.activate();
            }
        })
    }


    draw(current_color = this.current_color) {
        this.ctx.beginPath();
        this.ctx.ellipse(this.posX, this.posY, this.radius, this.radius, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = current_color;
        this.ctx.fill();
    }

    change_color(new_color) {
        this.current_color = new_color;
        this.draw();
    }

    activate(new_color = 'palegreen') {

        this.canvas.addEventListener('click', (event) => {
            let xDiff = event.clientX - this.posX;
            let yDiff = event.clientY - this.posY;
            let distance_to_radius = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
            if (distance_to_radius <= this.radius) {
                this.change_color(new_color);
            }
        })
    }




}


export { Control_Button };