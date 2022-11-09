export {};
const { env } = require('process')

require('dotenv').config()


const ENV = {
    PORT: env.APP_PORT
}

module.exports = ENV