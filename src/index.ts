import Axios from './core/Axios'
import { AxiosInstance } from './types'
import { extend } from './helper/util'

function createInstace(): AxiosInstance {
  const context: Axios = new Axios()
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosInstance
}

export default createInstace()
