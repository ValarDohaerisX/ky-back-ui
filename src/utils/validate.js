import { trimAllSpace } from './common'
const wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
const valideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 身份证验证位值.10代表X
/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
const isTrueValidateCodeBy18IdCard = (a_idCard) => {
  let sum = 0 // 声明加权求和变量
  if (a_idCard[17].toLowerCase() === 'x') {
    a_idCard[17] = 10 // 将最后位为x的验证码替换为10方便后续操作
  }
  for (var i = 0; i < 17; i++) {
    sum += wi[i] * a_idCard[i] // 加权求和
  }
  const valCodePosition = sum % 11 // 得到验证码所位置
  if (parseInt(a_idCard[17]) === valideCode[valCodePosition]) {
    return true
  } else {
    return false
  }
}
/**
* 验证18位数身份证号码中的生日是否是有效生日
* @param idCard 18位书身份证字符串
* @return
*/
const isValidityBrithBy18IdCard = (idCard18) => {
  const year = idCard18.substring(6, 10)
  const month = idCard18.substring(10, 12)
  const day = idCard18.substring(12, 14)
  const temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
  // 这里用getFullYear()获取年份，避免千年虫问题
  if (temp_date.getFullYear() !== parseFloat(year) ||
        temp_date.getMonth() !== parseFloat(month) - 1 ||
        temp_date.getDate() !== parseFloat(day)) {
    return false
  } else {
    return true
  }
}
/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
const isValidityBrithBy15IdCard = (idCard15) => {
  const year = idCard15.substring(6, 8)
  const month = idCard15.substring(8, 10)
  const day = idCard15.substring(10, 12)
  const temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day))
  // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
  if (temp_date.getYear() !== parseFloat(year) ||
            temp_date.getMonth() !== parseFloat(month) - 1 ||
            temp_date.getDate() !== parseFloat(day)) {
    return false
  } else {
    return true
  }
}
/**
* 校验身份证号是否正确
* @param  {[type]} idCard [description]
* @return {[type]}        [description]
*/
const idCardValidate = (idCard) => {
  idCard = idCard.replace(/\s/g, '') // 去掉字符串头尾空格
  if (idCard.length === 15) {
    return isValidityBrithBy15IdCard(idCard) // 进行15位身份证的验证
  } else if (idCard.length === 18) {
    var a_idCard = idCard.split('') // 得到身份证数组
    if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) { // 进行18位身份证的基本验证和第18位的验证
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}
const luhmCheck = (bankno) => {
  const lastNum = bankno.substr(bankno.length - 1, 1) // 取出最后一位（与luhm进行比较）
  const first15Num = bankno.substr(0, bankno.length - 1) // 前15或18位
  const newArr = []
  for (var i = first15Num.length - 1; i > -1; i--) { // 前15或18位倒序存进数组
    newArr.push(first15Num.substr(i, 1))
  }
  const arrJiShu = [] // 奇数位*2的积 <9
  const arrJiShu2 = [] // 奇数位*2的积 >9
  const arrOuShu = [] // 偶数位数组
  for (var j = 0; j < newArr.length; j++) {
    if ((j + 1) % 2 === 1) { // 奇数位
      if (parseInt(newArr[j]) * 2 < 9) {
        arrJiShu.push(parseInt(newArr[j]) * 2)
      } else {
        arrJiShu2.push(parseInt(newArr[j]) * 2)
      }
    } else { // 偶数位
      arrOuShu.push(newArr[j])
    }
  }
  const jishu_child1 = [] // 奇数位*2 >9 的分割之后的数组个位数
  const jishu_child2 = [] // 奇数位*2 >9 的分割之后的数组十位数
  for (var h = 0; h < arrJiShu2.length; h++) {
    jishu_child1.push(parseInt(arrJiShu2[h]) % 10)
    jishu_child2.push(parseInt(arrJiShu2[h]) / 10)
  }
  let sumJiShu = 0 // 奇数位*2 < 9 的数组之和
  let sumOuShu = 0 // 偶数位数组之和
  let sumJiShuChild1 = 0 // 奇数位*2 >9 的分割之后的数组个位数之和
  let sumJiShuChild2 = 0 // 奇数位*2 >9 的分割之后的数组十位数之和
  let sumTotal = 0
  for (let m = 0; m < arrJiShu.length; m++) {
    sumJiShu = sumJiShu + parseInt(arrJiShu[m])
  }
  for (let n = 0; n < arrOuShu.length; n++) {
    sumOuShu = sumOuShu + parseInt(arrOuShu[n])
  }
  for (let p = 0; p < jishu_child1.length; p++) {
    sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p])
    sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p])
  }
  // 计算总和
  sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2)
  // 计算Luhm值
  var k = parseInt(sumTotal) % 10 === 0 ? 10 : parseInt(sumTotal) % 10
  var luhm = 10 - k
  if (lastNum === luhm) {
    return true
  } else {
    return false
  }
}
/**
 * 校验银行账户是否正确
 * @param {银行账户} bankno
 */
const checkBankNo = (bankno) => {
  if (!bankno) {
    return false
  }
  if (bankno.length < 16 || bankno.length > 19) {
    return false
  }
  var num = /^\d*$/ // 全数字
  if (!num.exec(bankno)) {
    return false
  }
  // 开头6位
  var strBin = '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'
  if (strBin.indexOf(bankno.substring(0, 2)) === -1) {
    return false
  }
  // Luhm校验（新）
  if (!luhmCheck(bankno)) {
    return false
  }
  return true
}
const RegExp = {
  Mobile: /^1\d{10}$/, // 手机
  Email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,5}$/, // 邮箱
  TelePhone: /^0\d{2,3}-?\d{7,8}$/, // 电话
  PostCode: /^[0-9]{6}$/, // 邮编
  Plate: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/, // 车牌号
  Flight: /^[\w]{6}$/, // 航班号
  Floating: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/,
  PInteger: /(^[1-9][0-9]$|^[1-9]$|^100$)/, // 1-100的正整数
  UrlRegex: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/, // 合法URI
  LowerCase: /^[a-z]+$/, // 小写字母
  UpperCase: /^[A-Z]+$/, // 大写字母
  Alphabets: /^[A-Za-z]+$/, // 大小写字母
  PolicyNum: /^(A\d{14})$/,
  Date: /^(\d{4})-(\d{2})-(\d{2})$/,
  Integer: /^[1-9]\d*$/, // 正整数
  GResidencePermit: /^(810000|820000)[\d]{4}[\d]{1,2}[\d]{1,2}([\d]|[a-zA-Z]){4}$/, // G-港澳居住证:("810000/820000+出生日期+4位（数字或字母）"
  HResidencePermit: /^(830000)[\d]{4}[\d]{1,2}[\d]{1,2}([\d]|[a-zA-Z]){4}$/, // H-台湾居民居住证:("830000+出生日期+4位（数字或字母）"
  IResidencePermit: /^(([\d]|[a-zA-Z]){15}|([\d]|[a-zA-Z]){18})$/, // I-外国人永久居留证:("15或18位数字或字母"
  EPermitTaiWan: /^[\d]{8}$/, // E-台湾居民来往大陆通行证:("8位数字"
  FPermitG: /^[a-zA-Z]{1}[\d]{8}$/, // F-中国居民来往港澳台通行证:("一位字母+8位数字"
  BPermitG: /^(H|M)[\d]{8}$/ // B-港澳居民来往大陆通行证
}
const validate = {
  // 校验正则
  regular(value, regName) {
    if (!value || !regName) {
      return false
    }
    return RegExp[regName].test(value)
  },
  isDate(value) {
    if (!value) {
      return false
    }
    if (!RegExp['Date'].test(value)) {
      return false
    }
    const dateList = value.split('-')
    const d = new Date(parseInt(dateList[0], 10), parseInt(dateList[1], 10) - 1, parseInt(dateList[2], 10))
    return (d.getFullYear() === parseInt(dateList[0]) && d.getMonth() + 1 === parseInt(dateList[1]) && d.getDate()) === parseInt(dateList[2])
  },
  // 是否是空
  isNotEmpty(value) {
    if (!value) {
      return false
    }
    value = trimAllSpace(value)
    if (value !== 'null' && value !== 'undefined' && value.length > 0) {
      return true
    } else {
      return false
    }
  },
  // 判断身份证是否正确
  isIdCard(cardNo) {
    return idCardValidate(cardNo)
  },
  // 是否是银行账号
  isBankNo(bankNo) {
    return checkBankNo(bankNo)
  },
  // 比较两个时间，dataEnd是否大于dataStart，若是大于，返回true，否则，返回false
  // 时间格式为yyyy-MM-dd,例如2018-12-12、2017-05-06
  compareTime(dataStart, dataEnd) {
    if (!dataStart || !dataEnd) {
      return false
    }
    const startArr = dataStart.split('-')
    const sDate = new Date(parseInt(startArr[0], 10), parseInt(startArr[1], 10) - 1, parseInt(startArr[2], 10))
    const endArr = dataEnd.split('-')
    const eDate = new Date(parseInt(endArr[0], 10), parseInt(endArr[1], 10) - 1, parseInt(endArr[2], 10))
    return eDate > sDate
  },
  // 比较两个时间，dataEnd是否大于dataStart，若是大于，返回true，否则，返回false
  // 时间格式为yyyy-MM-dd,例如2018-12-12、2017-05-06
  compareTimeIsEqual(dataStart, dataEnd) {
    if (!dataStart || !dataEnd) {
      return false
    }
    const startArr = dataStart.split('-')
    const sDate = new Date(parseInt(startArr[0], 10), parseInt(startArr[1], 10) - 1, parseInt(startArr[2], 10)).getTime()
    const endArr = dataEnd.split('-')
    const eDate = new Date(parseInt(endArr[0], 10), parseInt(endArr[1], 10) - 1, parseInt(endArr[2], 10)).getTime()
    return eDate === sDate
  },
  // datastr是否大于现在时间，若是大于返回true，否则，返回false
  // dataStr的格式为yyyy-MM-dd,例如2018-12-12、2017-05-06
  // flag,是大于或者小于的标志位 true：传入的时间是否大于当前日期；false:传入的时间是否小于当前日期
  compareWithNow(dataStr, flag) {
    if (!dataStr) {
      return false
    }
    const dataArr = dataStr.split('-')
    const data = new Date(parseInt(dataArr[0], 10), parseInt(dataArr[1], 10) - 1, parseInt(dataArr[2], 10)).getTime()
    const nowDate = new Date().getTime()
    if (flag) {
      return data > nowDate
    } else {
      return data < nowDate
    }
  }
}
export default validate
