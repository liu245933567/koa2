// const superagent = require('superagent')
// const charset = require('superagent-charset');
// const cheerio = require('cheerio')
// charset(superagent)

// async function getImagesOfSingleSection() {
//   // const sectionsList = await this.getSectionsList();
//   // console.log(sectionsList.length);
//   // 目前测试取第一个
//   // const url = sectionsList[0].sectionHref;
//   const url = 'https://www.iimanhua.com/comic/1204/355994.html';
//   const getPges = () => new Promise(async resolve => {
//     superagent
//       .get(url)
//       .charset('gb2312')
//       .end((err, res) => {
//         const htmlText = res.text;
//         let photosr = [];
//         // base64 js代码片段
//         console.log(htmlText);
//         console.log('htmlText.match(/packed="\w{20,}";/g)', htmlText.match(/packed="\w{20,}";/g));
//         const base64js = htmlText.match(/packed="\w{20,}";/g)[0].slice(8,-2);
//         const deCode = new Buffer(base64js, 'base64').toString().slice(4);
//         // 执行解析后的代码
//         eval(eval(deCode));
//         photosr = photosr.filter(item => item).map(link => `http://res.img.fffimage.com/${link}`);
//         console.log(photosr);
//         resolve(photosr)
//       })
//   })
//   const pageNums = await getPges();
//   console.log("pageNum", pageNums);
//   return pageNums;
// }

// getImagesOfSingleSection();

// const htmlText = `var photosr = new Array();
// packed="ZXZhbChmdW5jdGlvbihwLGEsYyxrLGUsZCl7ZT1mdW5jdGlvbihjKXtyZXR1cm4oYzxhPycnOmUocGFyc2VJbnQoYy9hKSkpKygoYz1jJWEpPjM1P1N0cmluZy5mcm9tQ2hhckNvZGUoYysyOSk6Yy50b1N0cmluZygzNikpfTtpZighJycucmVwbGFjZSgvXi8sU3RyaW5nKSl7d2hpbGUoYy0tKXtkW2UoYyldPWtbY118fGUoYyl9az1bZnVuY3Rpb24oZSl7cmV0dXJuIGRbZV19XTtlPWZ1bmN0aW9uKCl7cmV0dXJuJ1xcdysnfTtjPTF9O3doaWxlKGMtLSl7aWYoa1tjXSl7cD1wLnJlcGxhY2UobmV3IFJlZ0V4cCgnXFxiJytlKGMpKydcXGInLCdnJyksa1tjXSl9fXJldHVybiBwfSgnY1sxXT0iZS9iL2EvZC9mL3IuZy8wIjtjWzJdPSJlL2IvYS9kL2YvcS5nLzAiO2NbM109ImUvYi9hL2QvZi9zLmcvMCI7Y1s0XT0iZS9iL2EvZC9mL3AuZy8wIjtjWzVdPSJlL2IvYS9kL2Yvdi5nLzAiO2NbNl09ImUvYi9hL2QvZi91LmcvMCI7Y1s3XT0iZS9iL2EvZC9mL3cuZy8wIjtjWzhdPSJlL2IvYS9kL2Yvby5nLzAiO2NbOV09ImUvYi9hL2QvZi9qLmcvMCI7Y1tpXT0iZS9iL2EvZC9mL2guZy8wIjtjW2tdPSJlL2IvYS9kL2YvbC5nLzAiO2NbbV09ImUvYi9hL2QvZi9uLmcvMCI7Y1t0XT0iZS9iL2EvZC9mL3guZy8wIjtjW0xdPSJlL2IvYS9kL2YvSS5nLzAiO2NbS109ImUvYi9hL2QvZi9OLmcvMCI7Y1tKXT0iZS9iL2EvZC9mL0guZy8wIjtjW01dPSJlL2IvYS9kL2YvRi5nLzAiO2NbQV09ImUvYi9hL2QvZi9HLmcvMCI7Y1t6XT0iZS9iL2EvZC9mL3kuZy8wIjtjW0JdPSJlL2IvYS9kL2YvQy5nLzAiO2NbRV09ImUvYi9hL2QvZi9ELmcvMCI7Jyw1MCw1MCwnfHx8fHx8fHx8fDA1fDIwMjB8cGhvdG9zcnwwNHxpbWFnZXN8MDB8anBnfDQ1ZWQ1MjdhODN8MTB8NDVhYTdkMDBjNnwxMXw0NWRkN2UwZjA1fDEyfDQ1NGEyNGIzOWN8NDU2M2E1MTBiMHw0NTFlYjAxMjkwfDQ1NDJhNTAxYmV8NDU2NGZlZWIzMHw0NTkyMTEyZmIxfDEzfDQ1NThiZTY2OTl8NDU0ZmM5OTBhMnw0NTM2MzJkMjUzfDQ1ZTc2OWQ4ZWZ8NDZiMzA2MmFlOXwxOXwxOHwyMHw0NjZhNzg2OTAyfDQ2MjEyMTRlYzB8MjF8NDY5NDRkYWRmOHw0NjM1ZDMxN2RhfDQ2MjQwMWQ3YTN8NDViYzQzZDg0NHwxNnwxNXwxNHwxN3w0NTQ4NDM1M2E5Jy5zcGxpdCgnfCcpLDAse30pKQo=";eval(eval(base64decode(packed).slice(4)));
// var maxpages=photosr.length-1;`;

// const base64js = htmlText.match(/packed="\w{20,}";/g)[0].slice(8, -2);
// console.log('match', htmlText.match(/packed="\w{20,}";/g));
// console.log('base64js', base64js);
console.log('\033[43;30m 开始获取 \033[0m 我是大神仙章节列表')
console.log('\033[42;30m 开始获取 \033[0;32m 我是大神仙章节列表获取成功\033[0m')
console.log('\033[41;30m 失败 \033[0;31m 我是大神仙章节列表获取失败\033[0m')
