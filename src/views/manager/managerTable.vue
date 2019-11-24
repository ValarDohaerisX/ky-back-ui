import Vue from 'vue'
<template  >
  <!-- :filters="filterByName" -->
  <div>
    <el-table
      :data="this.tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%"
      highlight-current-row
      :index="table_index"
      ref="multipleTable"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <!-- @filter-change="filterTagTable" -->

      <!-- ||tableData. -->
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column
        v-for="(data,index) in tableHeader"
        :show-overflow-tooltip="true"
        :key="index"
        :prop="data.prop"
        :label="data.label"
        :min-width="data['min-width']"
        :align="data.align"
      ></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入名称关键字搜索" />
          <!-- :fetch-suggestions="querySearch" -->
        </template>
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-delete"
            @click.native.prevent="confirmRegButton(scope.$index,scope.row)"
          >批准</el-button>
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
        :page-sizes="[5,6,7, 10, 15, 20,50,100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </div>
    <!-- 修改信息 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="manaInfo" ref="manaInfo" :rules="rules">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
          <el-input
            v-model="manaInfo.name"
            autocomplete="off"
            prefix-icon="el-icon-user"
            style="width:70%"
            clearable
          >manaInfo.name</el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input
            type="text"
            v-model="manaInfo.password"
            autocomplete="off"
            style="width:70%"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth">
          <el-select v-model="manaInfo.manaPemission" placeholder="请选择权限">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" round>取 消</el-button>
        <el-button type="primary" @click.native.prevent="updateButton('manaInfo')" round>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//导入外部接口
import { allManaList } from "../../api/api";
import { deleteManaInfo } from "../../api/api";
import { confirmReg } from "../../api/api";
import { updateManaInfo } from "../../api/api";
// import { error } from "util";
export default {
  data() {
    return {
      table_index: 0,
      formLabelWidth: "130px",
      multipleSelection: [],
      dialogFormVisible: false,
      pemissionRadioGroup: 1,
      manaInfo: [
        {
          id: "",
          name: "",
          password: "",
          manaPemission: ""
        }
      ],
      tableDataTempScore: [],
      tableData: [
        {
          id: 0,
          name: "王小虎1",
          password: "sd",
          manaPemission: 3,
          manaType: "三级管理员",
          appFlag: 1,
          date: "2016-05-02",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      search: "",
      tableHeader: [
        {
          label: "Id",
          prop: "id",
          "min-width": 20,
          align: "center"
        },
        {
          label: "名称",
          prop: "name",
          "min-width": 40,
          align: "center"
        },
        {
          label: "密码",
          prop: "password",
          "min-width": 40,
          align: "center"
        },
        {
          label: "权限等级",
          prop: "manaPemission",
          "min-width": 25,
          align: "center"
        },
        {
          label: "权限类别",
          prop: "manaType",
          "min-width": 30,
          align: "center"
        },
        {
          label: "是否批准",
          prop: "appFlag",
          "min-width": 30,
          align: "center"
        }
      ],
      //默认页面大小
      pageSize: 6,
      //当前页
      currentPage: 1,
      //数据总条数
      total: 0,
      //是否执行加载动作
      loading: true,
      //记录当前数据位置
      indexId: 0,
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        name: [
          { required: true, message: "用户名最少为3个字符", trigger: "blur" },
          { min: 1, max: 11, message: "长度在3到11个字符之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码最少为4个字符", trigger: "blur" },
          { min: 1, max: 11, message: "长度在4到11个字符之间", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    search: function() {
      // this.search = val;
      var search = this.search;
        console.log("search-->" + search);
      var tableData = this.tableData;
      var tableDataTempScore = this.tableDataTempScore;
      if (search != "" && search != null) {
        tableData = this.tableData.filter(tableData =>!search ||tableData.name.toLowerCase().includes(this.search.toLowerCase()));
        this.tableData = tableData;
        // tableData = JSON.stringify(tableData);
        tableData = JSON.stringify(tableData);
        // this.$message({
        //   showClose: true,
        //   type: "success",
        //   // message: "oldVal:"+oldval+"\nval:"+val
        //   message: "不为空" + tableData
        // });
        // this.tableData = tableData;
        
        console.log("tableData11-->" + tableData);
      } else {
        tableData = tableDataTempScore;
        this.tableData = tableData;
        tableData = JSON.stringify(tableData);
        // this.$message({
        //   showClose: true,
        //   type: "success",
        //   // message: "oldVal:"+oldval+"\nval:"+val
        //   message: "为空" + tableData
        // });
        
        tableData = JSON.stringify(tableData);
        console.log("tableData12-->" + tableData);
      }
    }
  },
  //过滤器
  filters: {
    // filterByName(){
    // }
  },
  computed: {},
  created() {
    this.queryList();
  },
  methods: {
    filterTagTable(filter) {},
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
      allManaList().then(
        result => {
          console.log("reusult1-->" + result);
          var json = JSON.stringify(result);
          var code = result.returnCode.code;
          var desc = result.returnCode.desc;
          var body = result.body;
          this.total = body.length;

          console.log("total--->" + this.total);
          console.log("appFlag--->" + body[0].appFlag);
          if (code == 1000) {
            for (var i = 0; i < this.total; i++) {
              if (body[i].appFlag == 1) {
                console.log("appFlag1-->" + body[i].appFlag);
                body[i].appFlag = "已批准";
              } else {
                console.log("appFlag2-->" + body[i].appFlag);
                body[i].appFlag = "未批准";
              }
            }
            //延时半秒
            setTimeout(() => {
              //隐藏加载动作
              this.loading = false;
            }, 500);
            this.tableData = body;
            this.tableDataTempScore = body;
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
          deleteManaInfo(row.id).then(result => {
            console.log("result-->" + result);
            if (result == true) {
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
                message: "请勿进行重复删除操作!"
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
    //批准确认按钮
    confirmRegButton(index, row) {
      console.log("c index-->" + index);
      console.log("c row-->" + row);
      confirmReg(row.id).then(result => {
        console.log("result-->" + result);
        var code = result.returnCode.code;
        var desc = result.returnCode.desc;
        var body = result.body;
        if (code == 1000) {
          this.tableData[index].appFlag = "已批准";
          this.$message({
            showClose: true,
            type: "success",
            message: "已批准"
          });
        } else if (code == 1004) {
          this.$message({
            showClose: true,
            type: "error",
            message: desc
          });
        } else if (code == 1006) {
          this.$message({
            showClose: true,
            type: "warning",
            message: desc
          });
        }
      });
    },
    editButton(index, row) {
      this.name = row.name;
      console.log("name:" + this.name);
      this.password = row.password;
      this.manaPemission = row.manaPemission;
      this.dialogFormVisible = true;
      let _row = row;
      this.indexId = index;
      //将每一行的数据放到对话框中
      this.manaInfo = Object.assign({}, _row); // editForm是Dialog弹框的data
    },
    updateButton(manaInfo) {
      this.$refs.manaInfo.validate(valid => {
        if (valid) {
          if (this.manaInfo.appFlag == "已批准") {
            this.manaInfo.appFlag = 1;
          } else {
            this.manaInfo.appFlag = 0;
          }
          updateManaInfo(this.manaInfo).then(result => {
            var code = result.returnCode.code;
            var desc = result.returnCode.desc;
            var body = result.body;
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
              this.$refs.manaInfo.resetFields();
              //数据局部刷新操作
              this.tableData[this.indexId] = body;
              // console.log("index"+this.indexId);
              // console.log("body-name1:" + this.tableData[this.indexId].name);
              // console.log("body-name2:" + body.name);
              // this.$set(this.tableData[this.indexId], 'manaInfo',body);

              // console.log("path：" + this.$route.path);
            } else {
              this.$message({
                showClose: true,
                type: "error",
                message: desc
              });
              this.$refs.manaInfo.resetFields();
            }
          });
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: "更新失败，请重试"
          });
          this.$refs.manaInfo.resetFields();
        }
      });
    }
  }
};
</script>
