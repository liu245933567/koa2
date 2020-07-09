/*
 * @Author: LiuYh
 * @Description: 上传到七牛
 * @Date: 2020-07-09 17:28:13
 * @Last Modified by: LiuYh
 * @Last Modified time: 2020-07-09 19:37:46
 */

import * as qiniu from 'qiniu';
/** 七牛云配置 */
const QINIU = {
  accessKey: 'GHNdT72rodVdu3Qcu3T1bxHe40HpiweC3ge3C0pZ',
  secretKey: 'Kl6JUhN_v1P2iXRIj3kWHU1QdlJrqgEAg8tVD13l',
  /** 存储空间名称 */
  bucket: 'yanyuge',
  /** cdn 域名 */
  origin: 'http://qiniu.yanyuge.xyz/'
};

const upToQiniu = (localFile: NodeJS.ReadableStream, key: string) => {
  const accessKey = QINIU.accessKey;
  const secretKey = QINIU.secretKey;
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: QINIU.bucket
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  /** 生成token 作为个人七牛云账号的识别标识 */
  const uploadToken = putPolicy.uploadToken(mac);
  const config = new qiniu.conf.Config({
    /** 空间对应的机房 一定要按自己属区Zone对象 */
    zone: qiniu.zone.Zone_z2
  });
  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();

  return new Promise((resolved, reject) => {
    // 以文件流的形式进行上传
    // uploadToken是token， key是上传到七牛后保存的文件名, localFile是流文件
    // putExtra是上传的文件参数，采用源码中的默认参数
    formUploader.putStream(
      uploadToken,
      key,
      localFile,
      putExtra,
      (respErr, respBody, respInfo) => {
        if (respErr) {
          reject(null);
        } else {
          resolved({ key: `${QINIU.origin}${respBody.key}` });
        }
      }
    );
  });
};

export { upToQiniu };
