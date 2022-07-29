const devLogger = require("./devLogger")

let logger = null;

if (process.env.NODE_ENV !== 'production') {
    logger = devLogger()
}

module.exports = logger;