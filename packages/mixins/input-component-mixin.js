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
        transValue: {
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
        },
        colSpan: {
            type: Number,
            default: 1
        },
        documentId: {}
    },
    created() {
        debugger
        if (this.defaultValue && this.defaultValue.length > 0) {
          this.$formEventEmit('change', this.defaultValue);
        }
    },
}