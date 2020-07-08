import * as superagent from 'superagent';
// @ts-ignore
import * as charset from 'superagent-charset';
import * as cheerio from 'cheerio';
// import * as urlencode from 'urlencode';
import * as querystring from 'querystring';
import * as iconv from 'iconv-lite';
import * as http from 'http';
charset(superagent);

/** 取得元素内非元素的内容 */
export const clearElText = (el: Cheerio) =>
  (el && el.clone().children().remove().end().text()) || '';

/**
 * 获取html信息
 * @param url 目标url
 */
export function getHtmlDom(
  url: string
): Promise<{ htmlText: string | null; $: CheerioStatic | null }> {
  return new Promise((resolve) => {
    superagent
      .get(url)
      .buffer(true)
      // @ts-ignore
      .charset('gb2312')
      // @ts-ignore
      .end((err, res) => {
        if (err) {
          resolve({ htmlText: null, $: null });
        } else {
          const htmlText: string = res.text;
          const $ = cheerio.load(htmlText);

          resolve({
            /** html 信息 */
            htmlText,
            /** 模拟dom */
            $
          });
        }
      });
  });
}

/** */

/**
 * 将utf-8编码转为GBK编码
 * @param formData 需要转码的对象
 */
export function convertParamsToGbk(formData: {
  [key: string]: string | number;
}): string {
  const postData = querystring.stringify(
    formData,
    null as never,
    null as never,
    {
      encodeURIComponent: (str) => {
        // eslint-disable-next-line no-control-regex
        const chinese = new RegExp(/[^\x00-\xff]/g);
        let gbkBuffer: Buffer;
        let tempStr = '';

        if (chinese.test(str)) {
          gbkBuffer = iconv.encode(str, 'gbk');
          for (let i = 0; i < gbkBuffer.length; i++) {
            tempStr += '%' + gbkBuffer[i].toString(16);
          }
          tempStr = tempStr.toUpperCase();
          return tempStr;
        }
        return querystring.escape(str);
      }
    }
  );

  return postData;
}

/**
 * 发起 post 请求
 * @param hostname 请求域名
 * @param path 请求路径
 * @param postData 请求数据
 */
export function toRequestPost(
  hostname: string,
  path: string,
  postData: string
): Promise<any> {
  const options = {
    hostname,
    path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      console.log('STATUS: ' + res.statusCode);
      //响应的Cookie在res.header['set-cookie']
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      if (res.headers.location) {
        resolve(res);
      }
      // res.setEncoding('binary');//接收参数的时候先不要解码，或者解码为二进制
      // res.on('data', function(chunk) {
      //   console.log('BODY: ' + iconv.decode(chunk, 'gbk')); //gbk解码
      // });
      res.on('data', (chunk) => {
        resolve({
          ...res,
          responseData: chunk
        });
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/** 爱漫画地址 */
export const IImanhuaHOST = 'https://www.iimanhua.com';

/** 爱漫画图片地址 */
export const IImanhuaImageHOST = 'http://res.img.fffimage.com';
