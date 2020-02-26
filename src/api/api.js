import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8088';

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//管理员信息管理

export const exitMana = params => { return axios.post('/manager/exit', params).then(res => res.data) }

export const loginMana = params => { return axios.post('/manager/login', params).then(res => res.data) }

export const registerMana = params => { return axios.post('/manager/register', params).then(res => res.data) }

export const allManaList = params => { return axios.get('/manager/allManaList', params).then(res => res.data) }

export const deleteManaInfo = params => { return axios.delete('/manager/deleteManaInfo?id='+params).then(res => res.data) }

export const confirmReg = params => { return axios.post('/manager/confirmReg',params).then(res => res.data) }

export const updateManaInfo = params => { return axios.post('/manager/updateManaInfo',params).then(res => res.data) }

//目标院校学科信息管理
// export const addFirstCourse = params => { return axios.post('/firstCourse/addFirstCourse', params).then(res => res.data) }

//一级学科管理
export const allFirstCourseList = params => { return axios.get('/firstCourse/allFirstCourseList',params).then(res => res.data) }

export const deleteFirstCourse = params => { return axios.delete('/firstCourse/deleteFirstCourse?id='+params).then(res => res.data) }

export const updateFirstCourse = params => { return axios.put('/firstCourse/updateFirstCourse',params).then(res => res.data) }

export const addFirstCourse = params => { return axios.post('/firstCourse/addFirstCourse',params).then(res => res.data) }


//二级学科管理
export const addSecondCourse = params => { return axios.post('/secondCourse/add',params).then(res => res.data) }

export const allSecondCourseList = params => { return axios.post('/secondCourse/getByFirstCode?firstCourseCode='+params).then(res => res.data) }

export const updateSecondCourse = params => { return axios.post('/secondCourse/update',params).then(res => res.data) }

export const deleteSecondCourse = params => { return axios.delete('/secondCourse/delete?id='+params).then(res => res.data) }

//专业信息管理
export const addMajor = params => { return axios.post('/major/add',params).then(res => res.data) }

export const getMajor = params => { return axios.post('/major/getMajor?firstCourseNo='+params.firstCourseNo+"&secondCourseNo="+params.secondCourseNo).then(res => res.data) }

export const updateMajor = params => { return axios.put('/major/updateMajor',params).then(res => res.data) }

export const deleteMajor = params => { return axios.delete('/major/deleteMajor?majorNo='+params).then(res => res.data) }

//目标目标院校信息管理
export const getCodeType = params => { return axios.post('/school/getCodeType?codeType='+params).then(res => res.data) }

export const addSchoolInfo = params => { return axios.post('/school/add',params).then(res => res.data) }

export const getAllSchoolList = params => { return axios.get('/school/getAll', params).then(res => res.data) }

export const getSchoolDetailInfo = params => { return axios.get('/school/getSchoolDetailInfo?schoolNo=' + params).then(res => res.data) }

export const setSchoolDetailInfo = params => { return axios.post('/school/setSchoolDetailInfo',params).then(res => res.data) }








// let config = { headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8' } }
// export const requestLogin = params => { return axios.post('/user/login', params, config).then(res => res.data) }
// export function login (jsonData) {
//   return request({
//   url: '/api/ky/manager/login',
//   method: 'post',
//     data: jsonData
//   })
// }
