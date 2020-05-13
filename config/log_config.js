var path = require('path');

//日志根目录
var baseLogPath = path.resolve(__dirname, '../logs')

//错误日志目录
var errorPath = "/error";
//错误日志文件名
var errorFileName = "error";
//错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
// var errorLogPath = path.resolve(__dirname, "../logs/error/error");

//响应日志目录
var responsePath = "/response";
//响应日志文件名
var responseFileName = "response";
//响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
// var responseLogPath = path.resolve(__dirname, "../logs/response/response");

// module.exports = {
//   "appenders": [
//     //错误日志
//     {
//       "category": "errorLogger",             //logger名称
//       "type": "dateFile",                   //日志类型
//       "filename": errorLogPath,             //日志输出位置
//       "alwaysIncludePattern": true,          //是否总是有后缀名
//       "pattern": "-yyyy-MM-dd-hh.log",      //后缀，每小时创建一个新的日志文件
//       "path": errorPath                     //自定义属性，错误日志的根目录
//     },
//     //响应日志
//     {
//       "category": "resLogger",
//       "type": "dateFile",
//       "filename": responseLogPath,
//       "alwaysIncludePattern": true,
//       "pattern": "-yyyy-MM-dd-hh.log",
//       "path": responsePath
//     }
//   ],
//   //设置logger名称对应的的日志等级
//   "levels": {
//     "errorLogger": "ERROR",
//     "resLogger": "ALL"
//   },
//   "baseLogPath": baseLogPath                  //logs根目录
// }
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