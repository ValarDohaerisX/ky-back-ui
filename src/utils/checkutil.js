import validate from './validate'

const execCheck = (array) => {
  if (!array || (array.length === 0)) {
    return '校验规则为空'
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      const checkObj = array[i]
      if (!checkObj.method) {
        return '检验方法不正确'
      }
      if (!checkObj.params) {
        return '未传参'
      }
      const valiName = checkObj.method
      const errorMsg = checkObj.errorMsg ? checkObj.errorMsg : '输入不正确'
      const params = checkObj.params
      const result = validate[valiName].apply(window, params).toString()
      if (result === 'true' && i < (array.length - 1)) {
        continue
      } else if (result === 'true' && i === (array.length - 1)) {
        return 'true'
      } else {
        return errorMsg
      }
    } else {
      return '校验规则为空'
    }
  }
}
export default execCheck
