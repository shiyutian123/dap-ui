/*
 * @Author: DevinShi
 * @Date: 2020-02-11 06:49:10
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-19 03:06:35
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
            type: Object
        },
        uuid: {
            type: String 
        },
        componentName: {
            type: String
        }
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