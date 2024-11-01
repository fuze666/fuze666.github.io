var pug = require('pug');
var fs = require('fs');

// Compile a function
var home_template = pug.compileFile('./templates/template.pug');
var home_json = fs.readFileSync('./templates/home.json');
var home_data = JSON.parse(home_json);
// Render the function
var html = home_template(home_data);

fs.writeFileSync('./docs/index.html', html, (err) => {
  if(err) {
    console.log(err);
  }
});
// => '<string>of pug</string>'