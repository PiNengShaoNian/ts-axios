import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { request } from 'https'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const reqeust = new XMLHttpRequest()

    if (responseType) reqeust.responseType = responseType

    reqeust.onreadystatechange = function handleLoad() {
      if (reqeust.readyState !== 4) return

      const responseHeaders = reqeust.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? reqeust.response : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        status: reqeust.status,
        statusText: reqeust.statusText,
        headers: responseHeaders,
        config,
        request
      }

      resolve(response)
    }

    reqeust.open(method.toUpperCase(), url, true)
    Object.keys(headers).forEach(name => {
      if (!data && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        reqeust.setRequestHeader(name, headers[name])
      }
    })
    reqeust.send(data)
  })
}
