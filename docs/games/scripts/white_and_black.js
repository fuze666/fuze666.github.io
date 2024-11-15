const game = function(p){
  let weight = 10;
  let rectangles_colors = [];

  p.setup = () => {
    p.createCanvas(400,300);
    button = p.createButton("消す");
    button.id("button");
    button.mousePressed(() =>{
      weight = -weight;
      if(weight<0){
        button.html("塗る");
      }else button.html("消す");
    })
    
    for (let i = 0; i < 41; i++) {
      rectangles_colors[i] = []
      for (let j = 0; j < 31; j++) {
        rectangles_colors[i][j] = new rectangle_color(200);
      }
    }
  };

  p.draw = () => {
      p.clear()
      draw_rectangles();
      paint_rects(p.mouseX*2-p.pmouseX,p.mouseY*2-p.pmouseY)
  };

  class rectangle_color{
    constructor (original){
      this.color = original;
    }
    paint(weight) {
      if(this.color>0&&this.color<256){
        this.color = Math.min(Math.max(this.color - weight,0),255);
      }
    }
  }

  function draw_rectangles(){
    for (let i = 0; i < 41; i++) {
      for (let j = 0; j < 31; j++) {
        w = p.width/40;
        h = p.height/30;
        p.fill(rectangles_colors[i][j].color);
        p.stroke(255);
        p.strokeWeight(1);
        p.rectMode(p.CENTER);
        p.rect(w*i,h*j,10,10);
      }
    }
  }

  function paint_rects(mousex,mousey){
    paint_rect(mousex,mousey,weight*2);
    paint_rect(mousex-10,mousey,weight);
    paint_rect(mousex+10,mousey,weight);
    paint_rect(mousex,mousey-10,weight);
    paint_rect(mousex,mousey+10,weight);
  }

  function paint_rect(mousex,mousey,weight){
    x = Math.floor(Math.max(Math.min(mousex,400),0)/10);
    y = Math.floor(Math.max(Math.min(mousey,300),0)/10);
    rectangles_colors[x][y].paint(weight);
  }
}

new p5(game, 'game')