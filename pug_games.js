const pug = require('pug');
const fs = require('fs');

// 指定のディレクトリからcategory_index.pug以外のpugファイル（＝子ページ）の名前をとって配列に入れる
const fileNames = (()=>{
  try{
    return fs.readdirSync('./templates/games').filter(fileName => fileName !== 'game_index.pug').map(fileName => fileName.slice(0,-4));
  }catch(err){
    console.log(err,'could not read file names');
  return;
  }
})();

console.log(fileNames)
// ファイルをhtmlにレンダリングして書き出す
for (let fileName of fileNames){

  const html = (() => {
    try{
      return pug.renderFile(`./templates/games/${fileName}.pug`);
    }catch(err){
      console.log(err,`could not render file : ${fileName}`);
      return;
    }
  })();

  try{
    fs.writeFileSync(`./docs/games/${fileName}.html`,html)
  }catch(err){
    console.log(err,`could not write file : ${fileName}`);
  }
};