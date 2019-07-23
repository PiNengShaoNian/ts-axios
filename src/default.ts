import { AxiosRequestConfig } from './types'
import { processHeaders } from './helper/headers'
import { transformRequest, transformResponse } from './helper/data'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers?: any) {
      processHeaders(data, headers)

      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data) {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'options', 'head']

methodsNoData.forEach(name => {
  defaults.headers[name] = {}
})

const methodsWithData = ['patch', 'put', 'post']

methodsWithData.forEach(name => {
  defaults.headers[name] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
