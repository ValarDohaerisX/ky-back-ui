import Vue from 'vue'
<template>
  <div>
    <el-table
      :data="this.tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="align:center"
      highlight-current-row
      :index="table_index"
      ref="multipleTable"
      v-loading="loading"
      height="440"
      @selection-change="handleSelectionChange"
      center
    >
      <el-table-column label="院校编号" prop="schoolNo"></el-table-column>
      <el-table-column label="院校名称" prop="schoolName"></el-table-column>
      <el-table-column label="院校代码" prop="schoolCode"></el-table-column>
      <el-table-column label="院校类型" prop="schoolType"></el-table-column>
      <el-table-column label="院校水平" prop="schoolLevel"></el-table-column>
      <el-table-column label="所在城市" prop="address"></el-table-column>
      <!-- <el-table-column label="院校简介" prop="schoolInfo"></el-table-column> -->
      <el-table-column label="院校邮箱" prop="schoolMail"></el-table-column>
      <el-table-column label="联系方式" prop="schoolMobile"></el-table-column>
      <el-table-column label="院校官网" prop="schoolOnlineNet"></el-table-column>
      <el-table-column label="院校研究生官网" prop="schoolKyStudentOnlineNet"></el-table-column>
      <!-- <el-table-column width="100%">
        
      </el-table-column>-->
      <el-table-column width="100%">
        <!-- width="100%"  -->
        <template slot="header" slot-scope="scope">
          <el-button type="warning" size="small" @click.native.prevent="addButton">添加信息</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            @click.native.prevent="viewSchoolDetailButton(scope.$index,scope.row)"
          >院校信息</el-button>
        </template>
      </el-table-column>

      <el-table-column>
        <!-- <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入名称关键字搜索" />
        </template>-->
        <template slot-scope="scope">
          <el-button
            id="detailButtonStyle"
            type="danger"
            size="small"
            @click.native.prevent="detailButton(scope.$index,scope.row)"
          >明细信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <div class="block" align="right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,6,7, 10,13, 15, 20,50,100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
    <!-- 添加目标院校基本信息 -->
    <el-dialog :title="opName" :visible.sync="dialogFormVisible">
      <el-form :model="schoolInfo" ref="schoolInfo" :rules="rules">
        <el-form-item label="院校名称" :label-width="formLabelWidth" prop="schoolName">
          <el-input
            v-model="schoolInfo.schoolName"
            autocomplete="off"
            prefix-icon="el-icon-user"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="院校代码" :label-width="formLabelWidth" prop="schoolCode">
          <el-input
            v-model="schoolInfo.schoolCode"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="院校类型" :label-width="formLabelWidth" prop="schoolType">
          <el-select
            v-model="schoolInfo.schoolType"
            clearable
            placeholder="请选择"
            @click.native.prevent="getCodeTypeButton('schoolType')"
          >
            <el-option
              v-for="(type,i) in ldcode"
              :key="i"
              :label="type.label"
              :value="type.codeName"
            >
              <span style="float: left">{{ type.code }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ type.codeName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院校水平" :label-width="formLabelWidth" prop="schoolLevel">
          <el-select
            v-model="schoolInfo.schoolLevel"
            multiple
            clearable
            placeholder="请选择"
            @click.native.prevent="getCodeTypeButton('schoolLevel')"
          >
            <el-option
              v-for="(type,i) in ldcode"
              :key="i"
              :label="type.label"
              :value="type.codeName"
            >
              <span style="float: left">{{ type.code }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ type.codeName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在省份" :label-width="formLabelWidth" prop="address">
          <el-select
            v-model="schoolInfo.address"
            clearable
            placeholder="请选择"
            @click.native.prevent="getCodeTypeButton('address')"
          >
            <el-option
              v-for="(type,i) in ldcode"
              :key="i"
              :label="type.label"
              :value="type.codeName"
            >
              <span style="float: left">{{ type.code }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ type.codeName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院校邮箱" :label-width="formLabelWidth" prop="schoolMail">
          <el-input
            v-model="schoolInfo.schoolMail"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="schoolMobile">
          <el-input
            v-model="schoolInfo.schoolMobile"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth" prop="schoolAddress">
          <el-input
            v-model="schoolInfo.schoolAddress"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="学校官网" :label-width="formLabelWidth" prop="schoolOnlineNet">
          <el-input
            v-model="schoolInfo.schoolOnlineNet"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="学校研究生官网" :label-width="formLabelWidth" prop="schoolKyStudentOnlineNet">
          <el-input
            v-model="schoolInfo.schoolKyStudentOnlineNet"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" round>取 消</el-button>
        <el-button type="primary" @click.native.prevent="toggleButton" round>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style>
.el-form-item__content {
  line-height: 10px;
  position: relative;
  font-size: 14px;
  /* text-align: center; */
}
</style>

<script>
//导入外部接口
// import { addFirstCourse } from "../../api/api";

// import { deleteFirstCourse } from "../../api/api";

// import { updateFirstCourse } from "../../api/api";
import { getCodeType } from "../../api/api";

import { addSchoolInfo } from "../../api/api";

import { getAllSchoolList } from "../../api/api";

import { stringify } from 'querystring';

export default {
  data() {
    return {
      table_index: 0,
      schoolTypes: [],
      schoolLevels: [],
      addresss: [],
      formLabelWidth: "130px",
      multipleSelection: [],
      dialogFormVisible: false,
      pemissionRadioGroup: 1,
      schoolInfo: [
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
      tableDataTempStore: [
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
      tableData: [
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
      user: [],
      search: "",
      //默认页面大小
      pageSize: 13,
      //当前页
      currentPage: 1,
      //数据总条数
      total: 0,
      //是否执行加载动作
      loading: false,
      //记录当前数据位置
      indexId: 0,
      opName: "",
      opType: "",
      //ldcode对应的json数组
      ldcode: [
        {
          codeNo: 0,
          codeType: "",
          code: "",
          codeName: ""
        }
      ],
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
    this.queryList();
  },
  methods: {
    searchSchoolType(s) {
      this.$message({
        showClose: true,
        type: "success",
        message: "11111111111!" + "[" + s + "]"
      });
    },
    cancel() {
      this.dialogFormVisible = false;
      this.$refs.schoolInfo.resetFields();
    },
    viewSchoolDetailButton(index, row) {
      // console.log("index:" + index);
      // console.log("row.id:" + row.id);
      // console.log("row.name:" + row.name);
      // console.log("row.code:" + row.code);
      // this.$message.success(
      //   "schoolNo:" +
      //     row.schoolNo +
      //     "\nschoolName:" +
      //     row.schoolName +
      //     "\ncode:" +
      //     row.schoolCode
      // );
      this.$router.push({
        path: "/home/schoolDetailInfo",
        query: { schoolNo: row.schoolNo }
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
      getAllSchoolList().then(
        result => {
          console.log("reusult1-->" + result);
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
            this.tableData = body;
            this.tableDataTempStore = body;
          } else {
            this.$router.push("/404");
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
    getCodeTypeButton(codeType) {
      if (codeType == "address") {
        var level = this.schoolInfo.schoolLevel;
        // var arr =  level.entries(level);
        level = JSON.stringify(level);
        // level = JSON.parse(level);
        if (level != null) {
          this.$message({
            message: '数据:'+level+'/n类型:'+typeof level,
            type: "success"
          });
        } else {
          this.$message({
            message: "没有获取到数据",
            type: "fail"
          });
        }
      }
      getCodeType(codeType).then(
        result => {
          console.log("reusult1-->" + result);
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
            this.ldcode = body;
            // this.ldcode = body;
          } else {
            this.$router.push("/404");
          }
        },
        error => {
          console.log("reusult2-->" + result);
        }
      );
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
          deleteFirstCourse(row.id).then(result => {
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
        // addConfirmButton(this.schoolInfo);
        //在方法中调用另一个含参方法
        this.$options.methods.addConfirmButton.bind(this)(this.schoolInfo);
      } else if (this.opType == "update") {
        // updateButton(this.schoolInfo);
        this.$options.methods.updateButton.bind(this)(this.schoolInfo);
      }
    },
    addButton() {
      this.dialogFormVisible = true;
      this.opName = "添加目标院校基本信息";
      this.opType = "add";
    },
    addConfirmButton(schoolInfo) {
      this.$refs.schoolInfo.validate(valid => {
        if (valid) {
          var schoolParams = {
            schoolName: this.schoolInfo.schoolName,
            schoolCode: this.schoolInfo.schoolCode,
            schoolType: this.schoolInfo.schoolType,
            schoolLevel: JSON.stringify(this.schoolInfo.schoolLevel),
            address: this.schoolInfo.address,
            schoolInfo: this.schoolInfo.schoolInfo,
            schoolMail: this.schoolInfo.schoolMail,
            schoolMobile: this.schoolInfo.schoolMobile,
            schoolAddress: this.schoolInfo.schoolAddress,
            schoolOnlineNet: this.schoolInfo.schoolOnlineNet,
            schoolKyStudentOnlineNet: this.schoolInfo.schoolKyStudentOnlineNet
          };
          addSchoolInfo(schoolParams).then(
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
                  message: "添加院校基本信息成功"
                });
                this.$refs.schoolInfo.resetFields();
                this.opName = "";
                this.opType = "";
                this.$router.push("/home/schoolBasicInfo");
              } else if (code === 1003) {
                this.$message.error(desc);
                this.opName = "";
                this.opType = "";
                this.$refs.schoolInfo.resetFields();
                this.$router.push("/home/schoolBasicInfo");
              } else {
                this.$message({
                  message: desc,
                  type: "warning"
                });
                this.opName = "";
                this.opType = "";
                this.$refs.schoolInfo.resetFields();
              }
            },
            error => {
              this.$message.error("网络开小差了，请稍后再试~");
              this.$refs.schoolInfo.resetFields();
              this.$router.push("/home/schoolBasicInfo");
            }
          );
        } else {
          var msg = "请填写您的信息";
          this.$message({
            message: msg,
            type: "warning"
          });
          this.$refs.schoolInfo.resetFields();
          this.$router.push("/home/schoolBasicInfo");
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
      this.schoolInfo = Object.assign({}, _row); // editForm是Dialog弹框的data
    },
    updateButton(schoolInfo) {
      this.$refs.schoolInfo.validate(valid => {
        if (valid) {
          var info = this.schoolInfo;
          var json = JSON.stringify(info);

          console.log("this.schoolInfo:" + this.schoolInfo);
          updateFirstCourse(this.schoolInfo).then(result => {
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
              console.log("this.schoolInfo:" + this.schoolInfo.name);
              console.log("this.indexId:" + this.indexId);
              console.log(
                "this.tableData[this.indexId]1:" +
                  this.tableData[this.indexId].name
              );
              //数据局部刷新操作
              this.tableData[this.indexId] = this.schoolInfo;
              this.tableData[this.indexId] = body;
              console.log(
                "this.tableData[this.indexId]2:" +
                  this.tableData[this.indexId].name
              );
              this.$refs.schoolInfo.resetFields();
              // queryList();
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: desc
              });
              this.$refs.schoolInfo.resetFields();
            }
          });
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "更新失败，请重试"
          });
          this.$refs.schoolInfo.resetFields();
        }
      });
      this.opType = "";
    }
  }
};
</script>
