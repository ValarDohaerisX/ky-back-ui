import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8088';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//管理员信息管理
export const loginMana = params => { return axios.post('/manager/login', params).then(res => res.data) }

export const registerMana = params => { return axios.post('/manager/register', params).then(res => res.data) }

export const allManaList = params => { return axios.get('/manager/allManaList', params).then(res => res.data) }

export const deleteManaInfo = params => { return axios.delete('/manager/deleteManaInfo?id='+params).then(res => res.data) }

export const confirmReg = params => { return axios.post('/manager/confirmReg',params).then(res => res.data) }

export const updateManaInfo = params => { return axios.post('/manager/updateManaInfo',params).then(res => res.data) }

//目标院校学科信息管理
// export const addFirstCourse = params => { return axios.post('/firstCourse/addFirstCourse', params).then(res => res.data) }

export const allFirstCourseList = params => { return axios.get('/firstCourse/allFirstCourseList',params).then(res => res.data) }

export const deleteFirstCourse = params => { return axios.delete('/firstCourse/deleteFirstCourse?id='+params).then(res => res.data) }

export const updateFirstCourse = params => { return axios.put('/firstCourse/updateFirstCourse',params).then(res => res.data) }

export const addFirstCourse = params => { return axios.post('/firstCourse/addFirstCourse',params).then(res => res.data) }
// let config = { headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' } }
// export const requestLogin = params => { return axios.post('/user/login', params, config).then(res => res.data) }
// export function login (jsonData) {
//   return request({
//   url: '/api/ky/manager/login',
//   method: 'post',
//     data: jsonData
//   })
// }
