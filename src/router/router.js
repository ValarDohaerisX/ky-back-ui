import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载方式，当路由被访问的时候才加载对应组件
//登录页面
const login = resolve => require(['@/views/login'], resolve)
//后台主页面
const home = resolve => require(['@/views/home'], resolve);

const a = resolve => require(['@/views/manager/a'], resolve);

const managerTable = resolve => require(['@/views/manager/managerTable'], resolve);

const courseTable = resolve => require(['@/views/school/courseTable'], resolve);

const secondCourseTable = resolve => require(['@/views/school/secondCourseTable'], resolve);
// const managerTable = resolve => require(['@/views/manager/managerTable'], resolve);

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
          path: '/a',
          name: '待开发1',
          component: a
        }
      ]
    }
  ]
})

export default router
