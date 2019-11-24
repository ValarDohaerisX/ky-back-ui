import moment from 'moment'

/**
 * 数据格式化
 */
export function dataFormat(date) {
  return moment(date).format('YYYY-MM-DD')
}

/**
 * 通过身份证号的得到出生日期函数
 * 参数，输入的证件号码
 * 返回  出生日期
 */
export function getBirthdatByIdNo(idcode) {
  if (!idcode) {
    return ''
  }
  var birthDay = ''
  var year = ''
  var month = ''
  var day = ''
  if (idcode.length === 18) {
    year = idcode.substring(6, 10)
    month = idcode.substring(10, 12)
    day = idcode.substring(12, 14)
  } else if (idcode.length === 15) {
    year = '19' + idcode.substring(6, 8)
    month = idcode.substring(8, 10)
    day = idcode.substring(10, 12)
  }
  birthDay = year + '-' + month + '-' + day
  return birthDay
}
/**
 * 根据港澳居民居住证，获取出生日期
 */
export function getBirthdayByHongKongPermit(idNo) {
  if (!idNo) {
    return ''
  }
  const year = idNo.substring(6, 10)
  const month = idNo.substring(10, 12)
  const day = idNo.substring(12, 14)
  return year + '-' + month + '-' + day
}

/**
 * 根据身份证获取性别
 * @param iIdNo
 * @returns {string}
 */
export function getSexByIDNo(iIdNo) {
  let tSex = ''
  let tmpInt = 0
  if (iIdNo.length === 15) {
    tmpInt = parseInt(iIdNo.substring(14))
  }
  if (iIdNo.length === 18) {
    tmpInt = parseInt(iIdNo.substring(16, 17))
  }
  tmpInt = tmpInt % 2
  if (tmpInt === 0) {
    tSex = '1'
  } else {
    tSex = '0'
  }
  return tSex
}

/**
 * 计算投保人年龄，判定是否异常
 * 正常返回true，异常返回false
 */
export function CheckAge(birthday) {
  const i = calAge(birthday)
  if (i > 150 || i < 0) {
    return false
  } else {
    return true
  }
}

/**
 * 用出生日期计算年龄，目前不支持yyyymmdd模式
 * 参数，出生日期yy－MM－dd
 * 返回  年龄
 */
export function calAge(bir) {
  if (!bir) {
    return ''
  }
  const birthday = new Date(bir.replace(/-/g, '\/'))
  const d = new Date()
  const age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() === birthday.getMonth() && d.getDate() < birthday.getDate()) ? 1 : 0)
  return age
}

/**
 * 计算投保人年龄，判定是否异常
 * 正常返回true，异常返回false
 */
export function CheckAges(birthday) {
  const i = calAges(birthday)
  if (i > 150 || i < 0) {
    return false
  } else {
    return true
  }
}

/**
 * 用出生日期计算年龄，目前不支持yyyymmdd模式
 * 参数，出生日期yy－MM－dd
 * @bir 用户出生日期
 * @polApplyDate 用户投保日期
 * 投保日期减去用户的出生日期等于用户年龄
 * 返回  年龄
 */
export function calAges(bir, polApplyDate) {
  if (!bir || !polApplyDate) {
    return ''
  }
  const birthday = new Date(bir.replace(/-/g, '\/'))
  const d = new Date(polApplyDate.replace(/-/g, '\/'))
  const age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() === birthday.getMonth() && d.getDate() < birthday.getDate()) ? 1 : 0)
  return age
}

/**
 * 去掉空格，所有的
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
export function trimAllSpace(str) {
  if (!str) {
    return ''
  }
  return str.toString().replace(/\s/g, '')
}

/**
 * 去掉左右空格
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
export function trimLRSpace(str) {
  if (!str) {
    return ''
  }
  return str.toString().replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 计算两个日期相差天数
 * @type {[type]}
 */
export const diffDays = (s1, data) => {
  if (!s1) {
    return ''
  }
  const datestr = s1.toString().replace(/-/g, '/')
  s1 = new Date(datestr)
  let s2
  if (data) {
    s2 = new Date(data.replace(/-/g, '\/'))
  } else {
    s2 = new Date()
  }
  const days = s2.getTime() - s1.getTime()
  const time = parseInt(days / (1000 * 60 * 60 * 24))
  return time
}
/**
 * 获取据某date据今天为止的天数
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const getDays = (data) => {
  if (!data) {
    return ''
  }
  let nowDay = new Date()
  nowDay = new Date(nowDay.getFullYear(), nowDay.getMonth(), nowDay.getDate())
  var dataTs = data.split('-')
  var startDate = new Date(parseInt(dataTs[0], 10), parseInt(dataTs[1], 10) - 1, parseInt(dataTs[2], 10))
  var days = parseInt((startDate.getTime() - nowDay.getTime()) / (1000 * 60 * 60 * 24))
  return days
}

/**
 * 计算两个日期的差,返回差的月数(M)或天数(D) (其中天数除2.29这一天)
 * <p><b>Example: </b><p>
 * <p>dateDiff("2002-10-1", "2002-10-3", "D") returns "2"<p>
 * <p>dateDiff("2002-1-1", "2002-10-3", "M") returns "9"<p>
 * @param dateStart 减日期
 * @param dateEnd 被减日期
 * @param MD 标记，“M”为要求返回差的月数；“D”为要求返回差的天数
 * @return 返回两个日期差的月数(M)或天数(D)
 */
export const dateDiff = (dateStart, dateEnd, MD) => {
  if (dateStart === '' || dateEnd === '') {
    return false
  }
  if (typeof (dateStart) === 'string') {
    dateStart = getDate(dateStart)
  }

  if (typeof (dateEnd) === 'string') {
    dateEnd = getDate(dateEnd)
  }
  if (MD === 'D') { // 按天计算差
    var diffDay = (dateEnd.valueOf() - dateStart.valueOf()) / 86400000
    return diffDay
  } else { // 按月计算差
    var endD = dateEnd.getDate()
    var endM = dateEnd.getMonth()
    var endY = dateEnd.getFullYear()
    var startD = dateStart.getDate()
    var startM = dateStart.getMonth()
    var startY = dateStart.getFullYear()

    if (endD >= startD) {
      return (endY - startY) * 12 + (endM - startM) + 1
    } else {
      return (endY - startY) * 12 + (endM - startM)
    }
  }
}
// 获取当前日期
export const getNowDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)
  const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
  const dateStr = year + '-' + month + '-' + day
  return dateStr
}
// 将yyyyMMdd格式的日期变为yyyy-MM-dd
export const getFormatDate = (dataStr) => {
  if (!dataStr) {
    return ''
  }
  dataStr = trimAllSpace(dataStr)
  if (dataStr.length === 8) {
    dataStr = dataStr.substring(0, 4) + '-' + dataStr.substring(4, 6) + '-' + dataStr.substring(6, 8)
  }
  return dataStr
}
/**
 * 获取日期对象
 * @param strDate 日期字符串
 * @param splitOp 分割符
 * @return 返回日期对象
 *
 */
function getDate(strDate, splitOp) {
  if (splitOp == null) splitOp = '-'
  var arrDate = strDate.split(splitOp)
  return new Date(arrDate[0], arrDate[1] - 1, arrDate[2]) // YangYL修改BUG,月份应当是0~11,而非1~12
}

/**
* 计算N年后,YYYY-MM-DD
* startdate：为开始时间，格式YYYY-MM-DD
* nextYear：为间隔年月，如1表示一年后，2表示两年后
*/
export function getAfterNYear(startdate, nextYear) {
  var insuranceDate = startdate.replace(/-/g, '') // 把时间格式-替换成空字符串
  var expriedYear = parseInt(insuranceDate.substring(0, 4)) + nextYear
  var expriedMonth = insuranceDate.substring(4, 6)
  var expriedDay = insuranceDate.substring(6)
  // 考虑二月份场景，若N年后的二月份日期大于该年的二月份的最后一天，则取该年二月份最后一天
  if (expriedMonth === '02' || expriedMonth === 2) {
    const monthEndDate = new Date(expriedYear, expriedMonth, 0).getDate()
    if (parseInt(expriedDay) > monthEndDate) { // 为月底时间
      // 取两年后的二月份最后一天
      expriedDay = monthEndDate
    }
  }
  // 日期计算处理
  var totalDate = expriedYear + '-' + expriedMonth + '-' + expriedDay
  var birthdayTiem = Date.parse(totalDate)
  var effectiveDate = birthdayTiem - 1000 * 60 * 60 * 24
  return effectiveDate
}
