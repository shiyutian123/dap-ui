/*
 * @Author: your name
 * @Date: 2020-03-01 13:38:14
 * @LastEditTime: 2020-03-01 15:41:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dap-vue-ui/packages/plugins/load-resource/load-resource.ts
 */
const LoadResourcePlugin = {
  install(Vue, opts) {
    /**
     * @description: 异步加载资源
     * @param {String} resourceUrl - 资源链接 
     * @param {String} tag - 资源标签
     * @param {String} id - 标签的id
     * @return:
     */
    Vue.asyncLoadResource = function (resourceUrl, tag, id) {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id) !== null) {
          resolve();
        } else {
          const element = document.createElement(tag);
          element.setAttribute('id', id);
          switch(tag) {
            case 'link':
              element.setAttribute('rel', 'stylesheet');
              element.setAttribute('type', 'text/css');
              element.setAttribute('href', resourceUrl);
              break;
            case 'script':
              element.setAttribute('src', resourceUrl);
              break;
            default:
              break;
          }
          element.addEventListener('load', () => {
            resolve();
          });
          element.addEventListener('error', (err) => {
            reject(err);
          });
          document.getElementsByTagName('head')[0].appendChild(element);
        }
      });
    };
    Vue.prototype.$asyncLoadResource = Vue.asyncLoadResource;
  }
};

export default LoadResourcePlugin;
