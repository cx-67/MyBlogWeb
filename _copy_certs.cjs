const fs = require('fs');
const path = require('path');
const src = 'C:/Users/33438/Desktop/面试准备/作品集';
const dst = 'e:/Project/MyBlogWeb/public/images/certificates';
fs.mkdirSync(dst, { recursive: true });
const files = fs.readdirSync(src);
for (const name of files) {
  if (name.endsWith('.jpg') || name.endsWith('.png')) {
    const dest = dst + '/' + name;
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src + '/' + name, dest);
      console.log('copied:', name);
    } else {
      console.log('exists:', name);
    }
  }
}
