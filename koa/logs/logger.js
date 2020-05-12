const log4js = require('log4js');
const logsConfig = require('./logs.config');
// log4js.configure({
//   appenders: {
//     console: { type: 'console' },
//     cheeseLogs: { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
//   },
//   categories: {
//     default: { appenders: ['console', 'cheeseLogs'], level: 'info' }
//   }
// });
log4js.configure(logsConfig);

// const logger = log4js.getLogger('cheese');
// module.exports = logger;

exports.getLogger = function (name) {//name取categories项
  return log4js.getLogger(name || 'default')
};

exports.useLogger = function (app, logger) {//用来与express结合
  app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
    format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'//自定义输出格式
  }))
};

exports.errlogger = log4js.getLogger('err');
exports.othlogger = log4js.getLogger('oth');