/*
 * @Author: DevinShi
 * @Date: 2020-02-11 06:49:10
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-16 13:09:03
 * @Description: file content description
 */
export default {
    props: {
        formData: {
            type: Object,
        },
        layoutConfig: {
            type: Array,
            default: []
        },
        validate: {
            type: Object,
        }
    }
}