import Vue from 'vue'
<template>
  <div class="AllArea">
    <!--margin-bottom: 20px;margin-left: 10px;-->
    <!--style="background-color: rgb(238, 241, 246)"-->
    <!--style="height: 500px;"-->
    <el-container style="height: 590px">
      <el-scrollbar>
        <el-aside width="230px">
          <el-radio-group v-model="isCollapse" style="margin: 2px 0px 5px 5px">
            <el-radio-button :label="true">收起</el-radio-button>
            <el-radio-button :label="false">展开</el-radio-button>
          </el-radio-group>

          <el-menu
            default-active="activeIndex"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            style="margin: 5px 0px 0px 5px"
            :default-openeds="['1','2']"
            router
          >
            <!-- 目录
            <el-submenu :index="item.key" v-for="item in menuData" :key="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </template>
            <el-menu-item-group>-->
            <!-- 子菜单 -->
            <!-- <el-menu-item
                  v-for="childItem in item.children"
                  :key="childItem.id"
                  :index="item.key"
                  @click="navRouter(childItem.path)"
                >{{childItem.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            </el-menu>-->

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">目标院校信息管理</span>
              </template>
              <el-menu-item index="/home/managerTable">管理员信息</el-menu-item>
              <el-menu-item-group>
                <span slot="title">目标院校基本信息</span>
                <el-menu-item index="/home/schoolBasicInfo">基本信息录入</el-menu-item>
                <el-menu-item index="/home/schoolDetailInfo">明细信息处理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title">学科管理</span>
                <el-menu-item index="/home/courseTable">一级学科录入</el-menu-item>
                <el-menu-item index="/home/secondCourseTable">二级学科录入</el-menu-item>
                <el-menu-item index="/home/majorTable">专业录入</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title">专业管理</span>

                <el-menu-item index="1-2">基本信息处理</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="学校图片管理">
                <el-menu-item index="1-3">学校图片管理1</el-menu-item>
                <el-menu-item index="1-4">学校图片管理2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">视频管理</span>
              </template>
              <el-menu-item-group>
                <span slot="title">目标院校宣传视频</span>
                <el-menu-item index="2-1">目标院校宣传视频审核</el-menu-item>
                <el-menu-item index="2-2">目标院校宣传视频录入</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="学习视频">
                <el-menu-item index="2-3">学习视频审核</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item-group>
                <span slot="title">基本信息处理</span>
                <el-menu-item index="3-1">基本信息查询</el-menu-item>
                <el-menu-item index="3-2">待开发</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title>
                <el-menu-item index="3-3">待开发</el-menu-item>
                <el-menu-item index="3-4">待开发</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">管理员管理</span>
              </template>
              <el-menu-item-group>
                <span slot="title">基本信息查询</span>
                <!-- <el-menu-item index="managerTable">111</el-menu-item> -->
                <el-menu-item index="/home/managerTable">管理员信息</el-menu-item>
                <el-menu-item index="a">待开发11</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="学校图片管理">
                <el-menu-item index="4-4">待开发</el-menu-item>
                <el-menu-item index="4-5">待开发</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </el-scrollbar>
      <el-container class="workingArea">
        <el-header style="text-align: left; font-size: 18px;height: 53px; display: flex; justify-content: space-between">
          <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
              <!-- <span
              style="color:#606266;font-weight:bold"
            >欢迎你:{{name}},{{manaPemission}}</span> -->
            </el-dropdown>
          <span text-align="right"><el-button type="primary" icon="el-icon-s-home" @click.native.prevent="exitButton">退出登录</el-button></span>
            
          <!-- <el-container>
            <el-aside><el-button type="primary" icon="el-icon-s-home">退出登录</el-button></el-aside>
             <el-main right><el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span
              style="color:#606266;font-weight:bold"
            >用户:{{this.$route.params.name}},{{this.$route.params.manaPemission}}</span></el-main>
            </el-container> -->

          <!-- <div align="left" style="margin-bottom:5px">
            
            
          </div> -->

          <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="../">返回上一级</a>
            </el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>-->
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { exitMana } from "../api/api";
export default {
  data() {
    return {
      // isCollapse: true,
      isCollapse: '',
      // tableData: Array(20).fill(item),
      menuData: [],
      user: [{}],
      name:"",
      manaPemission:""
    };
    rules: {
    }
  },
  created(){
    this.name = this.$route.params.name;
    this.manaPemission = this.$route.params.manaPemission;
  },
  mounted() {
    // activeIndex() {
    // return this.$route.path.replace("/", "");
    // }
  },
  methods: {
    exitButton(){
      var userName = this.$route.params.name;
      console.log("username:"+userName);
      var params={"name":userName};
      exitMana(params).then(result => {
            var code = result.returnCode.code;
            var desc = result.returnCode.desc;
            var body = result.body;
            console.log("result-->" + result);
            if (code == 1000) {
              this.$message({
                showClose: true,
                type: "success",
                message: "退出成功!"
              });
              this.$router.push("/login");
            } else {
              this.$message({
                showClose: true,
                type: "warning",
                message: "退出失败，请重试"
              });
            }
          });
    },
    goBack() {
      this.$router.push("/home/courseTable");
      this.$message({
        showClose: true,
        type: "success",
        message: "111"
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-aside {
  color: #333;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.workingArea {
  background-color: whitesmoke;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-scrollbar__thumb {
  background-color: darkorchid;
  border-radius: 10px;
}
</style>
