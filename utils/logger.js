const bunyan = require('bunyan');   
const path = require('path');

const logger = bunyan.createLogger({
    name: 'logger-instance',
    streams : [
        {
            level: 'info',
            stream: process.stdout

        },
        {
            level: 'info',
            path: path.join('logs','app.log')
        }
    ]
});

module.exports = logger;
