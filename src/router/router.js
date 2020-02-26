import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载方式，当路由被访问的时候才加载对应组件
//登录页面
const login = resolve => require(['@/views/login'], resolve)
//后台主页面
const home = resolve => require(['@/views/home'], resolve);

const a = resolve => require(['@/views/manager/a'], resolve);

const managerTable = resolve => require(['@/views/manager/managerTable'], resolve);

const courseTable = resolve => require(['@/views/course/courseTable'], resolve);

const secondCourseTable = resolve => require(['@/views/course/secondCourseTable'], resolve);
// const managerTable = resolve => require(['@/views/manager/managerTable'], resolve);

const schoolBasicInfoTable = resolve => require(['@/views/school/schoolBasicInfoTable'], resolve);

const schoolDetailTable = resolve => require(['@/views/school/schoolDetailTable'], resolve);

const schoolBasicInfoTableTest = resolve => require(['@/views/school/schoolBasicInfoTableTest'], resolve);


const majorTable = resolve => require(['@/views/course/majorTable'], resolve);

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      path: '/',
      name: '登陆',
      component: login
    },
    {
      path: '/login',
      name: '登陆',
      component: login
    },
    {
      path: '/home/',
      name: 'homeLink',
      component: home,
      children: [
        {
          path: '/home/courseTable',
          name: '学科信息',
          component: courseTable,
        },
        {
          path: '/home/secondCourseTable',
          name: '学科信息',
          component: secondCourseTable,
        },
        {
          path: '/home/managerTable',
          name: '管理员信息',
          component: managerTable,
        },
        {
          path: '/home/schoolBasicInfo',
          name: '学校基本信息录入',
          component: schoolBasicInfoTable
        },
        {
          path: '/home/schoolBasicInfoTest',
          name: '学校基本信息录入测试',
          component: schoolBasicInfoTableTest
        },
        {
          path: '/home/schoolDetailInfo',
          name: '学校明细信息录入',
          component: schoolDetailTable,
          meta: {
             keepAlive: false, //此组件不需要被缓存
             isBack: false, //用于判断上一个页面是哪个
            }
        },
        {
          path: '/home/majorTable',
          name: '专业录入',
          component: majorTable
        }
      ]
    }
  ]
})

export default router
