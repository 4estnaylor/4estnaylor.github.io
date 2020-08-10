import { Prompt } from "./Prompt.js";
import { Option_Field } from "./Option_Field.js";
import { Practice_Template } from "./Practice_Template.js";

/* The question class synthesizes many modules including:
    - Prompt.js
    - Option_Field.js
    - Template.js
    - Control_Button.js

    The goal of this class is:
    1) to accept prompts and questions and 
    display them together. 
    2) to accept record input as they toggle and untoggle various
    options from the option field
    3) To allow the user to submit an answer when the appropriate number of
    options are selected
    4) To verify the the correctness of Users answers
    5) To display to the user if they received credit for an incorrect answer
    6) To prompt the user to continue on to the next question




*/
class Question {
    constructor(canvas, prompt, correct_options, incorrect_options) {
        this.canvas = canvas;
        this.prompt = prompt;
        this.correct_options = correct_options;
        this.incorrect_options = incorrect_options;
        this.option_field = 0;
    }


    activate_submission() {
        this.canvas.addEventListener('click', (event) => {

            let options_selected = 0;
            let submit_button = false;
            for (let i = 0; i < this.option_field.options.length; i++) {
                if (this.option_field.options[i].selected) {
                    options_selected += 1;
                    if (options_selected === this.correct_options.length) {
                        submit_button = true;
                    } else {
                        submit_button = false;
                    }

                }

            }
            console.log(submit_button);
            //determine number of buttons selected
            //this.prompt.


        })
    }


    draw() {
        console.log('hello')
        //draw template
        let practice_template = new Practice_Template(this.canvas);
        practice_template.draw();

        //draw prompt
        let prompt_margin_vrt = 10;
        let prompt_margin_hrz = 8;
        let prompt_posX = prompt_margin_hrz;
        let prompt_posY = practice_template.height * (1.1) + prompt_margin_vrt;
        let prompt = new Prompt(this.canvas, this.prompt, prompt_posX, prompt_posY);
        prompt.draw();


        //draw options
        let option_field_border_top = prompt.border_bottom;
        let option_field_border_bottom = practice_template.control_circle_posY - practice_template.radius - ((this.canvas.height - practice_template.control_circle_posY) - practice_template.radius);
        let option_field = new Option_Field(this.canvas, this.correct_options, this.incorrect_options, option_field_border_top, option_field_border_bottom);
        this.option_field = option_field;
        option_field.draw();

        this.activate_submission();

        //activate submit button when enough answers are selected
    }

}

export { Question };