/*
 * @Author: DevinShi
 * @Date: 2020-02-11 06:49:10
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-24 09:08:22
 * @Description: file content description
 */
export default {
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        labelCol: {
            default: function() {
                return {
                    xs: { span: 24 },
                    sm: { span: 5 },
                }
            }
        },
        wrapperCol: {
            default: function() {
                return {
                    xs: { span: 24 },
                    sm: { span: 12 },
                }
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
        },
        help: {
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
        },
        defaultValue: {
        },
        allowClear: {
            type: Boolean,
            default: false
        },
        multi: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array,
            default: function() {
                return [];
            }
        }
    }
}