
import { Option } from './Option.js';

class Option_Field {
    constructor(canvas, correct_option_strings, incorrect_option_strings, border_top, border_bottom) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.correct_option_strings = correct_option_strings;
        this.incorrect_option_strings = incorrect_option_strings;
        this.border_top = border_top;
        this.border_bottom = border_bottom;

        this.number_of_options = correct_option_strings.length + incorrect_option_strings.length;
        this.instruction_txt_size = 14;
        this.instruction_font_family = 'Arial';
        this.instruction_font = this.instruction_txt_size + 'px ' + this.instruction_font_family;
        if (this.correct_option_strings.length > 1) {
            this.instruction_message = 'select ' + this.correct_option_strings.length + ' options';
        } else {
            this.instruction_message = 'select ' + this.correct_option_strings.length + ' option';
        }

        this.divider_line_height = 0;
        this.options_area = 0;
        this.option_height = 0;
        this.options_start_posY = 0;

        this.options = []

    }

    draw_instruction() {
        console.log(this.instruction_message);
        this.ctx.font = this.instruction_font;
        let instruction_width = this.ctx.measureText(this.instruction_message).width;
        this.ctx.fillText(this.instruction_message, this.canvas.width / 2 - instruction_width / 2, this.border_top + this.instruction_txt_size);
        this.ctx.beginPath();
        this.divider_line_height = this.border_top + this.instruction_txt_size * 2;
        this.ctx.moveTo(this.canvas.width / 2 - instruction_width, this.divider_line_height);
        this.ctx.lineTo(this.canvas.width / 2 + instruction_width, this.divider_line_height);
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    calculate_option_dimensions() {
        this.options_area = this.border_bottom - (this.divider_line_height + this.instruction_txt_size);
        this.options_start_posY = this.divider_line_height + this.instruction_txt_size;
        //1 column
        if (this.number_of_options <= 4) {
            this.option_width = this.canvas.width;
            this.option_height = this.options_area / this.number_of_options;
        }
        // 2 columns
        else if (this.number_of_options >= 5) {
            this.option_width = this.canvas.width / 2;
            this.option_height = 2 * (this.options_area / this.number_of_options);
            if (this.number_of_options % 2 != 0) {
                this.option_height = 2 * this.options_area / (this.number_of_options + 1);
            }
        }



        // this.option_height = 2 * (options_area_height / total_number_of_options);
        //     if (total_number_of_options % 2 != 0) {
        //         this.option_height = 2 * options_area_height / (total_number_of_options + 1)
        //     }
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    load_and_shuffle_options() {
        //make correct option objects
        for (let i = 0; i < this.correct_option_strings.length; i++) {
            let option = new Option(this.canvas, this.correct_option_strings[i], 0, 0, this.option_width, this.option_height, true);
            this.options.push(option);
        }

        //load incorrect option objects
        for (let i = 0; i < this.incorrect_option_strings.length; i++) {
            let option = new Option(this.canvas, this.incorrect_option_strings[i], 0, 0, this.option_width, this.option_height, false);
            this.options.push(option);
        }

        this.shuffle(this.options);
    }

    orient_options() {
        // 1 column
        for (let j = 0; j < this.options.length; j++) {
            this.options[j].posY = this.options_start_posY + [j] * this.option_height;
            this.options[j].posX = 0;
            // 2 columns
            if (this.number_of_options >= 5) {
                this.options[j].posY = (Math.round((j + 1) / 2) - 1) * this.option_height + this.divider_line_height;
                this.options[j].posX = 0 + this.option_width * (j % 2);
            }

            this.options[j].install();
        }




    }



    draw() {
        this.draw_instruction();
        this.calculate_option_dimensions();
        this.load_and_shuffle_options();
        this.orient_options();
    }
}


export { Option_Field };