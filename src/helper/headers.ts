import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'

function normalizeHeadersName(headers: any, normalizedName: string): void {
  if (!headers) return

  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(data: any, headers: any): any {
  normalizeHeadersName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)

  if (!headers) return parsed

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    parsed[key] = val && val.trim()
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers

  const methodsToDelete = ['get', 'post', 'head', 'options', 'put', 'patch', 'delete', 'common']

  headers = deepMerge(headers.common, headers[method], headers)

  methodsToDelete.forEach(name => {
    delete headers[name]
  })

  return headers
}
