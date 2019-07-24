import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { parseHeaders } from '../helper/headers'
import { createError } from '../helper/error'
import { isURLSameOrigin } from '../helper/url'
import { read } from '../helper/cookie'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName
    } = config

    const request = new XMLHttpRequest()

    if (responseType) request.responseType = responseType

    if (timeout) request.timeout = timeout

    if (withCredentials && isURLSameOrigin(url!) && xsrfCookieName) {
      const xsrfValue = read(xsrfCookieName)
      if (xsrfValue) headers[xsrfHeaderName!] = xsrfValue
    }

    if (withCredentials) request.withCredentials = withCredentials

    request.onerror = function handleError() {
      reject(createError('network error', config, null, request))
    }

    request.ontimeout = function handleTimeout() {
      reject(createError('Timeout of 2000 ms exceeded', config, null, request))
    }

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return

      if (request.status === 0) return

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      handleResponse(response)
    }

    request.open(method.toUpperCase(), url!, true)
    Object.keys(headers).forEach(name => {
      if (!data && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.send(data)

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status <= 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request Failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
