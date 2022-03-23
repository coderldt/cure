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

    if (!ctx.request.files) {
      return this.error({ msg: '请选择一个文件' });
    }
    const file = ctx.request.files[0];
    const fileName = file.filename;

    if (config.avatarAssetsType.some(i => fileName.includes(i))) {
      const res = await this.storageData(config.uploadAvatarDir, file);
      if (res && res.code === 200) {
        this.success({ data: res.data });
      } else {
        this.error({ msg: '上传出错' });
      }
    } else {
      this.error({ msg: `只支持${config.avatarAssetsType.join(',')}类型` });
    }
  }

  async uploadAudio() { // 填写信息
    const { ctx, config } = this;

    if (!ctx.request.files) {
      return this.error({ msg: '请选择一个文件' });
    }
    const file = ctx.request.files[0];
    const fileName = file.filename;

    if (config.audioAssetsType.some(i => fileName.includes(i))) {
      const res = await this.storageData(config.uploadAudioDir, file);
      if (res && res.code === 200) {
        this.success({ data: res.data });
      } else {
        this.error({ msg: '上传出错' });
      }
    } else {
      this.error({ msg: `只支持${config.audioAssetsType.join(',')}类型` });
    }
  }

  async storageData(uploadDir, file) {
    const { ctx } = this;
    try {
      // 生成日期
      const fileData = fs.readFileSync(file.filepath);
      const day = dayjs(new Date()).format('YYYY-MM-DD');
      const dir = path.join(uploadDir, day);

      // 去重（检测当天上传重复图片）
      const res = this.duplicateDetection(dir, md5(fileData));
      let imgPath = '';
      if (res) {
        imgPath = res.replace(/\\/g, '/').replace('app', '').replace('/public', '/curePublic');
        // this.success({ data: res });
      } else {
        // 创建目录，并写入
        await mkdirp(dir);
        const date = Date.now(); // 毫秒数
        const tempDir = path.join(dir, date + path.extname(file.filename)); // 返回图片保存的路径
        fs.writeFileSync(tempDir, fileData);
        imgPath = tempDir.replace(/\\/g, '/').replace('app', '').replace('/public', '/curePublic');
      }
      return { code: 200, data: imgPath };
    } catch (error) {
      console.log(error);
      return { code: 500 };
    } finally {
      // 6、清除临时文件
      ctx.cleanupRequestFiles();
    }
  }
}

module.exports = UploadController;
