/*
 * @Author: DevinShi
 * @Date: 2020-02-11 06:49:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-27 15:36:45
 * @Description: file content description
 */
export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {     
        }, // 保存时的值，明细页面从process/documentDetail接口获取的值
        customRequest: {
        }, // 自定义上传属性，类型为方法
        remove: {}, // 自定义删除属性，类型为方法，返回值为一个Promise，或true/false，此处为Promise
        fileCodeList: {}, // 用于监听事件，属性type为类型（delete表示删除成功事件、getValue从/process/form/getAttachmentInfo接口里获取到数据时触发事件），code为传过来的值
        documentId: {} // documentId 用于判断是否新建
    }   
}