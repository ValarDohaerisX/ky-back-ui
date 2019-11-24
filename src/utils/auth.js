const TokenKey = 'Admin-Token'
const RefreshTokenKey = 'Admin-Refresh-Token'
const riskMap = 'riskMap'
const comcodeKey = 'comcode'
const userNameKey = 'userName'
export function getToken() {
  return window.sessionStorage.getItem(TokenKey)
}

export function getRefreshToken() {
  return window.sessionStorage.getItem(RefreshTokenKey)
}

export function getComcode() {
  return window.sessionStorage.getItem(comcodeKey)
}

export function setComcode(comcode) {
  return window.sessionStorage.setItem(comcodeKey, comcode)
}

export function getUserName() {
  return window.sessionStorage.getItem(userNameKey)
}

export function setUserName(userName) {
  return window.sessionStorage.setItem(userNameKey, userName)
}

export function setToken(token) {
  return window.sessionStorage.setItem(TokenKey, token)
}

export function setRefreshToken(token) {
  return window.sessionStorage.setItem(RefreshTokenKey, token)
}

export function removeToken() {
  return window.sessionStorage.removeItem(TokenKey)
}

export function removeRefreshToken() {
  return window.sessionStorage.removeItem(RefreshTokenKey)
}

export function getRiskMap() {
  return window.sessionStorage.getItem(riskMap)
}

export function setRiskMap(riskmap) {
  window.sessionStorage.setItem(riskMap, riskmap)
}
