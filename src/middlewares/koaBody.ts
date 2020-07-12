import * as koaBody from 'koa-body';
import * as path from 'path';

export default koaBody({
  multipart: true, // 支持文件上传
  // encoding: 'gzip',
  // strict: false,
  // json: true,
  formidable: {
    uploadDir: path.join(__dirname, '../public/upload/'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
    onFileBegin: (name, file) => {
      // 文件上传前的设置
      console.log(`name: ${name}`);
      console.log(file);
    }
  }
});
