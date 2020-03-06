/*
 * @Author: DevinShi
 * @Date: 2020-02-16 03:43:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-04 10:19:34
 * @Description: file content description
 */
export default {
    toCenterLine(str) {
        var temp = str.replace(/[A-Z]/g, function (match) {	
            return "-" + match.toLowerCase();
          });
          if(temp.slice(0,1) === '-'){ //如果首字母是大写，执行replace时会多一个_，这里需要去掉
              temp = temp.slice(1);
          }
        return temp;
    },
    toCamel(str) {
        if (str) {
            return str.replace(/(^|-)(\w)/g, function ($0, $1, $2) {
                return $2.toUpperCase();
            });
        }
        return str;
    }
}