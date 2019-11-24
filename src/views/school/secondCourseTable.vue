import Vue from 'vue'
<template  >
  <div>
    <el-table
      :data="this.tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%; align:center"
      highlight-current-row
      :index="table_index"
      ref="multipleTable"
      @selection-change="handleSelectionChange" center
    >
      <el-table-column type="selection" width="100%"></el-table-column>
      <!-- <el-table-column type="index" label="序号" width="100%"></el-table-column> -->
      <el-table-column label="Id" prop="id" width="100%"></el-table-column>
      <el-table-column label="一级学科" prop="code" ></el-table-column>
      <el-table-column label="二级学科代码" prop="code" ></el-table-column>
      <el-table-column label="二级学科门类" prop="name" ></el-table-column>
      <el-table-column label="二级学科类型" prop="name" ></el-table-column>
      <!-- <el-table-column width="100%">
        
      </el-table-column> -->
      <el-table-column align="center" >
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
            @click.native.prevent="viewSecondCourseButton(scope.$index,scope.row)"
          >查看三级学科</el-button>
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
      <el-form :model="firstCourseInfo" ref="firstCourseInfo" :rules="rules">
        <el-form-item label="学科代码" :label-width="formLabelWidth" prop="code">
          <el-input
            v-model="firstCourseInfo.code"
            autocomplete="off"
            prefix-icon="el-icon-user"
            clearable
          >manaInfo.name</el-input>
        </el-form-item>
        <el-form-item label="学科门类" :label-width="formLabelWidth" prop="name">
          <el-input
            v-model="firstCourseInfo.name"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" round>取 消</el-button>
        <el-button
          type="primary"
          @click.native.prevent="toggleButton"
          round
        >修 改</el-button>
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
import { addFirstCourse } from "../../api/api";

import { allFirstCourseList } from "../../api/api";

import { deleteFirstCourse } from "../../api/api";

import { updateFirstCourse } from "../../api/api";
// import { error } from "util";
export default {
  data() {
    return {
      table_index: 0,
      formLabelWidth: "130px",
      multipleSelection: [],
      dialogFormVisible: false,
      pemissionRadioGroup: 1,
      firstCourseInfo: [
        {
          id:0,
          code: "",
          name: ""
        }
      ],
      tableDataTempStore: [
        {
          id:0,
          code: "",
          name: ""
        }
      ],
      tableData: [
        {
          id:0,
          code: "",
          name: ""
        }
      ],
      user:[],
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
      code:'',
      name:'',
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
            tableData =>!searchTemp || tableData.name.toLowerCase().includes(this.search.toLowerCase())
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
    this.code = this.$route.query.code;
    this.name = this.$route.query.name;
    // this.queryList();
    
  },
  methods: {
    cancel() {
      this.dialogFormVisible = false;
      this.$refs.firstCourseInfo.resetFields();
    },
    viewSecondCourseButton(index, row){
      console.log("index:"+index);
      console.log("row.id:"+row.id);
      console.log("row.name:"+row.name);
      console.log("row.code:"+row.code);
      this.$router.push({path:'/home/secondCourseTable',query:{id:row.id,code:row.code,name:row.name}});
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
      allFirstCourseList().then(
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
    toggleButton(){
      console.log("this.opType:"+this.opType);
      console.log("this.opType == 'add':"+(this.opType == 'add'));
      if(this.opType == 'add'){
        // addConfirmButton(this.firstCourseInfo);
        //在方法中调用另一个含参方法
        this.$options.methods.addConfirmButton.bind(this)(this.firstCourseInfo);
      }else if(this.opType == 'update'){
        // updateButton(this.firstCourseInfo);
        this.$options.methods.updateButton.bind(this)(this.firstCourseInfo);
      }
    },
    addButton() {
      this.dialogFormVisible = true;
      this.opName = "添加学科门类信息";
      this.opType = "add";
      
    },
    addConfirmButton(firstCourseInfo) {
      this.$refs.firstCourseInfo.validate(valid => {
        if (valid) {
          var json = this.firstCourseInfo;
          console.log("json-->" + typeof json);
          console.log("json-->" + json);

          var firstCourseParams = {
            code: this.firstCourseInfo.code,
            name: this.firstCourseInfo.name
          };
          addFirstCourse(firstCourseParams).then(
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
                this.$refs.firstCourseInfo.resetFields();
                this.opName = '';
                this.opType = '';
                this.$router.push("/home/courseTable");
              } else if (code === 1003) {
                this.$message.error(desc);
                this.$refs.firstCourseInfo.resetFields();
                this.$router.push("/home/courseTable");
              } else {
                this.$message({
                  message: desc,
                  type: "warning"
                });
                this.$refs.firstCourseInfo.resetFields();
              }
            },
            error => {
              this.$message.error("网络开小差了，请稍后再试~");
              this.$refs.firstCourseInfo.resetFields();
              this.$router.push("/home/courseTable");
            }
          );
        } else {
          var msg = "请填写您的信息";
          this.$message({
            message: msg,
            type: "warning"
          });
          this.$refs.firstCourseInfo.resetFields();
          this.$router.push("/home/courseTable");
        }
      });
      this.opType = '';
    },
    editButton(index, row) {
      //   this.name = row.name;
      //   console.log("name:" + this.name);
      //   this.password = row.password;
      //   this.manaPemission = row.manaPemission;
      this.dialogFormVisible = true;
      this.opName = "修改"+row.name+"学科门类信息";
      let _row = row;
      this.indexId = index;
      this.opType = 'update';
      console.log("选择当前["+this.indexId+"]行")
      //将每一行的数据放到对话框中
      this.firstCourseInfo = Object.assign({}, _row); // editForm是Dialog弹框的data
      
    },
    updateButton(firstCourseInfo) {
      this.$refs.firstCourseInfo.validate(valid => {
        if (valid) {
          var info = this.firstCourseInfo;
          var json = JSON.stringify(info);

          console.log("this.firstCourseInfo:"+this.firstCourseInfo);
          updateFirstCourse(this.firstCourseInfo).then(result => {
            var code = result.returnCode.code;
            var desc = result.returnCode.desc;
            var body = result.body;
            console.log("code"+code);
            console.log("desc"+desc);
            console.log("body"+body);
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
              console.log("this.firstCourseInfo:"+this.firstCourseInfo.name);
              console.log("this.indexId:"+this.indexId);
              console.log("this.tableData[this.indexId]1:"+this.tableData[this.indexId].name);
              //数据局部刷新操作
              this.tableData[this.indexId] = this.firstCourseInfo;
              this.tableData[this.indexId] = body;
              console.log("this.tableData[this.indexId]2:"+this.tableData[this.indexId].name);
              this.$refs.firstCourseInfo.resetFields();
              // queryList();
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: desc
              });
              this.$refs.firstCourseInfo.resetFields();
            }
          });
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "更新失败，请重试"
          });
          this.$refs.firstCourseInfo.resetFields();
        }
      });
      this.opType = '';
    }
  }
};
</script>
