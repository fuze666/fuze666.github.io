const fs = require('fs');
const path = require('path');

// ページデータを生成する関数
function generateDataFile(inputFolder, outputFilePath) {
  // 指定されたフォルダ内のHTMLファイルを取得
  const files = fs.readdirSync(inputFolder).filter(file => file.endsWith('.html') && file !== 'index.html');

  // 各ファイルのリンクと説明をJSON形式で生成
  const data = {
    pages: files.map(file => ({
      name: path.parse(file).name,
      path: file
    }))
  };

  // JSONファイルを書き込み
  fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Data file generated at: ${outputFilePath}`);
}
generateDataFile(path.join(__dirname, 'docs', 'games'), path.join(__dirname, 'templates', 'games', 'pagesData.json'));