const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

const devLogger = ()=>{
    return createLogger({
        level: 'debug',
        format: combine(
            timestamp(),
            prettyPrint()
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'error.log', level: 'error' }),
            new transports.File({ filename: 'combined.log' }),
        ],
    });
}

module.exports = devLogger;