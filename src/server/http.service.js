import axios from 'axios'
import querystring from 'querystring'
import api_conf from '../config/config'

const routes = {
    pe: 'overview',
    list: 'stocks'
}

function buildUrl(type, params) {
    console.log(api_conf)
    var base = api_conf.host +
        ":" +
        api_conf.port +
        "/" +
        routes[type];
    return base + "?" + querystring.stringify(params)
}

const get = (type, params) => {
    var url = buildUrl(type, params)
    return axios.get(
        url 
    )
}

export default get
