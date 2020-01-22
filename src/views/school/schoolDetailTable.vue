import Vue from 'vue'
<template>
  <div>
    <!-- <template>
      <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
    </template> -->
    <el-tag effect="dark">{{schoolDetailForm.schoolName}}</el-tag>
    <el-form :model="describeForm" :inline="true" ref="describeForm" :rules="rules">
      <!-- 学校简介 -->
      <el-divider content-position="left">学校简介</el-divider>
      <el-form-item prop="describeForm.infoContent">
      <el-input
        v-model="describeForm.infoContent"
        autocomplete="off"
        type="textarea"
        :rows="2"
        clearable
        placeholder="请输入内容"
        show-word-limit
      ></el-input>
      </el-form-item>
    </el-form>
    <el-form>
      <!-- 院校公告 -->
      <el-divider content-position="left">院校公告</el-divider>
      <el-divider content-position="right">
        <el-button type="primary" size="medium" @click.native.prevent="addTableItem('title')">+ 添加</el-button>
      </el-divider>
      <!-- 遍历表格 -->
      
        <el-table :data="titleForm" max-height="350px" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column  label="序号" type="index" width="94"></el-table-column>
          <el-table-column  label="公告标题"  text-algin="center" width="224">
            <el-form-item prop="titleForm.infoTitle">
              <el-input v-model="titleForm.infoTitle" placeholder="公告标题"></el-input>
            </el-form-item>

          </el-table-column>
          <el-table-column  label="公告内容" width="640">
            <el-input
              v-model="titleForm.infoContent"
              style="font-style:weight"
              :rows="2"
              type="textarea"
              placeholder="公告内容"
            ></el-input>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click.native.prevent="removeTableItem(scope.$index,scope.row,'title')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      <!-- 招生院系管理 -->
      <el-divider content-position="left">招生院系</el-divider>
      <el-divider content-position="right">
        <el-button
          type="primary"
          size="medium"
          @click.native.prevent="addTableItem('department')"
        >+ 添加</el-button>
      </el-divider>
      <!-- 遍历表格 -->
      <el-form-item
        v-for="(department, index) in schoolDetailForm.departmentForm"
        :key="department.key"
        :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
      >
        <el-table :data="departmentForm" max-height="350px" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop label="序号" type="index" width="60"></el-table-column>

          <el-table-column prop label="招生院系" text-algin="center" width="220">
            <el-table-column prop label="院系号" text-algin="center" width="100">
              <el-input v-model="schoolDetailForm.departmentForm.departmentNo" placeholder="院系号"></el-input>
            </el-table-column>
            <el-table-column prop label="院系名称" text-algin="center" width="130">
              <el-input v-model="schoolDetailForm.departmentForm.departmentName" placeholder="院系名称"></el-input>
            </el-table-column>
          </el-table-column>

          <el-table-column prop="address" label="招生专业" width="620" text-align="center">
            <el-table-column prop label="专业代码" text-algin="center" width="224">
              <el-input v-model="schoolDetailForm.departmentForm.infoTitle" placeholder="专业代码"></el-input>
            </el-table-column>
            <el-table-column prop label="专业名称" text-algin="center" width="224">
              <el-input v-model="schoolDetailForm.departmentForm.infoTitle" placeholder="专业名称"></el-input>
            </el-table-column>
            <el-table-column prop label="专业类型" text-algin="center" width="214">
              <el-input v-model="schoolDetailForm.departmentForm.infoTitle" placeholder="专业类型"></el-input>
            </el-table-column>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click.native.prevent="removeTableItem(scope.$index,scope.row,'department')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <!-- 招生简章 -->
      <el-divider content-position="left">招生简章</el-divider>
      <el-divider content-position="right">
        <el-button
          type="primary"
          size="medium"
          @click.native.prevent="addTableItem('getStudent')"
        >+ 添加</el-button>
      </el-divider>
      <!-- 遍历表格 -->
      <el-form-item
        v-for="(title, index) in schoolDetailForm.getStudentForm"
        :key="title.key"
        
        :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
      >
        <el-table :data="getStudentForm" max-height="350px" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop label="序号" type="index" width="94"></el-table-column>
          <el-table-column prop label="简章标题" text-algin="center" width="224">
            <el-input v-model="schoolDetailForm.getStudentForm.infoTitle" placeholder="简章标题"></el-input>
          </el-table-column>
          <el-table-column prop="address" label="简章内容" width="640">
            <el-input
              v-model="schoolDetailForm.getStudentForm.infoContent"
              style="font-style:weight"
              :rows="2"
              type="textarea"
              placeholder="简章内容"
            ></el-input>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click.native.prevent="removeTableItem(scope.$index,scope.row,'getStudent')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- 调剂信息 -->
      <el-divider content-position="left">调剂信息</el-divider>
      <el-divider content-position="right">
        <el-button
          type="primary"
          size="medium"
          @click.native.prevent="addTableItem('dispensing')"
        >+ 添加</el-button>
      </el-divider>
      <!-- 遍历表格 -->
      <el-form-item
        v-for="(title, index) in schoolDetailForm.dispensingForm"
        :key="title.key"
        :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
      >
        <el-table :data="dispensingForm" max-height="350px" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop label="序号" type="index" width="94"></el-table-column>
          <el-table-column prop label="信息标题" text-algin="center" width="224">
            <el-input v-model="schoolDetailForm.dispensingForm.infoTitle" placeholder="信息标题"></el-input>
          </el-table-column>
          <el-table-column prop="address" label="信息内容" width="640">
            <el-input
              v-model="schoolDetailForm.dispensingForm.infoContent"
              style="font-style:weight"
              :rows="2"
              type="textarea"
              placeholder="信息内容"
            ></el-input>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                @click.native.prevent="removeTableItem(scope.$index,scope.row,'dispensing')"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <!-- <el-button type="primary" icon="el-icon-delete" >返回</el-button> -->
      <span align="right" style="display:block">
        <span align="left">
          <el-button type="primary">返回</el-button>
        </span>
        <el-button type="primary">保存</el-button>
      </span>
    </el-form>
  </div>
  <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="50">
    <div style="height: 100%;width: 100%; background-color: #f2f5f6;box-shadow: 0 0 6px rgba(0,0,0, .12);text-align: center;line-height: 40px; color: #1989fa;">UP</div>
  </el-backtop>-->
</template>

<style>
/* 文本域取消左右拉伸效果 */
.el-textarea .el-textarea__inner {
  resize: none;
}

/* 所有表单项文字居中 */
.el-form-item__content {
  line-height: 10px;
  position: relative;
  font-size: 14px;
  text-align: center;
}
/* 招生院系管理表格字体居中及取消背景颜色 */
.el-table thead.is-group th {
  background-color: white;
  text-align: center;
}
/* 院校公告表格栏字体居中 */
.el-table td,
.el-table th.is-leaf {
  border-bottom: 1px solid #ebeef5;
  text-align: center;
}
</style>

<script>
//导入外部接口
// import { addFirstCourse } from "../../api/api";

// import { allFirstCourseList } from "../../api/api";

// import { deleteFirstCourse } from "../../api/api";

// import { updateFirstCourse } from "../../api/api";

import { addSecondCourse } from "../../api/api";

import { allSecondCourseList } from "../../api/api";

import { updateSecondCourse } from "../../api/api";

import { deleteSecondCourse } from "../../api/api";

import { getSchoolDetailInfo } from "../../api/api";

// import { error } from "util";
export default {
  data() {
    return {
      schoolNo: "",
      table_index: 0,
      // formLabelWidth: "130px",
      multipleSelection: [],
      dialogFormVisible: false,
      pemissionRadioGroup: 1,
      schoolName: "",
      majorTypes: [
        {
          majorType: "学术型硕士",
          label: "学术型硕士"
        },
        {
          majorType: "专业型硕士",
          label: "专业型硕士"
        }
      ],
      majorType: "",
      secondCourseInfo: [
        {
          secondCourseNo: 0,
          secondCourseCode: "",
          secondCourseName: "",
          firstCourseNo: "",
          firstCourseCode: "",
          majorType: "",
          firstCoursePojo: [
            {
              firstCourseNo: "",
              firstCourseCode: "",
              firstCourseName: ""
            }
          ]
        }
      ],
      tableDataTempStore: [
        {
          secondCourseNo: 0,
          secondCourseCode: "",
          secondCourseName: "",
          firstCourseNo: "",
          firstCourseCode: "",
          majorType: "",
          firstCoursePojo: [
            {
              firstCourseNo: "",
              firstCourseCode: "",
              firstCourseName: ""
            }
          ]
        }
      ],
      getStudentForm: [
        {
          infoNo: "",
          infoType: "getStudent",
          infoTitle: "",
          infoContent: "",
          schoolNo: "",
          createDate: "",
          createTime: "",
          modifyDate: "",
          modifyTime: ""
        }
      ],
      tableData: [
        {
          schoolNo: "",
          departmentForm: [
            {
              departmentNo: "",
              departmentName: "",
              schoolNo: "",
              schoolName: "",
              majorNo: "",
              majorName: "",
              majorCode: ""
            }
          ],
          titleForm: [
            {
              infoNo: "",
              infoType: "title",
              infoTitle: "",
              infoContent: "",
              schoolNo: "",
              createDate: "",
              createTime: "",
              modifyDate: "",
              modifyTime: ""
            }
          ],

          dispensingForm: [
            {
              infoNo: "",
              infoType: "dispensing",
              infoTitle: "",
              infoContent: "",
              schoolNo: "",
              createDate: "",
              createTime: "",
              modifyDate: "",
              modifyTime: ""
            }
          ],
          scholarshipForm: [
            {
              infoNo: "",
              infoType: "scholarship",
              infoTitle: "",
              infoContent: "",
              schoolNo: "",
              createDate: "",
              createTime: "",
              modifyDate: "",
              modifyTime: ""
            }
          ],
          describeForm: [
            {
              infoNo: "",
              infoType: "describe",
              infoTitle: "",
              infoContent: "",
              schoolNo: "",
              createDate: "",
              createTime: "",
              modifyDate: "",
              modifyTime: ""
            }
          ]
        }
      ],
      user: [],
      search: "",
      //默认页面大小
      pageSize: 13,
      //当前页
      currentPage: 1,
      //数据总条数
      total: 0,
      //是否执行加载动作
      //记录当前数据位置
      indexId: 0,
      opName: "",
      opType: "",
      code: "",
      name: "",
      firstCourseCode: "",
      firstCourseName: "",
      departmentForm: [
        {
          departmentNo: "",
          departmentName: "",
          schoolNo: "",
          schoolName: "",
          majorNo: "",
          majorName: "",
          majorCode: ""
        }
      ],
      titleForm: [
        {
          infoNo: "",
          infoType: "title",
          infoTitle: "",
          infoContent: "",
          schoolNo: "",
          createDate: "",
          createTime: "",
          modifyDate: "",
          modifyTime: ""
        }
      ],
      getStudentForm: [
        {
          infoNo: "",
          infoType: "getStudent",
          infoTitle: "",
          infoContent: "",
          schoolNo: "",
          createDate: "",
          createTime: "",
          modifyDate: "",
          modifyTime: ""
        }
      ],
      dispensingForm: [
        {
          infoNo: "",
          infoType: "dispensing",
          infoTitle: "",
          infoContent: "",
          schoolNo: "",
          createDate: "",
          createTime: "",
          modifyDate: "",
          modifyTime: ""
        }
      ],
      scholarshipForm: [
        {
          infoNo: "",
          infoType: "scholarship",
          infoTitle: "",
          infoContent: "",
          schoolNo: "",
          createDate: "",
          createTime: "",
          modifyDate: "",
          modifyTime: ""
        }
      ],
      describeForm: 
        {
          infoNo: "",
          infoType: "describe",
          infoTitle: "",
          infoContent: "",
          schoolNo: "",
          createDate: "",
          createTime: "",
          modifyDate: "",
          modifyTime: ""
        },
      //院校明细请求数据
      schoolDetailForm: {
        schoolNo: "",
        schoolName: "",
        schoolPojo: [
          {
            schoolNo: "",
            schoolName: "",
            schoolCode: "",
            schoolType: "",
            schoolLevel: "",
            address: "",
            schoolInfo: "",
            schoolMail: "",
            schoolMobile: "",
            schoolAddress: "",
            schoolOnlineNet: "",
            schoolKyStudentOnlineNet: ""
          }
        ],
        departmentForm: [
          {
            departmentId: "",
            departmentNo: "",
            departmentName: "",
            schoolNo: "",
            schoolName: "",
            majorNo: "",
            majorName: "",
            majorCode: "",
            majorType: ""
          }
        ],
        titleForm: [
          {
            infoNo: "",
            infoType: "title",
            infoTitle: "",
            infoContent: "",
            schoolNo: "",
            createDate: "",
            createTime: "",
            modifyDate: "",
            modifyTime: ""
          }
        ],
        getStudentForm: [
          {
            infoNo: "",
            infoType: "getStudent",
            infoTitle: "",
            infoContent: "",
            schoolNo: "",
            createDate: "",
            createTime: "",
            modifyDate: "",
            modifyTime: ""
          }
        ],
        dispensingForm: [
          {
            infoNo: "",
            infoType: "dispensing",
            infoTitle: "",
            infoContent: "",
            schoolNo: "",
            createDate: "",
            createTime: "",
            modifyDate: "",
            modifyTime: ""
          }
        ],
        scholarshipForm: [
          {
            infoNo: "",
            infoType: "scholarship",
            infoTitle: "",
            infoContent: "",
            schoolNo: "",
            createDate: "",
            createTime: "",
            modifyDate: "",
            modifyTime: ""
          }
        ],
        describeForm: [
          {
            infoNo: "",
            infoType: "describe",
            infoTitle: "",
            infoContent: "",
            schoolNo: "",
            createDate: "",
            createTime: "",
            modifyDate: "",
            modifyTime: ""
          }
        ]
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        code: [
          { required: true, message: "学科代码最少为1个字符", trigger: "blur" },
          { min: 1, max: 11, message: "学科代码最长11个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "学科门类最少为2个字符", trigger: "blur" },
          {
            min: 2,
            max: 11,
            message: "学科门类最长为11个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },

  watch: {
    search: function() {
      var search = this.search;
      var tableData = this.tableData;
      var tableDataTempStore = this.tableDataTempStore;
      if (search != "" && search != null) {
        var searchTemp = search;
        if (!isNaN(search)) {
          tableData = this.tableData.filter(
            tableData => !search || tableData.code.includes(this.search)
          );
        } else {
          tableData = this.tableData.filter(
            tableData =>
              !searchTemp ||
              tableData.name.toLowerCase().includes(this.search.toLowerCase())
          );
        }
        this.tableData = tableData;
        tableData = JSON.stringify(tableData);
      } else {
        this.tableData = tableDataTempStore;
      }
    }
  },
  created() {
    var schoolNo = this.$route.query.schoolNo;
    // this.firstCourseCode = this.$route.query.firstCourseCode;
    this.$message.success(
      "schoolNo:" + schoolNo
      //  +
      // "\nschoolName:" +
      // row.schoolName +
      // "\ncode:" +
      // row.schoolCode
    );
    this.schoolNo = schoolNo;
    this.queryList();
  },
  methods: {
    addTableItem(type) {
      console.log("type类型:" + typeof type);
      // var tablename = "this.schoolDetailForm." + type + "Form";
      var tablename = type + "Form";
      console.log("tablename:" + tablename);
      if (type == "department") {
        //通过变量名的字符串，来获取vue中变量并使用
        this[`${tablename}`].push({
          departmentNo: "",
          departmentName: "",
          majorCode: "",
          majorName: "",
          majorType: "",
          // infoTitle: "",
          // infoContent: "",
          key: Date.now()
        });
      } else {
        //通过变量名的字符串，来获取vue中变量并使用
        this[`${tablename}`].push({
          infoTitle: "",
          infoContent: "",
          key: Date.now()
        });
      }
    },
    removeTableItem(index, row, type) {
      var tablename = type + "Form";
      console.log("type类型:" + typeof type);
      //通过变量名的字符串，来获取vue中变量并使用
      this[`${tablename}`].splice(index, 1);
    },
    // removeDomain2(item) {
    //   var index = this.schoolDetailForm.departmentForm.indexOf(item);
    //   if (index !== -1) {
    //     this.schoolDetailForm.departmentForm.splice(index, 1)
    //   }
    // },
    cancel() {
      this.dialogFormVisible = false;
      this.$refs.secondCourseInfo.resetFields();
    },
    viewMajorCourseButton(index, row) {
      console.log("index:" + index);
      console.log("row.id:" + row.id);
      console.log("row.name:" + row.name);
      console.log("row.code:" + row.code);
      majorParams: {
        firstCourseNo: row.firstCoursePojo.firstCourseNo;
        firstCourseCode: row.firstCoursePojo.firstCourseCode;
        secondCourseCode: row.secondCourseCode;
        secondCourseName: row.secondCourseName;
      }
      this.$router.push({
        path: "/home/majorTable",
        query: { row }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      console.log("每页" + this.pageSize + "条");
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    queryList() {
      var schoolNo = this.schoolNo;
      getSchoolDetailInfo(schoolNo).then(
        result => {
          var json = JSON.stringify(result);
          var code = result.returnCode.code;
          var desc = result.returnCode.desc;
          var body = result.body;
          this.total = body.length;
          if (code == 1000) {
            //延时半秒
            setTimeout(() => {
              //隐藏加载动作
              this.loading = false;
            }, 500);
            // this.tableData = body;

            //整理服务端返回的明细信息数据
            //赋值给schoolDetailForm
            this.schoolDetailForm.departmentForm = body.departmentPojos;
            this.schoolDetailForm.schoolNo = body.schoolNo;
            this.schoolDetailForm.schoolName = body.schoolName;
            // this.schoolDetailForm.
            var schoolMainInfoPojoList = body.schoolMainInfoPojos;
            for (var i = 0; i < schoolMainInfoPojoList.length; i++) {
              if (schoolMainInfoPojoList[i].length > 1) {
                for(var j = 0; j< schoolMainInfoPojoList[i].length;j++){
                  console.log("j:"+j);
                    this.schoolDetailForm.titleForm[i][j] = schoolMainInfoPojoList[i][j] ;
                    this.titleForm[i][j] = schoolMainInfoPojoList[i][j];
                }
                var json = JSON.stringify(this.titleForm);
                console.log("this.schoolDetailForm.titleForm:"+json);
                var type = schoolMainInfoPojoList[i][0].infoType;
                switch (type) {
                  // case "title":
                  //   this.schoolDetailForm.titleForm = schoolMainInfoPojoList[i] ;
                  //   this.titleForm = schoolMainInfoPojoList[i];
                  //   break;
                  case "getStudent":
                    this.schoolDetailForm.getStudentForm = schoolMainInfoPojoList[i];
                    this.getStudentForm = schoolMainInfoPojoList[i];
                    break;
                  case "dispensing":
                    this.schoolDetailForm.dispensingForm = schoolMainInfoPojoList[i];
                    this.dispensingForm = schoolMainInfoPojoList[i];
                    break;
                  case "scholarship":
                    this.schoolDetailForm.scholarshipForm = schoolMainInfoPojoList[i];
                    this.scholarshipForm = schoolMainInfoPojoList[i];
                    break;
                  case "describe":
                    this.schoolDetailForm.describeForm = schoolMainInfoPojoList[i];
                    this.describeForm = schoolMainInfoPojoList[i];
                    break;
                  default:
                    break;
                }
              } else {
                var type = schoolMainInfoPojoList[i].infoType;
                switch (type) {
                  case "title":
                    this.schoolDetailForm.titleForm = schoolMainInfoPojoList[i];
                    this.titleForm = schoolMainInfoPojoList[i];
                    break;
                  case "getStudent":
                    this.schoolDetailForm.getStudentForm = schoolMainInfoPojoList[i];
                    this.getStudentForm = schoolMainInfoPojoList[i];
                    break;
                  case "dispensing":
                    this.schoolDetailForm.dispensingForm = schoolMainInfoPojoList[i];
                    this.dispensingForm = schoolMainInfoPojoList[i];
                    break;
                  case "scholarship":
                    this.schoolDetailForm.scholarshipForm = schoolMainInfoPojoList[i];
                    this.scholarshipForm = schoolMainInfoPojoList[i];
                    break;
                  case "describe":
                    this.schoolDetailForm.describeForm = schoolMainInfoPojoList[i];
                    this.describeForm = schoolMainInfoPojoList[i];
                    break;
                  default:
                    break;
                }
              }
            }
            var smp = schoolMainInfoPojoList[0][0].infoType;
            var smpp = schoolMainInfoPojoList[0].length;
            console.log("schoolMainInfoPojos:" + smp);
            console.log("length:" + smpp);
            // schoolMainInfoPojoList.
            // this.schoolDetailForm = body;
            // this.tableDataTempStore = body;
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: desc
            });
            // this.$router.push("/404");
          }
        },
        error => {
          console.log("reusult2-->" + result);
        }
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除按钮
    deleteButton(index, row) {
      this.$confirm("确认要删除" + row.name + "? ", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          deleteSecondCourse(row.id).then(result => {
            var code = result.returnCode.code;
            var desc = result.returnCode.desc;
            var body = result.body;
            console.log("result-->" + result);
            if (code == 1000) {
              this.$message({
                showClose: true,
                type: "success",
                message: "删除成功!"
              });
              //删除数据然后更新表格
              this.tableData.splice(index, 1);
            } else {
              this.$message({
                showClose: true,
                type: "warning",
                message: desc
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消删除"
          });
        });
    },
    toggleButton() {
      console.log("this.opType:" + this.opType);
      console.log("this.opType == 'add':" + (this.opType == "add"));
      if (this.opType == "add") {
        // addConfirmButton(this.firstCourseInfo);
        //在方法中调用另一个含参方法
        this.$options.methods.addConfirmButton.bind(this)(
          this.secondCourseInfo
        );
      } else if (this.opType == "update") {
        // updateButton(this.firstCourseInfo);
        this.$options.methods.updateButton.bind(this)(this.secondCourseInfo);
      }
    },
    addButton() {
      this.dialogFormVisible = true;
      this.opName = "添加学科门类信息";
      this.opType = "add";
      console.log("code:" + this.code);
      console.log("name:" + this.name);
      console.log("id:" + this.id);
      // this.$message.success("id:"+row.id+"\ncode:"+row.code+"\nname:"+row.name);
    },
    addConfirmButton(secondCourseInfo) {
      this.$refs.secondCourseInfo.validate(valid => {
        if (valid) {
          var json = this.secondCourseInfo;
          json = JSON.stringify(json);
          // console.log("json-->" + typeof json);
          // console.log("json-->" + json);
          var secondCourseParams = {
            code: this.secondCourseInfo.code,
            name: this.secondCourseInfo.name,
            firstCode: this.firstCode,
            majorType: this.secondCourseInfo.majorType
          };
          console.log("majorType:" + this.secondCourseInfo.majorType);
          var s = JSON.stringify(secondCourseParams);
          console.log("secondCourseParams-->" + s);
          addSecondCourse(secondCourseParams).then(
            result => {
              console.log("result-->" + result);
              var code = result.returnCode.code;
              var desc = result.returnCode.desc;
              var body = result.body;

              console.log("json.code-->" + result.returnCode.code);
              console.log("json.desc-->" + result.returnCode.desc);
              console.log("json.body-->" + result.body);
              if (code === 1000) {
                //延时一秒
                setTimeout(() => {
                  //隐藏加载动作
                  this.loading = false;
                }, 200);
                this.dialogFormVisible = false;
                this.$message({
                  showClose: true,
                  type: "success",
                  message: "添加学科门类信息成功"
                });
                // this.tableData.length
                console.log("this.tableData.length:" + this.tableData.length);
                var a = JSON.stringify(this.secondCourseInfo);
                console.log("this.secondCourseInfo1:" + a);
                this.tableData[this.tableData.length + 1] = body;
                var bo = JSON.stringify(body);
                console.log("this.body:" + bo);
                // this.tableData[this.indexId] = body;
                var b = JSON.stringify(
                  this.tableData[this.tableData.length + 1]
                );
                var b1 = JSON.stringify(this.tableData[this.tableData.length]);
                var b2 = JSON.stringify(
                  this.tableData[this.tableData.length - 1]
                );
                // this.tableData[this.tableData.length++] = body
                console.log("this.tableData[this.tableData.length-]:" + b2);
                console.log("this.tableData[this.tableData.length]:" + b1);
                console.log("this.tableData[this.tableData.length+1]:" + b);
                this.$refs.secondCourseInfo.resetFields();
                console.log("this.secondCourseInfo2:" + a);
                this.opName = "";
                this.opType = "";
                this.total = this.tableData.length.length;
                this.$router.push("/home/secondCourseTable");
              } else if (code === 1003) {
                this.$message.error(desc);
                this.$refs.secondCourseInfo.resetFields();
                this.$router.push("/home/secondCourseTable");
              } else {
                this.$message({
                  message: desc,
                  type: "warning"
                });
                this.$refs.secondCourseInfo.resetFields();
              }
            },
            error => {
              this.$message.error("网络开小差了，请稍后再试~");
              this.$refs.secondCourseInfo.resetFields();
              this.$router.push("/home/secondCourseTable");
            }
          );
        } else {
          var msg = "请填写您的信息";
          this.$message({
            message: msg,
            type: "warning"
          });
          this.$refs.secondCourseInfo.resetFields();
          this.$router.push("/home/secondCourseTable");
        }
      });
      this.opType = "";
    },
    editButton(index, row) {
      //   this.name = row.name;
      //   console.log("name:" + this.name);
      //   this.password = row.password;
      //   this.manaPemission = row.manaPemission;
      this.dialogFormVisible = true;
      this.opName = "修改" + row.name + "学科门类信息";
      let _row = row;
      this.indexId = index;
      this.opType = "update";
      console.log("选择当前[" + this.indexId + "]行");
      //将每一行的数据放到对话框中
      this.secondCourseInfo = Object.assign({}, _row); // editForm是Dialog弹框的data
    },
    updateButton(secondCourseInfo) {
      this.$refs.secondCourseInfo.validate(valid => {
        if (valid) {
          var info = this.secondCourseInfo;
          var json = JSON.stringify(info);

          console.log("this.secondCourseInfo:" + json);
          updateSecondCourse(this.secondCourseInfo).then(result => {
            var code = result.returnCode.code;
            var desc = result.returnCode.desc;
            var body = result.body;
            console.log("code" + code);
            console.log("desc" + desc);
            console.log("body" + body);
            if (code == 1000) {
              //延时一秒
              setTimeout(() => {
                //隐藏加载动作
                this.loading = false;
              }, 200);
              this.dialogFormVisible = false;
              this.$message({
                showClose: true,
                type: "success",
                message: "更新成功"
              });
              console.log(
                "this.secondCourseInfo:" + this.secondCourseInfo.code
              );
              console.log("this.indexId:" + this.indexId);
              console.log(
                "this.tableData[this.indexId]1:" +
                  this.tableData[this.indexId].code
              );
              //数据局部刷新操作
              this.tableData[this.indexId] = this.secondCourseInfo;
              // this.tableData[this.indexId] = body;
              console.log("body:" + body);
              console.log("this.secondCourseInfo:" + this.secondCourseInfo);
              console.log(
                "this.tableData[this.indexId]2:" +
                  this.tableData[this.indexId].code
              );
              // this.$refs.secondCourseInfo.resetFields();
              console.log(
                "this.secondCourseInfo3:" + this.tableData[this.indexId].code
              );
              // queryList();
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: desc
              });
              this.$refs.secondCourseInfo.resetFields();
            }
          });
        } else {
          this.$message({
            showClose: true,99
            type: "error",
            message: "更新失败，请重试"
          });
          this.$refs.secondCourseInfo.resetFields();
        }
      });
      this.opType = "";
    }
  }
};
</script>
