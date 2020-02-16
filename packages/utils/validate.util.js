/*
 * @Author: DevinShi
 * @Date: 2020-02-16 03:43:01
 * @LastEditors: DevinShi
 * @LastEditTime: 2020-02-16 13:42:49
 * @Description: file content description
 */
export default {
    mergeValidate(validates) {
        const totalValidate = {
            currentFormData: {},
            $invalid: false,
            $dirty: false,
            $anyDirty: false,
            $error: false,
            $anyError: false,
            $pending: false
        };
        if (validates && validates.length > 0) {
            validates.forEach(childValidate => {
                totalValidate.currentFormData = {
                    ...totalValidate.currentFormData,
                    ...childValidate.currentFormData
                };
                totalValidate.$invalid = totalValidate.$invalid || childValidate.$invalid;
                totalValidate.$dirty = totalValidate.$dirty || childValidate.$dirty;
                totalValidate.$anyDirty = totalValidate.$anyDirty || childValidate.$anyDirty;
                totalValidate.$error = totalValidate.$error || childValidate.$error;
                totalValidate.$anyError = totalValidate.$anyError || childValidate.$anyError;
                totalValidate.$pending = totalValidate.$pending || childValidate.$pending;
            })
        }
        return totalValidate;
    },
}