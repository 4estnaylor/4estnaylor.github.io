class Prompt {
    constructor(canvas, text = 'test prompt', xPos = 200, yPos = 200, text_size = 20, font_family = 'Arial') {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.text = text;
        this.xPos = xPos;
        this.yPos = yPos;

        this.text_color = '#aaa';
        this.text_size = text_size;
        this.font_family = font_family;

        this.border_bottom = yPos;
    }

    wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
        console.log(y);
        this.border_bottom = y + lineHeight;
    }


    draw() {
        this.ctx.font = this.text_size + "px " + this.font_family;
        this.ctx.fillStyle = this.text_color;
        this.ctx.textBaseline = 'top';
        //this.ctx.fillText(this.text, this.xPos, this.yPos);
        this.wrapText(this.ctx, this.text, this.xPos, this.yPos, this.canvas.width, this.text_size * 1.2);
    }



}


export { Prompt };