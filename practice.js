import { Option } from './practice_modules/Option.js'
import { Practice_Template } from './practice_modules/Practice_Template.js';
import { Control_Button } from './practice_modules/Control_Button.js';
import { Prompt } from './practice_modules/Prompt.js';
import { Option_Field } from './practice_modules/Option_Field.js';
import { Question } from './practice_modules/Question.js';



let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;



let question = new Question(canvas, "How many licks to the center of a tootsie pop?", ["Jenn"], ["Tree", "Candy", "Ross"]);
question.draw();
//draws the initial template
// let practice_template = new Practice_Template(canvas);
// let prompt_margin_vrt = 10;
// let prompt_margin_hrz = 8;
// let prompt_posX = prompt_margin_hrz;
// let prompt_posY = practice_template.height * (1.1) + prompt_margin_vrt;
// practice_template.draw_all();

// //draws the intitial prompt
// let prompt = new Prompt(canvas, 'hello my name is Forrest Naylor. I love eating cookie dough and running and yoga! and yadda yadda yadda', prompt_posX, prompt_posY);
// prompt.draw()

// let option_field_border_top = prompt.border_bottom;
// let option_field_border_bottom = practice_template.control_circle_posY - practice_template.radius - ((canvas.height - practice_template.control_circle_posY) - practice_template.radius);

// let option_field = new Option_Field(canvas, ['pizza', 'macaroni', 'apples', 'Jenn'], ['cake', 'hamburger', 'oranges', 'Pineapple'], option_field_border_top, option_field_border_bottom);
// option_field.draw_instruction();
// option_field.calculate_option_dimensions();
// option_field.load_and_shuffle_options();
// option_field.orient_options();


// let option = new Option(canvas, 'Testing', 100, 100, 200, 100);

// // option.draw();
// // option.activate();
// // option.place_text();
// option.install();

//et control_button = new Control_Button(canvas, canvas.width / 2, canvas.height * 0.94);
// control_button.draw('blue');
// control_button.activate('red');
