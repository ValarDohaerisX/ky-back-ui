import Vue from 'vue'
<template  >
  <div>
    <el-table
      :data="this.tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%; align:center"
      highlight-current-row
      :index="table_index"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      center
    >
      <el-table-column type="selection" width="100%"></el-table-column>
      <el-table-column type="index" label="序号" width="100%"></el-table-column>
      <!-- <el-table-column label="Id" prop="id" width="100%"></el-table-column> -->
      <el-table-column label="一级学科" prop="firstCoursePojo.firstCourseName"></el-table-column>
      <el-table-column label="二级学科代码" prop="secondCourseCode"></el-table-column>
      <el-table-column label="二级学科门类" prop="secondCourseName"></el-table-column>
      <el-table-column label="专业类型" prop="majorType"></el-table-column>
      <!-- <el-table-column label="二级学科类型" prop="name"></el-table-column> -->
      <!-- <el-table-column width="100%">
        
      </el-table-column>-->
      <el-table-column align="center">
        <!-- width="100%"  -->
        <template slot="header" slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            icon="el-icon-delete"
            @click.native.prevent="addButton"
          >添加二级学科</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            icon="el-icon-delete"
            @click.native.prevent="viewMajorCourseButton(scope.$index,scope.row)"
          >查看专业</el-button>
        </template>
      </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入名称关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            icon="el-icon-delete"
            @click.native.prevent="editButton(scope.$index,scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click.native.prevent="deleteButton(scope.$index,scope.row)"
          >删除</el-button>
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
    <!-- 添加二级学科门类信息 -->
    <el-dialog :title="opName" :visible.sync="dialogFormVisible">
      <el-form :model="secondCourseInfo" ref="secondCourseInfo" :rules="rules">
        <el-form-item label="学科代码" :label-width="formLabelWidth" prop="secondCourseCode">
          <el-input
            v-model="secondCourseInfo.secondCourseCode"
            autocomplete="off"
            prefix-icon="el-icon-user"
            clearable
          >manaInfo.name</el-input>
        </el-form-item>
        <el-form-item label="学科门类" :label-width="formLabelWidth" prop="secondCourseName">
          <el-input
            v-model="secondCourseInfo.secondCourseName"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="专业类型" :label-width="formLabelWidth" prop="majorType">
          <el-select v-model="secondCourseInfo.majorType" clearable placeholder="请选择">
            <el-option
              v-for="item in majorTypes"
              :key="item.majorType"
              :label="item.label"
              :value="item.majorType"
            ></el-option>
          </el-select>
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
.el-input__inner {
  width: 60%;
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
// import { error } from "util";
export default {
  data() {
    return {
      table_index: 0,
      formLabelWidth: "130px",
      multipleSelection: [],
      dialogFormVisible: false,
      pemissionRadioGroup: 1,
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
      tableData: [
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
    this.firstCourseCode = this.$route.query.firstCourseCode;
    this.firstCourseName = this.$route.query.firstCourseName;
    this.queryList();
  },
  methods: {
    cancel() {
      this.dialogFormVisible = false;
      this.$refs.secondCourseInfo.resetFields();
    },
    viewMajorCourseButton(index, row) {
      console.log("index:" + index);
      console.log("row.id:" + row.id);
      console.log("row.name:" + row.name);
      console.log("row.code:" + row.code);
      majorParams:{
        firstCourseNo:row.firstCoursePojo.firstCourseNo
        firstCourseCode: row.firstCoursePojo.firstCourseCode
        secondCourseCode: row.secondCourseCode
        secondCourseName: row.secondCourseName
      }
      this.$router.push({
        path: "/home/majorTable",
        query: {row}
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
      var firstCourse = this.firstCourseCode;
      console.log("firstCode-->" + firstCourse);
      allSecondCourseList(firstCourse).then(
        result => {
          // console.log("reusult1-->" + result);
          // var json = JSON.stringify(result);
          var code = result.returnCode.code;
          var desc = result.returnCode.desc;
          var body = result.body;
          // var json = JSON.stringify(body[0].firstCoursePojo.name);
          this.firstName = JSON.stringify(body[0].firstCoursePojo.firstCourseName);
          // console.log("reusult2-->" + json);
          console.log("reusult3-->" + this.firstCourseName);
          this.total = body.length;
          if (code == 1000) {
            this.$message({
              showClose: true,
              type: "success",
              message: "查询成功!",
              center: "true"
            });
            //延时半秒
            setTimeout(() => {
              //隐藏加载动作s
              this.loading = false;
            }, 500);
            this.tableData = body;
            this.tableData[0].firstCourseName = this.firstCourseName;
            this.tableDataTempStore = body;
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
            showClose: true,
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
