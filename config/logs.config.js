module.exports = {
  "replaceConsole": true,
  "appenders": {
    "stdout": {//控制台输出
      "type": "console"
    },
    "req": {
      "type": "dateFile",
      "filename": "logs/reqlog/",
      "pattern": "req-yyyy-MM-dd.log",
      "alwaysIncludePattern": true,
      "maxLogSize": 104800,
      "backups": 100
    },
    "err": {//错误日志
      "type": "dateFile",
      "filename": "logs/errlog/",
      "pattern": "err-yyyy-MM-dd.log",
      "alwaysIncludePattern": true,
      "maxLogSize": 104800,
      "backups": 100
    },
    "oth": {//其他日志
      "type": "dateFile",
      "filename": "logs/othlog/",
      "pattern": "oth-yyyy-MM-dd.log",
      "alwaysIncludePattern": true,
      "maxLogSize": 104800,
      "backups": 100
    }
  },
  "categories": {//level:设置级别
    "default": {
      "appenders": [
        "stdout",
        "req"
      ],
      "level": "debug"
    },
    "err": {
      "appenders": [
        "stdout",
        "err"
      ],
      "level": "error"
    },
    "oth": {
      "appenders": [
        "stdout",
        "oth"
      ],
      "level": "info"
    }
  }
}