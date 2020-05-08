const http = require("http");
const app = require('./module/route');
const ejs = require("ejs");
const querystring = require('querystring');
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'itying';
// const client = new MongoClient(url, { useUnifiedTopology: true });

//注册web服务
http.createServer(app).listen(3000);

// app.static("public");    //修改默认静态web目录

//配置路由
app.get('/', function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("连接数据库成功");
    const db = client.db(dbName);
    //  查询
    db.collection("user").find({}).toArray((err, result) => {
      client.close();
      ejs.renderFile("./views/index.ejs", {
        list: result
      }, (err, data) => {
        res.send(data);
      })
    })
  })
})

//配置路由
app.get('/login', function (req, res) {
  ejs.renderFile("./views/form.ejs", {}, (err, data) => {
    res.send(data)
  })
})

app.get('/register', (req, res) => {
  ejs.renderFile('./views/register.ejs', {}, (err, data) => {
    res.send(data);
  })
})

app.post('/doRegister', (req, res) => {
  let body = querystring.parse(req.body);
  console.log(body);
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("连接数据库成功");
    const db = client.db(dbName);
    //  查询
    db.collection("user").insertOne(body, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('增加数据成功');
      res.send('增加数据成功')
    })
  })
})

app.post('/doLogin', function (req, res) {
  console.log(req.body);
  res.send(req.body)
})