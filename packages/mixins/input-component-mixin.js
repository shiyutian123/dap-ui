/*
 * @Author: DevinShi
 * @Date: 2020-02-11 06:49:10
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-17 10:57:16
 * @Description: file content description
 */
export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        labelCol: {
            type: Object,
            default: {
                xs: { span: 24 },
                sm: { span: 5 },
            }
        },
        wrapperCol: {
            type: Object,
            default: {
                xs: { span: 24 },
                sm: { span: 12 },
            }
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        colon: {
            type: Boolean,
            default: true,
        },
        extra: {
            type: Object, // String | slot
        },
        help: {
            type: Object, // String | slot
        },
        hasFeedback: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        validateStatus: {
            type: String,  // 'success' 'warning' 'error' 'validating'
        },
        placeholder: {
            type: String
        },
        value: {
            type: String
        }
    }
}