'use strict'

import axios from 'axios'
import JSONbig from 'json-bigint'

const JSONbigString = JSONbig({ storeAsString: true })

// Full const:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.VUE_APP_BASE_URL || process.env.apiUrl || ''
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformResponse = [
  function (data: object) {
    try {
      return JSONbigString.parse(data)
    } catch (e) {
      return data
    }
  }
]

export default axios
