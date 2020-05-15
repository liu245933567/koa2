const path = require('path');

//日志根目录
const baseLogPath = path.resolve(__dirname, '../logs');  

// 错误日志目录
const errorPath = "/error";  
//错误日志文件名
const errorFileName = "error";  
//错误日志输出完整路径
const errorLogPath = `${baseLogPath}${errorPath}/${errorFileName}`;  

//响应日志目录
const responsePath = "/response";
//响应日志文件名
const responseFileName = "response";
//响应日志输出完整路径
const responseLogPath = `${baseLogPath}${responsePath}/${responseFileName}`;

module.exports = {
  "replaceConsole": true,
  "appenders": {
    "stdout": {//控制台输出
      "type": "console"
    },
    "resLogger": {
      "type": "dateFile",
      "filename": responseLogPath,
      "pattern": "-yyyy-MM-dd-hh.log",
      "alwaysIncludePattern": true,
      "path": responsePath
    },
    "errorLogger": {//错误日志
      "type": "dateFile",
      "filename": errorLogPath,
      "pattern": "-yyyy-MM-dd-hh.log",
      "alwaysIncludePattern": true,
      "path": errorPath
    }
  },
  "categories": {//level:设置级别
    "default": {
      "appenders": [
        "stdout",
        "resLogger"
      ],
      "level": "debug"
    },
    "errorLogger": {
      "appenders": [
        "stdout",
        "errorLogger"
      ],
      "level": "error"
    }
  },
  "baseLogPath": baseLogPath
}