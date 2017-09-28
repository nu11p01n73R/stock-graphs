var api_config = {}

try {
    api_config = require('./config-local.js')
} catch (err) {
    if (process.env.API_HOST && process.env.API_PORT) {
        api_config = {
            host: process.env.API_HOST,
            port: process.env.API_PORT
        }
    } else {
        throw 'No API_HOST or API_PORT specified'
    }
}

export default api_config
