/*
 * @Author: your name
 * @Date: 2020-03-05 16:44:06
 * @LastEditTime: 2020-03-05 17:14:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /dap-vue-ui/packages/validates/table.validate.js
 */
const required = (param) =>
    (value) => {
        if (param && param.columnSet && value) {
            const requiredColumns = param.columnSet.filter(item => item.required);
            if (requiredColumns.length > 0) {
                let result = true;
                for (const column of requiredColumns) {
                    if (!result) {
                        break;
                    }
                    for (const data of value) {
                        result = typeof data[column.dataCode] !== 'undefined' && data[column.dataCode] !== null && data[column.dataCode].trim() !== '';
                        if (!result) {
                            break;
                        }
                    }
                }
                return result;
            } else {
                return true;
            }
        }
        return true;
    }
const tableValidater = {
    required
};

export default tableValidater;
