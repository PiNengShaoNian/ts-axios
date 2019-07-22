export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'DELETE'
  | 'delete'
  | 'patch'
  | 'PATCH'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'

export interface AxiosRequestConfig {
  method?: Method
  url: string
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
