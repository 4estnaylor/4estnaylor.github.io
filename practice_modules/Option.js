

class Option {
    constructor(canvas, message, posX, posY, width, height, is_correct = false) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.message = message;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color_current = 'white';
        this.color_default = 'white';
        this.color_selected = 'powderblue';
        this.color_correct = 'palegreen';
        this.color_incorrect = 'red';
        this.selected = false;
        this.is_correct = is_correct;
        this.reveal_if_correct = false;

        this.border_size = 1;
        this.stroke_color = '#aaa';
        this.draw_stroke = true;
        this.draw_fill = true;

        this.text_size = 20;
        this.font_family = 'Arial'
        this.font = this.text_size + "px " + this.font_family;
        this.text_margin = 10;
        this.text_color = 'black'

    }

    wrapText(context, text, x, y, maxWidth, lineHeight, option_height, text_size) {
        var words = text.split(' ');
        var line = '';
        var display_lines = [] // create seperate lines that will eventually be displayed

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                //context.fillText(line, x, y);
                display_lines.push(line);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        //get lines in display lines list
        display_lines.push(line);

        //find the longest display_line
        var longest_line = '';
        for (let i = 0; i < display_lines.length; i++) {
            let check_line = display_lines[i];
            let longest_line_width = context.measureText(longest_line).width;
            let check_line_width = context.measureText(check_line).width;
            if (check_line_width > longest_line_width) {
                longest_line = check_line;
            }
        }

        //determine the horizontal positioning by centering the longest line
        let margin_difference = maxWidth - context.measureText(longest_line).width;

        let posX = x + margin_difference / 2;
        context.textBaseline = 'middle';
        let posY = y + option_height / 2;

        context.fillText(display_lines[0], posX, posY);

        //console.log('margin diff ' + margin_difference);

        //console.log(longest_line);


        //console.log(display_lines);
    }

    place_text() {

        //this.ctx.textBaseline = 'middle';
        this.ctx.font = this.font;
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = this.text_color;
        let message_width = this.ctx.measureText(this.message).width;
        let text_posX = this.posX + this.width / 2 - message_width / 2;
        let text_posY = this.posY + this.height / 2;
        this.ctx.fillText(this.message, text_posX, text_posY);
        //this.wrapText(this.ctx, this.message, this.posX, this.posY, this.width - 2 * this.text_margin, 20, this.height, 20);

    }

    draw() {

        //fill
        this.ctx.fillStyle = this.color_current;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);

        //stroke
        this.ctx.lineWidth = this.border_size;
        this.ctx.strokeStyle = this.stroke_color;
        this.ctx.strokeRect(this.posX, this.posY, this.width, this.height);

        this.place_text();


    }

    activate() {
        this.canvas.addEventListener('click', (event) => {
            if (event.clientY >= this.posY && //upper boundary
                event.clientX >= this.posX && // left boundary
                event.clientY <= this.posY + this.height && // lower boundary
                event.clientX <= this.posX + this.width) { // right boundary
                //console.log(event);
                //changes color from default to selected
                if (this.color_current === this.color_default) {
                    this.color_current = this.color_selected;
                    this.selected = true;
                    this.draw();
                }
                //changes color from selected to default
                else if (this.color_current === this.color_selected) {
                    this.color_current = this.color_default;
                    this.selected = false;
                    this.draw();
                }

            }
        })
    }


    install() {
        //this.draw_stroke();
        this.draw();
        this.activate();
        this.place_text();
    }





}



export { Option };