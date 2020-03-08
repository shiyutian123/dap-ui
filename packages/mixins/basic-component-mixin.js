/*
 * @Author: DevinShi
 * @Date: 2020-02-11 06:49:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-02-25 17:39:48
 * @Description: file content description
 */
export default {
    props: {
        label: {
            type: String
        },
        labelColor: {
            type: String
        },
        extraProp: {
            type: Object,
            default: function() {
                return {}
            }
        },
        uuid: {
            type: String 
        },
        componentName: {
            type: String
        },
        colSpan: {
            type: Number
        },
        defaultValue: {
        },
    },
    methods: {
        $formEventEmit(eventName, event) {     
            this.$emit(eventName, event);
            this.$emit('formEventEmit', {
                eventName: eventName,
                uuid: this.uuid,
                componentName: this.componentName,
                event: event
            });
        }
    }
}