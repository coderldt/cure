'use strict';
const BaseController = require('../base');
const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const mkdirp = require('mkdirp');
const md5 = require('md5');

class UploadController extends BaseController {

  duplicateDetection(dir, mdCode) {
    let dirData = null;
    try {
      dirData = fs.readdirSync(dir);
    } catch (error) {
      return false;
    }
    for (const i of dirData) {
      const tempPath = `${dir}/${i}`;
      const file = fs.readFileSync(tempPath);

      if (md5(file) === mdCode) {
        return tempPath;
      }
      continue;

    }
    return false;
  }

  async upload() { // 填写信息
    const { ctx, config } = this;
    try {
      // 0、获取文件
      const file = ctx.request.files[0];
      const fileData = fs.readFileSync(file.filepath);
      // 生成日期
      const day = dayjs(new Date()).format('YYYY-MM-DD');
      const dir = path.join(config.uploadAvatarDir, day);

      // 去重（检测当天上传重复图片）
      const res = this.duplicateDetection(dir, md5(fileData));
      let imgPath = '';
      if (res) {
        imgPath = res.replace(/\\/g, '/').replace('app', '').replace('/public', '/curePublic');
        this.success({ data: res });
      } else {
        // 创建目录，并写入
        await mkdirp(dir);
        const date = Date.now(); // 毫秒数
        const tempDir = path.join(dir, date + path.extname(file.filename)); // 返回图片保存的路径
        fs.writeFileSync(tempDir, fileData);
        imgPath = tempDir.replace(/\\/g, '/').replace('app', '').replace('/public', '/curePublic');
      }
      this.success({ data: imgPath });
    } catch (error) {
      this.error({ msg: '上传失败' });
    } finally {
      // 6、清除临时文件
      ctx.cleanupRequestFiles();
    }
  }
}

module.exports = UploadController;
