const winston = require('winston')
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

class Logger {
  constructor() {
    this.warn = createLogger({
      format: combine(
        timestamp(),
        prettyPrint()
      ),
      level: 'warn',
      transports: [
        new winston.transports.File({ filename: '../log/error.log'})
      ]
    })
    this.info = new createLogger({
      level: 'info',
      transports: [
        new winston.transports.File({ filename: '../log/info.log'})
      ]
    })
  }
  infoLog(message) {
    this.info.log({
      level: 'info',
      message: message
    })
  }
  warnLog(message) {
    this.warn.log({
      level: 'warn',
      message: message
    })
  }
}

module.exports = Logger