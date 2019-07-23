import { AxiosRequestConfig, AxiosTransfomer } from '../types'

export default function transform(
  data: AxiosRequestConfig,
  headers?: any,
  fns?: AxiosTransfomer | AxiosTransfomer[]
) {
  if (!fns) return data
  if (!Array.isArray(fns)) fns = [fns]

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
