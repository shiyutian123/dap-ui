/*
 * @Author: DevinShi
 * @Date: 2020-02-16 02:27:11
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-16 07:43:41
 * @Description: file content description
 */
import StringUtil from '../../utils/string.util';

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

export default {
    install (Vue, opts) {
        Vue.prototype.$baseFormRegister = {
            registeredComponent: {},
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
            }
        }
    }
}