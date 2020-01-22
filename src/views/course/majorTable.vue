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
      <el-table-column label="二级学科" prop="secondCoursePojo.secondCourseName"></el-table-column>
      <!-- <el-table-column label="二级学科门类" prop="name"></el-table-column> -->
      <el-table-column label="专业代码" prop="majorCode"></el-table-column>
      <el-table-column label="专业名称" prop="majorName"></el-table-column>
      <el-table-column label="专业类型" prop="majorType"></el-table-column>
      <!-- <el-table-column label="二级学科类型" prop="majorName"></el-table-column> -->
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
          >添加专业信息</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="small"
            icon="el-icon-delete"
            @click.native.prevent="viewSchoolCourseButton(scope.$index,scope.row)"
          >查看所属学校</el-button>
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
    <!-- 添加专业门类信息 -->
    <el-dialog :title="opName" :visible.sync="dialogFormVisible">
      <el-form :model="majorInfo" ref="majorInfo" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="一级学科" :label-width="formLabelWidth" prop="firstCourseName">
              <el-input placeholder="firstCourseName" v-model="CodeAndName_first" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="二级学科" :label-width="formLabelWidth" prop="secondCourseName">
              <el-input placeholder="value1" v-model="CodeAndName_second" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="专业代码" :label-width="formLabelWidth" prop="majorShortCode">
          <el-input
            v-model="majorShortCode"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            clearable
            show-word-limit
            maxlength="2"
            placeholder="输入最后两位专业代码即可"
          >
            <template slot="prepend">{{this.secondCourseCode}}</template>
          </el-input>
        </el-form-item>
        <el-form-item label="专业名称" :label-width="formLabelWidth" prop="majorName">
          <el-input
            v-model="majorInfo.majorName"
            autocomplete="off"
            prefix-icon="el-icon-user"
            clearable
            show-word-limit
            maxlength="10"
            placeholder="请输入专业名称"
          >manaInfo.name</el-input>
        </el-form-item>
        <el-form-item label="专业类型" :label-width="formLabelWidth" prop="majorType">
          <el-select v-model="majorInfo.majorType" clearable placeholder="请选择专业类型">
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
    width: 100%;
}
.el-dialog__header {
    text-align: center;
    padding: 20px 20px 10px;
}
.el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #409eff;
}
</style>

<script>
//导入外部接口
import { addMajor } from "../../api/api";

import { getMajor } from "../../api/api";

import { updateMajor } from "../../api/api";

import { deleteMajor } from "../../api/api";
export default {
  data() {
    return {
      table_index: 0,
      formLabelWidth: "130px",
      multipleSelection: [],
      dialogFormVisible: false,
      pemissionRadioGroup: 1,
      secondCourseCode: "",
      firstCoursePojo: [],
      majorShortCode: "",
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
      majorInfo: [
        {
          majorNo: "",
          majorCode: "",
          majorName: "",
          majorType: "",
          schoolNo: "",
          firstCourseNo: "",
          secondCourseNo: "",
          secondCoursePojo: [
            {
              secondCourseNo: "",
              secondCourseCode: "",
              secondCourseName: "",
              firstCoursePojo: [
                {
                  firstCourseNo: "",
                  firstCourseCode: "",
                  firstCourseName: ""
                }
              ]
            }
          ]
        }
      ],
      tableDataTempStore: [
        {
          majorNo: "",
          majorCode: "",
          majorName: "",
          majorType: "",
          schoolNo: "",
          firstCourseNo: "",
          secondCourseNo: "",
          secondCoursePojo: [
            {
              secondCourseNo: "",
              secondCourseCode: "",
              secondCourseName: "",
              firstCoursePojo: [
                {
                  firstCourseNo: "",
                  firstCourseCode: "",
                  firstCourseName: ""
                }
              ]
            }
          ]
        }
      ],
      tableData: [
        {
          majorNo: "",
          majorCode: "",
          majorName: "",
          majorType: "",
          schoolNo: "",
          firstCourseNo: "",
          secondCourseNo: "",
          secondCoursePojo: [
            {
              secondCourseNo: "",
              secondCourseCode: "",
              secondCourseName: "",
              firstCoursePojo: [
                {
                  firstCourseNo: "",
                  firstCourseCode: "",
                  firstCourseName: ""
                }
              ]
            }
          ]
        }
      ],
      secondCourseNo: "",
      firstCourseNo: "",
      secondCourseCode: "",
      secondCourseName: "",
      firstCourseCode: "",
      firstCourseName: "",
      CodeAndName_first: "",
      CodeAndName_second: "",
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
      firstCode: "",
      firstName: "",
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
              tableData.majorName
                .toLowerCase()
                .includes(this.search.toLowerCase())
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
    // this.majorInfo.secondCoursePojo = this.$route.query.row.
    console.log("row1--->" + this.$route.query.row.secondCourseCode);
    console.log("row2--->" + this.$route.query.row.secondCourseName);
    console.log(
      "row3--->" + this.$route.query.row.firstCoursePojo.firstCourseCode
    );
    console.log(
      "row4--->" + this.$route.query.row.firstCoursePojo.firstCourseName
    );

    var json = JSON.stringify(this.majorInfo);

    this.secondCourseNo = this.$route.query.row.secondCourseNo;
    console.log("secondCourseNo:" + this.$route.query.row.secondCourseNo);
    this.firstCourseNo = this.$route.query.row.firstCoursePojo.firstCourseNo;

    this.secondCourseNo = this.$route.query.row.secondCourseNo;
    this.secondCourseCode = this.$route.query.row.secondCourseCode;
    this.secondCourseName = this.$route.query.row.secondCourseName;
    this.majorType = this.$route.query.row.majorType;

    this.firstCourseNo = this.$route.query.row.firstCoursePojo.firstCourseNo;
    this.firstCourseCode = this.$route.query.row.firstCoursePojo.firstCourseCode;
    this.firstCourseName = this.$route.query.row.firstCoursePojo.firstCourseName;
    console.log("json--->" + json);
    this.queryList();
  },
  methods: {
    cancel() {
      this.dialogFormVisible = false;
      this.majorShortCode = "";
      this.$refs.majorInfo.resetFields();
    },
    viewSchoolCourseButton(index, row) {
      console.log("index:" + index);
      console.log("row.id:" + row.id);
      console.log("row.name:" + row.name);
      console.log("row.code:" + row.code);
      this.$router.push({
        path: "/home/a",
        query: { id: row.id, code: row.code, name: row.name }
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
      var firstCourseNo = this.firstCourseNo;
      var secondCourseNo = this.secondCourseNo;
      // console.log(typeof firstCourseNo);
      // var queryParams=[{
      //   firstCourseNo:this.firstCourseNo,
      //   secondCourseNo:this.secondCourseNo
      // }];
      console.log("传参" + firstCourseNo);
      console.log("传参" + secondCourseNo);
      const jsonData = {
        firstCourseNo: this.firstCourseNo,
        secondCourseNo: this.secondCourseNo
      };
      getMajor(jsonData).then(
        result => {
          console.log("reusult1-->" + result);
          // var json = JSON.stringify(result);
          var code = result.returnCode.code;
          var desc = result.returnCode.desc;
          var body = result.body;
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
            var json = JSON.stringify(body);
            console.log("body:" + json);
            // this.tableData[0].firstName = this.firstName;
            this.tableDataTempStore = body;
          } else {
            this.$message({
              showClose: true,
              type: "error",
              message: desc
            });
            // this.$router.push("/404");
          }
        },error => {
          console.log("reusult2-->" + "1");
        }
      );
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除按钮
    deleteButton(index, row) {
      this.$confirm("确认要删除 [" + row.majorName + "]  专业 ? ", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          deleteMajor(row.majorNo).then(result => {
            var code = result.returnCode.code;
            var desc = result.returnCode.desc;
            var body = result.body;
            console.log("result-->" + result);
            if (code == 1000) {
              this.$message({
                showClose: true,
                type: "success",
                center: "true",
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
            center: "true",
            message: "已取消删除 [ "+row.majorName+" ] 专业"
          });
        });
    },
    toggleButton() {
      console.log("this.opType:" + this.opType);
      console.log("this.opType == 'add':" + (this.opType == "add"));
      this.majorShortCode = "";

      if (this.opType == "add") {
        // addConfirmButton(this.firstCourseInfo);
        //在方法中调用另一个含参方法
        this.$options.methods.addConfirmButton.bind(this)(this.majorInfo);
      } else if (this.opType == "update") {
        // updateButton(this.firstCourseInfo);
        this.$options.methods.updateButton.bind(this)(this.majorInfo);
      }
    },
    addButton() {
      this.dialogFormVisible = true;
      this.opName = "添加学科门类信息";
      this.opType = "add";
      this.CodeAndName_first =
        this.firstCourseCode + "-" + this.firstCourseName;
      this.CodeAndName_second =
        this.secondCourseCode + "-" + this.secondCourseName;
      // console.log("code:" + this.code);
      // console.log("name:" + this.name);
      // console.log("id:" + this.id);
      // this.$message.success("id:"+row.id+"\ncode:"+row.code+"\nname:"+row.name);
    },
    addConfirmButton(majorInfo) {
      this.$refs.majorInfo.validate(valid => {
        if (valid) {
          var json = this.majorInfo;
          json = JSON.stringify(json);
          var majorParams = {
            majorCode: (this.majorCode =
              this.secondCourseCode + this.majorShortCode),
            majorName: this.majorInfo.majorName,
            secondCourseNo: this.secondCourseNo,
            firstCourseNo: this.firstCourseNo,
            majorType: this.majorInfo.majorType
          };
          console.log("majorType:" + this.majorInfo.majorType);
          var s = JSON.stringify(majorParams);
          console.log("majorParams-->" + s);
          console.log("majorCode:" + this.majorCode);
          addMajor(majorParams).then(
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
                  center: "true",
                  message: "添加专业信息成功"
                });
                // this.tableData.length
                console.log("this.tableData.length:" + this.tableData.length);
                // var a = JSON.stringify(this.secondCourseInfo);
                // console.log("this.secondCourseInfo1:" + a);
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
                this.$refs.majorInfo.resetFields();
                console.log("this.majorInfo2:" + a);
                this.opName = "";
                this.opType = "";
                this.total = this.tableData.length;
                this.majorShortCode = "";
                this.$router.push("/home/majorTable");
                
              } else if (code === 1003) {
                this.$message.error(desc);
                this.$refs.majorInfo.resetFields();
                this.$router.push("/home/majorTable");
              } else {
                this.$message({
                  message: desc,
                  type: "warning",
                  center: "true",
                });
                this.$refs.majorInfo.resetFields();
              }
            },
            error => {
              this.$message.error(desc);
              this.$refs.majorInfo.resetFields();
              this.$router.push("/home/majorTable");
            }
          );
        } else {
          var msg = "请填写您的信息";
          this.$message({
            message: msg,
            type: "warning",
            center: "true"
          });
          this.$refs.majorInfo.resetFields();
          this.$router.push("/home/majorTable");
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
      this.opName = "修改[" + row.majorName + "]学科信息";
      let _row = row;
      this.indexId = index;
      this.opType = "update";
      console.log("选择当前[" + this.indexId + "]行");
      var code = row.majorCode;
      console.log("code.substring(4,6):"+code.substring(4,6));
      this.majorShortCode = code.substring(4,6);
      this.CodeAndName_first =this.firstCourseCode + "-" + this.firstCourseName;
      this.CodeAndName_second =this.secondCourseCode + "-" + this.secondCourseName;
      //将每一行的数据放到对话框中
      this.majorInfo = Object.assign({}, _row); // editForm是Dialog弹框的data
    },
    updateButton(majorInfo) {
      this.$refs.majorInfo.validate(valid => {
        if (valid) {
          var info = this.majorInfo;
          var json = JSON.stringify(info);

          console.log("this.majorInfo:" + json);
          this.majorInfo.majorCode =this.secondCourseCode + this.majorShortCode;

          updateMajor(this.majorInfo).then(result => {
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
                center: "true",
                message: "更新成功"
              });
              console.log("this.majorInfo:" + this.majorInfo.code);
              console.log("this.indexId:" + this.indexId);
              console.log(
                "this.tableData[this.indexId]1:" +
                  this.tableData[this.indexId].code
              );
              //数据局部刷新操作
              this.tableData[this.indexId] = this.majorInfo;
              // this.tableData[this.indexId] = body;
              console.log("body:" + body);
              console.log("this.majorInfo:" + this.majorInfo);
              console.log(
                "this.tableData[this.indexId]2:" +
                  this.tableData[this.indexId].code
              );
              // this.$refs.majorInfo.resetFields();
              console.log(
                "this.majorInfo:" + this.tableData[this.indexId].code
              );
              // queryList();
              this.majorShortCode = "";
            } else {
              this.$message({
                showClose: true,
                type: "error",
                center: "true",
                message: desc
              });
              this.$refs.majorInfo.resetFields();
            }
          });
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "更新失败，请重试",
            center: "true",
          });
          this.$refs.majorInfo.resetFields();
        }
      });
      this.opType = "";
    }
  }
};
</script>
