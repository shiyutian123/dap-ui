/*
 * @Author: DevinShi
 * @Date: 2020-02-16 02:27:11
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-18 15:05:56
 * @Description: file content description
 */
import StringUtil from '../../utils/string.util';
const {JSONPath} = require('jsonpath-plus');

class CompError {
    constructor(errorCode, errorMsg, error){
        this.errorCode = errorCode;
        this.errorMsg = errorMsg;
        this.error = error;
    }
}

const COMP_REGISTER_ERROR = {
     COMP_EXIST_ERROR: new CompError(-5001, '组件已经在表单中注册'),
     COMP_NOT_VALID_ERROR: new CompError(-5001, '组件不是一个Vue的组件'),
 }

const COMP_ADAPTER_REGISTER_ERROR = {
    COMP_ADAPTER_EXIST_ERROR: new CompError(-5001, '组件适配器已经在表单中注册'),
}

export default {
    install (Vue, opts) {
        Vue.prototype.$baseFormRegister = {
            registeredComponent: {},
            registeredAdapter: {},
            registerComponent(compName, compType, component) {
                if (typeof component.template === 'string' || typeof component.render === 'function') {
                    if (!this.registeredComponent[compName]) {
                        this.registeredComponent[compName] = {
                            compType: compType,
                            component: component
                        }
                    } else {
                        throw COMP_REGISTER_ERROR.COMP_EXIST_ERROR;
                    }
                    
                } else {
                    throw COMP_REGISTER_ERROR.COMP_NOT_VALID_ERROR;
                }
            },
            mergeComponent(compName, compType, component) {
                if (typeof options.template === 'string' || typeof options.render === 'function') {
                    this.registeredComponent[compName] = {
                        compType: compType,
                        component: component
                    }
                } else {
                    throw COMP_REGISTER_ERROR.COMP_NOT_VALID_ERROR;
                }
            },
            getComponentType(compTag) {
                const compName = StringUtil.toCamel(compTag);
                return this.registeredComponent[compName] && this.registeredComponent[compName].compType ;
            },
            hasComponent(compTag) {
                const compName = StringUtil.toCamel(compTag);
                return new Boolean(this.registeredComponent[compName])
            },
            /**
             * 注册数据装换
             * @param {*} compName 
             * @param {*} adapter 
             * @param {*} action 
             */
            registerAdapter(compName,tag, action, adapter) {
                if (!this.registeredAdapter[compName]) {
                    this.registeredAdapter[compName] = {
                        adapter: adapter,
                        action: action,
                        tag: tag
                    }
                } else {
                    throw COMP_ADAPTER_REGISTER_ERROR.COMP_ADAPTER_EXIST_ERROR;
                }
            },
            registerAdapterObj({compName, tag, action, adapter}) {
                this.registerAdapter(compName,tag, action, adapter)
                debugger
                const json = {
                    "store": {
                      "book": [
                        {
                          "category": "reference",
                          "author": "Nigel Rees",
                          "title": "Sayings of the Century",
                          "price": 8.95
                        },
                        {
                          "category": "fiction",
                          "author": "Evelyn Waugh",
                          "title": "Sword of Honour",
                          "price": 12.99
                        },
                        {
                          "category": "fiction",
                          "author": "Herman Melville",
                          "title": "Moby Dick",
                          "isbn": "0-553-21311-3",
                          "price": 8.99
                        },
                        {
                          "category": "fiction",
                          "author": "J. R. R. Tolkien",
                          "title": "The Lord of the Rings",
                          "isbn": "0-395-19395-8",
                          "price": 22.99
                        }
                      ],
                      "bicycle": {
                        "color": "red",
                        "price": 19.95
                      }
                    }
                };
                const result = JSONPath('$..book[?(@.price=8.99)]', json);
                console.log(result);	
            },
            /**
             * 根据标记获取adapter数据转换器
             * @param {*} tag 标记获取adapter
             */
            getAdapterByTag(tag) {
                const adapterArray = Object.values(this.registeredAdapter);
                let tagAdapter = undefined;
                adapterArray.forEach(adapter => {
                    if (adapter.tag === tag) {
                        tagAdapter = adapter;
                    }
                });
                return adapter;
            },
            /**
             * 数据转换配置
             * @param {*} componentConfig 
             * @param {*} tag 
             */
            convertCompConfig(componentConfig, tag) {
                // 根据tag找到转换器，转换数据
                const adapter = this.getAdapterByTag(tag);
                return adapter(componentConfig);
            },
            /**
             * 执行注入事件
             */
            excuteAdapterEvent(compName, actionEvent) {
                const adapter = this.registeredAdapter[compName];
                if(adapter) {
                    return adapter.action(compName, actionEvent)
                }
            }
        },
        Vue.prototype.$formConfigRegister = {
            getConfigByUuid(uuid) {
                return undefined;
            },
            setConfigByUuid(uuid, key, value) {

            }
        }
    }
}