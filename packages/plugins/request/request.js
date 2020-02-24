/*
 * @Author: Devin Shi
 * @Email: yutian.shi@definesys.com
 * @Date: 2019-07-18 19:16:44
 * @LastEditTime: 2020-02-24 17:08:12
 * @LastEditors: DevinShi
 * @Description:
 */
import axios from 'axios'
import fileDownload from 'js-file-download'
import {HttpError , HTTP_ERROR_CONSTANT } from './request.constant'

export default {
  install (Vue, opts) {
    const requestInterceptorMap = new Map()
    const responseInterceptorMap = new Map()

    // eslint-disable-next-line no-extend-native
    Promise.prototype.aysncErrorCatch = function (catchFunction) {
      this.$currentErrorCatchFunction = catchFunction
      return this
    }

    // eslint-disable-next-line no-extend-native
    Promise.prototype.aysncThen = function (onResolve, onReject) {
      this.then(onResolve, onReject)
      return this
    }

    const options = {
      baseURL: opts.baseURL || '',
      timeout: opts.timeout || 50000,
      method: opts.method || 'get',
      headers: opts.headers || {},
      withCredentials: opts.withCredentials || false,
      responseType: opts.responseType || 'json',
      validateStatus: opts.validateStatus || function (status) {
        return status >= 200 && status < 300 // 默认的
      },
      dataMock: opts.dataMock || {
        enabled: false,
        mockUrl: '',
        realUrl: ''
      },
      maxRedirects: opts.maxRedirects || 5,
      onUploadProgress: opts.onUploadProgress,
      onDownloadProgress: opts.onDownloadProgress
    }

    const customOptions = {
      businessValid: opts.businessValid || function (response) {
        return response.code === '200' || response.code === 'ok'
      },
      businessTransform: opts.businessTransform || function (data, response) {
        data.headers = response.headers
        data.data = data.data || data.table
      },
      errorCatch: opts.errorCatch || function (err, needShowMessage) {
        if (!needShowMessage) {
          return
        }
        if (err.response) {
          if (HTTP_ERROR_CONSTANT[err.response.status]) {
            Vue.prototype.$message.error(HTTP_ERROR_CONSTANT[err.response.status].errorMsg)
          } else if (err.response.status >= (HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.BadRequestMin].errorCode - 9000) && err.response.status <= (HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.BadRequestMax].errorCode - 9000)) {
            Vue.prototype.$message.error(HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.BadRequestMin].errorMsg)
          } else if (err.response.status >= (HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.ServerExceptionMin].errorCode - 9000) && err.response.status <= (HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.ServerExceptionMin].errorCode - 9000)) {
            Vue.prototype.$message.error(HTTP_ERROR_CONSTANT[HTTP_STATUS_CODE.ServerExceptionMin].errorMsg)
          }
        } else if (err.message === '终止请求') {
          console.log(err.message)
        } else {
          Vue.prototype.$message.error('timeout : 网络连接超时了， 请检查您的网络设置')
        }
      },
      businessErrorCatch: opts.businessErrorCatch || function (failRes, response, needShowMessage) {
        if (needShowMessage) {
          Vue.prototype.$message.info(failRes.message)
        }
      }
    }

    // 设置通用配置
    let instance = axios.create({
      baseURL: options.baseURL,
      timeout: options.timeout,
      method: options.method,
      headers: options.headers,
      withCredentials: options.withCredentials,
      responseType: options.responseType,
      validateStatus: options.validateStatus,
      maxRedirects: options.maxRedirects
    })

    Vue.setGlobalConfig = function (networkConfig) {
      const globalOptions = {
        ...options,
        ...networkConfig
      }
      instance.defaults = {
        ...instance.defaults,
        ...globalOptions
      }
      Vue.axios = instance
      Vue.prototype.$axios = instance
    }

    Vue.addHeaders = function (headers) {
      options.headers = {
        ...options.headers,
        ...headers
      }
      instance.defaults = {
        ...instance.defaults,
        ...options
      }
      Vue.axios = instance
      Vue.prototype.$axios = instance
    }

    Vue.addInterceptorsRequest = function (interceptorKey, callback) {
      Vue.removeInterceptorsRequest(interceptorKey)
      const requestInterceptor = instance.interceptors.request.use(callback)
      requestInterceptorMap.set(interceptorKey, requestInterceptor)
    }

    Vue.removeInterceptorsRequest = function (interceptorKey) {
      if (requestInterceptorMap.get(interceptorKey)) {
        instance.interceptors.request.eject(requestInterceptorMap.get(interceptorKey))
      }
    }

    Vue.addInterceptorsResponse = function (interceptorKey, callback) {
      Vue.removeInterceptorsRequest(interceptorKey)
      const responseInterceptor = instance.interceptors.response.use(callback)
      responseInterceptorMap.set(interceptorKey, responseInterceptor)
    }

    Vue.removeInterceptorsResponse = function (interceptorKey) {
      if (responseInterceptorMap.get(interceptorKey)) {
        instance.interceptors.request.eject(responseInterceptorMap.get(interceptorKey))
      }
    }

    Vue.post = function (urlConfig, needShowMessage) {
      const config = {
        url: urlConfig.url,
        data: urlConfig.params,
        config: {
          ...urlConfig.config,
          method: 'post'
        }
      }
      return Vue.request(config, needShowMessage)
    }

    Vue.get = function (urlConfig, needShowMessage) {
      const config = {
        url: urlConfig.url,
        params: urlConfig.params,
        config: {
          ...urlConfig.config,
          method: 'get'
        }
      }
      Vue.request(config, needShowMessage)
    }

    Vue.request = function (urlConfig, needShowMessage = true) {
      urlConfig = JSON.parse(JSON.stringify(urlConfig));
      if (options.dataMock.enabled && urlConfig.mockUrl.indexOf(options.dataMock.mockUrl) !== -1) {
        urlConfig.method = 'get'
      }

      if (urlConfig.url.indexOf('?') !== -1) {
        urlConfig.url = urlConfig.url + '&' + '__timestamp=' + (new Date()).valueOf()
      } else {
        urlConfig.url = urlConfig.url + '?' + '__timestamp=' + (new Date()).valueOf()
      }
      const config = {
        ...options,
        ...urlConfig,
        url: urlConfig.url,
        method: urlConfig.method,
        params: urlConfig.params,
        headers: {
          ...options.headers,
          ...urlConfig.headers
        },
        cancelToken: urlConfig.config && urlConfig.config.cancelToken
      }
      if (config.method === 'post' || config.method === 'POST') {
        config.data = urlConfig.params;
        delete config.params
      }
      
      // eslint-disable-next-line no-extend-native
      let promise
      promise = new Promise(function (resolve, reject) {
        instance.request(config)
          .then(response => {
            const data = response.data
            // 自定义解析字段，并带上相关请求头
            if (customOptions.businessValid(data)) {
              customOptions.businessTransform(data, response)
              resolve(data)
            } else {
              customOptions.businessErrorCatch(data, response, needShowMessage)
              reject(data)
            }
          })
          .catch(err => {
            customOptions.errorCatch(err, needShowMessage)
            if (promise && promise.$currentErrorCatchFunction) {
              promise.$currentErrorCatchFunction(err)
            }
          })
      })
      // eslint-disable-next-line no-new
      return promise
    }

    /**
     * 默认使用post方式下载文件，若需要修改则需要在传入参数的config中，添加相关配置 { method: 'post'}
     */
    Vue.download = function (urlConfig, onDownloadProgress, needShowMessage = true) {
      const config = {
        ...options,
        ...urlConfig,
        url: urlConfig.url,
        method: urlConfig.method,
        params: urlConfig.params,
        responseType: 'blob',
        onDownloadProgress: onDownloadProgress || urlConfig.onDownloadProgress,
        cancelToken: urlConfig.config && urlConfig.config.cancelToken
      }
      if (config.method === 'post' || config.method === 'POST') {
        config.data = urlConfig.params;
        delete config.params
      }
      
      // eslint-disable-next-line no-new
      let promise
      promise = new Promise((resolve, reject) => {
        instance.request(config)
          .then(response => {
            const disposition = response.headers['content-disposition']
            let filename = disposition && decodeURI(disposition.match(/filename="(.*)"/)[1])  
            filename = filename || urlConfig.filename || '下载文件';
            fileDownload(response.data, filename)
            // 将文件配置放入数据
            resolve(disposition)
          })
          .catch(err => {
            customOptions.errorCatch(err, needShowMessage)
            if (promise && promise.$currentErrorCatchFunction) {
              promise.$currentErrorCatchFunction(err)
            }
          })
      })
      return promise
    }

    /**
     * @param urlConfig.params 参数必须是FormData
     */
    Vue.upload = function (urlConfig, onUploadProgress, needShowMessage = true) {
      const config = {
        ...options,
        ...urlConfig.config,
        method: 'post',
        onUploadProgress: onUploadProgress || urlConfig.onUploadProgress,
        headers: {
          ...options.headers,
          ...urlConfig.headers,
          'Content-Type': 'multipart/form-data'
        },
        url: urlConfig.url,
        params: urlConfig.params,
      }
      // eslint-disable-next-line no-new
      let promise
      promise = Promise((resolve, reject) => {
        instance.request(config)
          .then(response => {
            const data = response.data
            // 自定义解析字段，并带上相关请求头
            if (customOptions.businessValid(data)) {
              customOptions.businessTransform(data, response)
              resolve(data)
            } else {
              customOptions.businessErrorCatch(data, response, needShowMessage)
              reject(data)
            }
          })
          .catch(err => {
            customOptions.errorCatch(err, needShowMessage)
            if (promise && promise.$currentErrorCatchFunction) {
              promise.$currentErrorCatchFunction(err)
            }
          })
      })
      return promise
    }

    Vue.prototype.$post = Vue.post
    Vue.prototype.$get = Vue.get
    Vue.prototype.$request = Vue.request
    Vue.prototype.$download = Vue.download
    Vue.prototype.$upload = Vue.upload

    Vue.axios = instance
    Vue.prototype.$axios = instance
  }
}
