// ecosystem.config.js
module.exports = {
  apps: [{
    // 生产环境
    name: "yanyuge-prod-back",
    // 项目启动入口文件
    script: "./dist/server.js",
    // 项目环境变量
    env: {
      "NODE_ENV": "production"
    }
  }]
}