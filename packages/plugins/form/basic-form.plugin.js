/*
 * @Author: DevinShi
 * @Date: 2020-02-16 02:27:11
 * @LastEditors: your name
 * @LastEditTime: 2020-03-10 14:54:25
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
     COMP_NOT_VALID_ERROR: new CompError(-5002, '组件不是一个Vue的组件'),
 }

const COMP_ADAPTER_REGISTER_ERROR = {
    COMP_ADAPTER_EXIST_ERROR: new CompError(-6001, '组件适配器已经在表单中注册'),
    COMP_ACTION_UUID_EXIST_ERROR: new CompError(-6002, '组件事件监听对象不存在'),
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
            },
            /**
             * 根据标记获取adapter数据转换器
             * @param {*} tag 标记获取adapter
             */
            getAdapterByTag(tag) {
                const adapterArray = Object.values(this.registeredAdapter);
                let tagAdapter = undefined;
                let defaultAdapter = undefined;
                adapterArray.forEach(adapter => {
                    if (adapter.tag === tag) {
                        tagAdapter = adapter;
                    } else if (adapter.tag === 'DEFAULT') {
                        defaultAdapter = adapter;
                    }
                });
                if (!tagAdapter) {
                    tagAdapter = defaultAdapter;
                }
                return tagAdapter;
            },
            /**
             * 数据转换配置
             * @param {*} componentConfig 
             * @param {*} tag 
             */
            convertCompConfig(componentConfig, tag, globalFormInfo) {
                // 根据tag找到转换器，转换数据
                const adapter = this.getAdapterByTag(tag);
                if (adapter && adapter.adapter) {
                    return adapter.adapter(componentConfig, globalFormInfo);
                } else {
                    return componentConfig;
                }
            },
            /**
             * 执行注入事件
             */
            excuteAdapterEvent(compName, actionEvent, formConfig, globalFormInfo, formData) {
                const adapter = this.registeredAdapter[compName];
                const compInfo = this.getConfigByUuid(actionEvent.uuid, formConfig);
                if (adapter) {
                    return adapter.action(compInfo, actionEvent, globalFormInfo, formData, formConfig)
                }
            },
            getConfigByUuid(uuid, formConfig) {
                const resultArray = JSONPath(`$..[?(@.uuid === '${uuid}')]`, formConfig);
                if (resultArray && resultArray.length > 0) {
                    return resultArray[0];
                } else {
                    throw new COMP_ADAPTER_REGISTER_ERROR.COMP_ACTION_UUID_EXIST_ERROR
                }
            },
            getConfigsByCompName(compName, formConfig) {
                const resultArray = JSONPath(`$..[?(@.componentName === '${compName}')]`, formConfig);
                return resultArray;
            },
            setConfigByUuid(uuid, formConfig, key, value) {
                const itemConfig = this.getConfigByUuid(uuid, formConfig);
                if (itemConfig) {
                    itemConfig[key] = value ;
                }
            },
            getConfigById(id, formConfig) {
                const resultArray = JSONPath(`$..[?(@.id === '${id}')]`, formConfig);
                if (resultArray && resultArray.length > 0) {
                    return resultArray[0];
                } else {
                    throw new COMP_ADAPTER_REGISTER_ERROR.COMP_ACTION_UUID_EXIST_ERROR
                }
            },
            setConfigById(id, formConfig, key, value) {
                const itemConfig = this.getConfigById(id, formConfig);
                if (itemConfig) {
                    itemConfig[key] = value ;
                }
            },
            /**
             * 根据tag查出组件名称
             * @param {*} tag 
             */
            getCompNameByTag(tag) {
                const result = Object.entries(this.registeredAdapter).filter(item => item[1].tag === tag)[0];
                if (result) {
                    return result[0];
                }
                return result;
            }
        }
    }
}