var game = function(p){

  let winWidth = 400;
  let winHeight = 300;
  p.setup = () => {
    p.createCanvas(winWidth,winHeight);
  };
  p.draw = () =>{
    p.ellipse(p.mouseX, p.mouseY, 20, 20);
  };
}

new p5(game, 'game')