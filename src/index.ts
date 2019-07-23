import Axios from './core/Axios'
import { AxiosInstance, AxiosRequestConfig } from './types'
import { extend } from './helper/util'
import defaultConfig from './default'

function createInstace(config: AxiosRequestConfig): AxiosInstance {
  const context: Axios = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

export default createInstace(defaultConfig)
