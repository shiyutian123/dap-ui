import { helpers } from 'vuelidate/lib/validators'
const phone = helpers.regex('phone', /^1[3456789]\d{9}$/)
export default phone;