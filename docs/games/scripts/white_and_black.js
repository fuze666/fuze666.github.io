const game = function(p){

  let winWidth = 400;
  let winHeight = 300;
  let isVisible = false;
  let background_color = 0;
  let flameCount = 0;
  let rectangles_colors = [];

  p.setup = () => {
    p.createCanvas(winWidth,winHeight);
    visibleButton = p.createButton("表示する");
    visibleButton.id("visiblebutton");
    visibleButton.mousePressed(() =>{
      isVisible = !isVisible;
      if(isVisible){
        visibleButton.html("非表示");
      }else visibleButton.html("表示");
    })
    
    for (let i = 0; i < 41; i++) {
      rectangles_colors[i] = []
      for (let j = 0; j < 31; j++) {
        rectangles_colors[i][j] = new rectangle_color(200);
      }
    }
  };

  p.draw = () => {
    if(isVisible){
      flameCount++;
      p.clear()
      draw_rectangles();
      paint_rects(p.mouseX*2-p.pmouseX,p.mouseY*2-p.pmouseY)
    }else{
      flameCount = 0;
      p.background(p.random(5)+250);
      p.noFill();
      p.stroke(40);
      p.strokeWeight(1)
      p.rectMode(p.CORNER);
      p.rect(0,0,p.width,p.height)
    }
  };

  class rectangle_color{
    color;
    constructor (original){
      this.color = original;
    }
    paint(weight) {
      if(this.color>0&&this.color<256){
        this.color = Math.min(Math.max(this.color - weight,0),255);
      }
      console.log("paint");
    }
  }

  function paint_rects(mousex,mousey){
    paint_rect(mousex,mousey,20);
    paint_rect(mousex-10,mousey,10);
    paint_rect(mousex+10,mousey,10);
    paint_rect(mousex,mousey-10,10);
    paint_rect(mousex,mousey+10,10);
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
  function paint_rect(mousex,mousey,weight){
    x = Math.floor(Math.max(Math.min(mousex,400),0)/10);
    y = Math.floor(Math.max(Math.min(mousey,300),0)/10);
    rectangles_colors[x][y].paint(weight);
  }

}

new p5(game, 'game')