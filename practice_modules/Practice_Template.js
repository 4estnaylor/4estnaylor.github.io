/*

This is a template for a app designed to responsively fit for mobile screen sizes that will ask questions and alert users when they 
get correct and incorrect answers through a title message in the header as well as color changes and and a control circle that displays
symbols for submit answer and next question. 

The template also includes a progress bar which can fill up as users get correct answers. Various chagnes can be made within the constructor
to tailor the design. Things that can be changed without any fuss:
    -  the colors that indicate the different states of default, correct, and incorrect.
    -  The font family of the messages (although that will need to be changed in the CSS and HTML docs)

N.B.
The constructor contains the values free_border_top, free_border_bottom, and free_vert_distance to make it simple to add content within the
template without overlapping the canvas template.

*/

import { Control_Button } from './Control_Button.js';

class Practice_Template {


    constructor(canvas) {

        this.canvas = canvas; // canvas
        this.ctx = canvas.getContext('2d'); //context

        //general

        this.state = 'default' //state can be set to 'default', 'correct', or 'incorrect' 

        this.default_color = '#aaa'; //standard color of template
        this.correct_color = 'green'; //color to indicate correct answers
        this.incorrect_color = 'red'; // color to indicate incorrect answers

        this.current_color = this.default_color; //sets initial color to standard template color;


        //top banner
        this.width = canvas.width; // header will cross entire canvas
        this.height = canvas.height * 0.1; // header will take up 10% of screen height

        //title text
        this.title_message = 'Practice'; // message for center of header
        this.font_family = '"Arial"'; // font family for message (set within double quote marks inside of the single quote marks i.e. '"Calibri"')
        this.txt_color = this.current_color; // text color for message

        //control circle
        this.radius = this.canvas.height * 0.04 //sets control circle radius to 4% (diameter to 8%)
        this.control_circle_posX = this.width / 2 //sets control circle pos X (radius)
        this.control_circle_posY = this.canvas.height * 0.95 // sets control circle pos Y (radius)
        this.control_circle = 0;
        //menu down arrow
        this.mda_posX = this.width * 0.14; // determines horizontal center of down menu bar


        //progress bar
        this.progress_bar_position = 0; //set to initial value of 0 (no progress)

        // determine field of free space (where questions, diagrams, etc can fit)
        this.border_top = this.height + this.height * 0.1;
        this.border_bottom = this.control_circle_posY - this.radius - ((this.canvas.height - this.control_circle_posY) - this.radius);
        this.free_distance = this.border_bottom - this.border_top;

    }

    draw_header() {
        this.ctx.fillStyle = 'white'//this.current_color; // sets color for header background
        this.ctx.fillRect(0, 0, this.width, this.height); //draws the header background
    }

    draw_title() {

        //sets font and color of header
        this.ctx.fillStyle = this.txt_color; // sets text color for header
        let font_size = this.height * .6; //sets font_size to 60% of header
        this.ctx.font = font_size + "px '" + this.font_family + '"';


        //centers header
        let message_width = this.ctx.measureText(this.title_message).width; //determines message width so title can be centered horizontally within header
        this.ctx.textBaseline = 'middle'; //sets text basline so that title can be centered vertically within header

        //draw header
        this.ctx.fillText(this.title_message, this.width / 2 - message_width / 2, this.height / 2); // draws title, horizontally and vertically centered

    }


    draw_progress_bar() {
        this.ctx.fillStyle = this.txt_color; //sets color of background for progress bar
        this.ctx.fillRect(0, this.height, this.width, this.height * 0.1); //draws background for progress bar

        this.ctx.fillStyle = this.correct_color;
        this.ctx.fillRect(0, this.height, this.progress_bar_position, this.height * 0.1); //draws percent of practice completed correctly
    }

    //down arrow is within header to activate the dropdown menu bar
    draw_down_arrow() {
        //set color and line thickness
        this.ctx.strokeStyle = this.txt_color; // sets color of checkmark
        this.ctx.lineWidth = this.radius * 0.2; //sets thickness of line relatve to control circle


        //draw figure
        this.ctx.beginPath(); // begins new figure
        this.ctx.moveTo(this.mda_posX - this.radius * 0.7, this.height * 0.3); //moves position left of title (uses radius value to keep arrow to scale with control button)
        this.ctx.lineTo(this.mda_posX, this.height * 0.3 + this.radius) //moves position down and right towards vertex of arrow
        this.ctx.lineTo(this.mda_posX + this.radius * 0.7, this.height * 0.3);// moves position up right to complete arrow
        this.ctx.stroke(); // displays the checkmark
    }


    draw_control_circle() {
        let control_circle = new Control_Button(this.canvas, this.control_circle_posX, this.control_circle_posY);
        this.control_circle = control_circle;
        control_circle.radius = this.radius;
        control_circle.draw(this.current_color);
        control_circle.activate('powderblue');
    }

    draw() {
        this.draw_title();
        this.draw_progress_bar();
        this.draw_down_arrow();
        this.draw_control_circle();
    }





    //master function that will be used within site main js file.



}



export { Practice_Template };