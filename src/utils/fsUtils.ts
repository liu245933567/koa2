import * as fs from 'fs';
import * as path from 'path';
import * as ffmpeg from 'fluent-ffmpeg';
import config from '../config';

/** 输出文件信息 */
interface FilesInfo {
  /** 当前文件名字 */
  fileName: string;
  /** 当前文件的完整路径 */
  pathname?: string;
  /** 当前文件的创建时间戳 */
  createdTime: number;
  /** 视频路径 */
  videoUrl: string;
  /** 预览图路径 */
  previewImgUrl: string;
}

/**
 * 生成预览图片文件夹
 * @param previewPath 图片预览保存文件夹路径
 */
async function makePreviewPictureDir(previewPath: string) {
  // 路径不存在时创建路径
  // eslint-disable-next-line no-sync
  const existDir = fs.existsSync(previewPath);

  if (!existDir) {
    await fs.promises.mkdir(previewPath);
  }
}

/**
 * 生成视频缩略图
 * @param videoPath 视频地址
 * @param previewName 生成的文件名称
 * @param previewPath 图片预览保存文件夹路径
 */
function makePreviewPicture(videoPath: string, previewName: string, previewPath: string) {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .on('error', (err: Error) => {
        console.log('生成缩略图失败: ' + err.message);
        reject(err);
      })
      .on('end', (filenames) => {
        resolve(filenames);
      })
      .takeScreenshots({
        timestamps: ['50%'],
        filename: previewName,
        folder: previewPath,
        size: '540x?'
      });
  });
}

/**
 * 遍历文件夹中的文件
 * @param dirPath 文件夹路径
 */
export async function mapDir(dirPath: string) {
  /** 完整的文件夹路径 */
  const dir = path.join(config.staticPath, dirPath);
  /** 当前文件夹的文件列表, 带后缀名 */
  const files = await fs.promises.readdir(dir);

  if (!files) {
    return;
  }
  /** 图片预览保存文件夹 */
  const previewDir = 'previewPicture';
  /** 图片预览保存文件夹路径 */
  const previewPath = path.join(config.staticPath, previewDir);

  await makePreviewPictureDir(previewPath);
  /** 文件夹中的文件信息列表 */
  const ret: FilesInfo[] = await files.reduce(async (promise, videoFullName) => {
    return promise.then(async (last) => {
      const pathname = path.join(dir, videoFullName);
      const info = await fs.promises.stat(pathname);
      /** 文件拓展名 */
      const extname = path.extname(pathname);
      /** 是否是视频文件 */
      const isVideo = info.isFile() && ['.mp4'].includes(extname);

      if (info && isVideo) {
        const { birthtime } = info;
        const fileName = videoFullName.replace(new RegExp(extname, 'ig'), '');
        const previewName = `${fileName}.jpeg`;
        // eslint-disable-next-line no-sync
        const previewIsExists = fs.existsSync(path.join(previewPath, previewName));

        if (!previewIsExists) {
          await makePreviewPicture(pathname, previewName, previewPath);
        }
        last.push({
          fileName,
          // pathname,
          videoUrl: `/${dirPath}/${videoFullName}`,
          previewImgUrl: `/${previewDir}/${previewName}`,
          createdTime: birthtime.getTime()
        });
      }
      return last;
    });
  }, Promise.resolve([] as FilesInfo[]));

  return ret;
}


