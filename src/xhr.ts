import { AxiosRequestConfig } from './types/index'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config

  const reqeust = new XMLHttpRequest()

  reqeust.open(method.toUpperCase(), url, true)
  reqeust.send(data)
}
