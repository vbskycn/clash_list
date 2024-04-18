const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'public'); // 您的文件目录
const outputPath = path.join(__dirname, 'dist'); // 输出目录，确保它在Cloudflare Pages的发布目录内
const baseUrl = '/'; // 根据您的部署设置可能需要调整

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Unable to scan directory: ' + err);
    return;
  }

  let content = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>File Directory</title>\n</head>\n<body>\n<h1>File Directory</h1>\n<ul>\n';

  files.forEach(function(file) {
    content += `<li><a href="${baseUrl}${file}">${file}</a></li>\n`;
  });

  content += '</ul>\n</body>\n</html>';

  // 确保输出目录存在
  if (!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath);
  }

  // 写入文件到输出目录
  fs.writeFile(path.join(outputPath, 'index.html'), content, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File list has been generated in index.html');
  });
});
