// Koa 是一个新的 web 框架
const Koa = require('koa') 
// SuperAgent是一个轻量级、灵活的、易读的、低学习曲线的客户端请求代理模块，使用在NodeJS环境中。
const request = require('superagent')
// cheerio是nodejs的抓取页面模块，为服务器特别定制的jQuery核心实现。适合各种Web爬虫程序。
const cheerio = require('cheerio')
// 引入 path 模块中的 join 用于拼接正确的路径
const { join } = require('path')

const app = new Koa() // 这里要注意我们引入的koa是一个构造函数, 需要去实例它
// Koa 应用程序是一个包含一组中间件函数的对象
app.use(async (ctx, next) => {
  // ctx 这是 Context, 具体用法大家去看文档哈,很详细
  //async next() 当一个中间件调用 next() 则该函数暂停并将控制传递给定义的下一个中间件。
  const arr = [] // 创建一个数组存储我们要抓取页面的数据
  const URL = "http://www.wtown.com.cn/" // 保存我们要抓取页面的地址

  // 重点注意的是, request请求是一个异步,因此要把他转为一个Promise对象,等待获取完数据在返回出去
  const data = new Promise(resolve => {
    request
      // 这里我抓取的是一个景区官网的票务信息
      .get("http://www.wtown.com.cn/index.php/Reservation/Ticket/index.html")
      .end((err, res) => {
        console.log(res) // 这是我们抓取到的页面整个数据
        const data = res.text // 我需要的信息在text中
        const $ = cheerio.load(data) // 通过 cheerio 模块转为DOM结构
        // 分析页面DOM结构抓取相应的数据
        $(".box ul li").each((i, v) => { // 因为获取的不止一个,所以要each遍历保存数据
          const $v = $(v)
          const obj = {
            // join 用于拼接正确的路径
            img: join(URL, $v.find('.ticket-left img').prop("src")),
            // // join 用于拼接正确的路径
            src: join(URL, $v.find('.ticket-right .fs24 a').prop("href")),
            text: $v.find('.ticket-right .txt').text().trim(),
            price: $v.find('.ticket-right p .fs24').text().trim(),
          }
          arr.push(obj)
        });
        resolve(arr) // 当数据都存到 arr 中以后 resolve 出去
      })
  })
  ctx.body = data // 将我们抓取到的数据返回到页面中显示
})
app.listen(3000) // 这里我们监听3000端口