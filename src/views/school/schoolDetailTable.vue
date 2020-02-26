import Vue from 'vue'
<template>
  <div>
    <el-tag effect="dark">{{schoolDetailForm.schoolName}}</el-tag>
    <el-form :model="schoolDetailForm.describeForm" :inline="true">
      <!-- 学校简介 -->
      <el-divider content-position="left">学校简介</el-divider>
      <el-form-item label="学校简介">
        <div>
      <el-input width="900px" type="textarea" :rows="2"  placeholder="请输入内容" v-model="schoolDetailForm.describeForm.infoContent">
  </el-input>
</div>
        
      </el-form-item>
    </el-form>

  <el-divider content-position="left">院校公告</el-divider>
  <el-divider content-position="right">
        <el-button type="primary" size="medium" @click.native.prevent="addTableItem('title')">+ 添加</el-button>
      </el-divider>
         <el-table 
         :data="this.schoolDetailForm.titleForm.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
         border 
         >
           <el-table-column type="selection"></el-table-column>
           <el-table-column label="序号" type="index" width="94"></el-table-column>
          <el-table-column prop="infoTitle"
           label="公告标题" text-algin="center" width="224">
         </el-table-column>
         <el-table-column prop="infoContent" height="10px" :formatter="stateFormat"
          label="公告内容">
          </el-table-column>
          <el-table-column  label="操作" width="340" >
              <el-table-column label="修改" width="120">
              <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click.native.prevent="editButton(scope.$index,scope.row,'title')"
                  >修改</el-button>
              </template>
            </el-table-column>
            <el-table-column label="删除" width="120">
              <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click.native.prevent="deleteButton(scope.$index,scope.row,'title')"
                  >删除</el-button>
              </template>
            </el-table-column>
              
        </el-table-column>
       </el-table>
       </br>
       <div class="block" align="center">
          <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
            small
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
    
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
      <el-table 
         :data="this.schoolDetailForm.departmentForm.slice((departmentFormCurrentPage - 1) * departmentFormPageSize, departmentFormCurrentPage * departmentFormPageSize)"
         border>
           <el-table-column type="selection"></el-table-column>
           <el-table-column label="序号" type="index" width="94"></el-table-column>
           
           <el-table-column label="招生院系">
             <el-table-column label="院系号" prop="departmentNo"></el-table-column>
             <el-table-column label="院系名称" prop="departmentName"></el-table-column>
           </el-table-column>
           <el-table-column label="下属专业">
             <el-table-column label="专业编码" prop="majorCode"></el-table-column>
             <el-table-column label="专业名称" prop="majorName"></el-table-column>
           </el-table-column>
          <el-table-column  label="操作" width="340" >
              <el-table-column label="修改" width="120">
              <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click.native.prevent="editButton(scope.$index,scope.row,'department')"
                  >修改</el-button>
              </template>
            </el-table-column>
            <el-table-column label="删除" width="120">
              <template slot-scope="scope">
              
                  <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click.native.prevent="deleteButton(scope.$index,scope.row,'department')"
                  >删除</el-button>
                  </template>
            </el-table-column>
              
        </el-table-column>
       </el-table>
       </br>
       <div class="block" align="center">
          <el-pagination
          @size-change="handleSizeChangedepartmentForm"
          @current-change="handleCurrentChangedepartmentForm"
          :current-page="departmentFormCurrentPage"
            small
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>

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
      <el-table 
      :data="this.schoolDetailForm.getStudentForm.slice((getStudentFormCurrentPage - 1) * getStudentFormPageSize, getStudentFormCurrentPage * getStudentFormPageSize)" border>
           <el-table-column type="selection"></el-table-column>
           <el-table-column label="序号" type="index" width="94"></el-table-column>
          <el-table-column prop="infoTitle"
           label="招生简章标题" text-algin="center" width="224">
               <!-- <el-form-item :prop="titleForm.infoTitle"> -->
                 <!-- <el-input v-model="titleForm.infoTitle"></el-input> -->
              <!-- </el-form-item> -->
         </el-table-column>
         <el-table-column prop="infoContent" :formatter="stateFormat"
          label="招生简章内容">
          </el-table-column>
          <el-table-column  label="操作" width="340" >
              
              <el-table-column label="修改" width="120">
              <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click.native.prevent="editButton(scope.$index,scope.row,'getStudent')"
                  >修改</el-button>
              </template>
            </el-table-column>
            <el-table-column label="删除" width="120">
              <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click.native.prevent="deleteButton(scope.$index,scope.row,'getStudent')"
                  >删除</el-button>
              </template>
            </el-table-column>
              
        </el-table-column>
       </el-table>
        </br>
        <!-- 当只有一页时，使用:hide-on-single-page="value"来隐藏分页栏 -->
       <div class="block" align="center">
          <el-pagination
          @size-change="handleSizeChangegetStudentForm"
          @current-change="handleCurrentChangegetStudentForm"
          :current-page="getStudentFormCurrentPage"
            small
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>

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
      <el-table
      :data="this.schoolDetailForm.dispensingForm.slice((dispensingFormCurrentPage - 1) * dispensingFormPageSize, dispensingFormCurrentPage * dispensingFormPageSize)" border>
           <el-table-column type="selection"></el-table-column>
           <el-table-column label="序号" type="index" width="94"></el-table-column>
          <el-table-column prop="infoTitle"
           label="调剂信息标题" text-algin="center" width="224">
         </el-table-column>
         <el-table-column prop="infoContent" :formatter="stateFormat"
          label="调剂信息内容">
          </el-table-column>
          <el-table-column  label="操作" width="340" >
              
              <el-table-column label="修改" width="120">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click.native.prevent="editButton(scope.$index,scope.row,'dispensing')"
                  >修改</el-button>
                </template>
            </el-table-column>
            <el-table-column label="删除" width="120">
              <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click.native.prevent="deleteButton(scope.$index,scope.row,'dispensing')"
                  >删除</el-button>
              </template>
            </el-table-column>
              
        </el-table-column>
       </el-table>
       </br>
       <div class="block" align="center">
          <el-pagination
          @size-change="handleSizeChangedispensingForm"
          @current-change="handleCurrentChangedispensingForm"
          :current-page="dispensingFormCurrentPage"
            small
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
      <!-- <el-button type="primary" icon="el-icon-delete" >返回</el-button> -->
      </br>
      <span align="right" style="display:block">
        <span align="left">
          <el-button type="primary">返回</el-button>
        </span>
        <el-button type="primary" @click.native.prevent="saveAll()">保存</el-button>
      </span>

    <!-- 添加院校公告信息 -->
    <el-dialog :title="opName" :visible.sync="dialogFormVisibleTitleForm" :show-close="showClose">
      <el-form :model="titleForm" ref="firstCourseInfo" :rules="rules" :label-position="labelPosition">
        <el-form-item :label="opInfoTitle" :label-width="formLabelWidth" prop="infoTitle">
          <el-input
            v-model="titleForm.infoTitle"
            autocomplete="off"
            prefix-icon="el-icon-user"
            clearable
          >manaInfo.name</el-input>
        </el-form-item>
        <el-form-item :label="opInfoContent" :label-width="formLabelWidth" prop="infoContent">
          <el-input
            v-model="titleForm.infoContent"
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
          @click.native.prevent="toggleButton('title')"
          round
        >修 改</el-button>
      </div>
    </el-dialog>
    <!-- 添加院系信息 -->
    <el-dialog :title="opName" :visible.sync="dialogFormVisibleDepartmentForm" :show-close="showClose">
      <el-form :model="departmentForm" ref="firstCourseInfo" :rules="rules" :label-position="labelPosition">
        <el-form-item label="院系号" :label-width="formLabelWidth" prop="departmentNo">
          <el-input
            v-model="departmentForm.departmentNo"
            autocomplete="off"
            prefix-icon="el-icon-user"
            clearable
          >manaInfo.name</el-input>
        </el-form-item>
        <el-form-item label="院系名称" :label-width="formLabelWidth" prop="departmentName">
          <el-input
            v-model="departmentForm.departmentName"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="专业代码" :label-width="formLabelWidth" prop="majorCode">
          <el-input
            v-model="departmentForm.majorCode"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="专业名称" :label-width="formLabelWidth" prop="majorName">
          <el-input
            v-model="departmentForm.majorName"
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
          @click.native.prevent="toggleButton('department')"
          round
        >修 改</el-button>
      </div>
    </el-dialog>
    <!-- 添加招生简章信息 -->
    <el-dialog :title="opName" :visible.sync="dialogFormVisibleGetStudentForm" :show-close="showClose">
      <el-form :model="getStudentForm" ref="firstCourseInfo" :rules="rules" :label-position="labelPosition">
        <el-form-item :label="opInfoTitle" :label-width="formLabelWidth" prop="infoTitle">
          <el-input
            v-model="getStudentForm.infoTitle"
            autocomplete="off"
            prefix-icon="el-icon-user"
            clearable
          >manaInfo.name</el-input>
        </el-form-item>
        <el-form-item :label="opInfoContent" :label-width="formLabelWidth" prop="infoContent">
          <el-input
            v-model="getStudentForm.infoContent"
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
          @click.native.prevent="toggleButton('getStudent')"
          round
        >修 改</el-button>
      </div>
    </el-dialog>
    <!-- 添加调剂信息 -->
    <el-dialog :title="opName" :visible.sync="dialogFormVisibleDsipensingForm" :show-close="showClose">
      <el-form :model="dispensingForm" ref="firstCourseInfo" :rules="rules" :label-position="labelPosition">
        <el-form-item :label="opInfoTitle" :label-width="formLabelWidth" prop="infoTitle">
          <el-input
            v-model="dispensingForm.infoTitle"
            autocomplete="off"
            prefix-icon="el-icon-user"
            clearable
          >manaInfo.name</el-input>
        </el-form-item>
        <el-form-item :label="opInfoContent" :label-width="formLabelWidth" prop="infoContent">
          <el-input
            v-model="dispensingForm.infoContent"
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
          @click.native.prevent="toggleButton('dispensing')"
          round
        >修 改</el-button>
      </div>
    </el-dialog>
  </div>
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

/* 重写并增加文本域宽度度 */
.el-textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 900px;
    font-size: inherit;
    color: #606266;
    background-color: #FFF;
    background-image: none;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}

/* 缩小表头整体大小 */
.el-table td, .el-table th {
    padding: 5px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    /* text-align: left; */
}
</style>

<script>
//导入外部接口
import { getSchoolDetailInfo } from "../../api/api";

import { setSchoolDetailInfo } from "../../api/api";
// import { error } from "util";
export default {
  data() {
    return {
      schoolNo: "",
      table_index: 0,
      formLabelWidth: "130px",
      multipleSelection: [],
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
      user: [],
      search: "",
      //不显示模态框右上角X按钮
      showClose:false,
      //院校公告默认页面大小/院校公告当前页
      pageSize: 5,
      currentPage: 1,
      //招生简章默认页面大小/招生简章当前页
      getStudentFormPageSize: 5,
      getStudentFormCurrentPage: 1,
      //调剂信息默认页面大小/调剂信息当前页
      dispensingFormPageSize: 5,
      dispensingFormCurrentPage: 1,
      //院系信息默认页面大小/院系信息当前页
      departmentFormCurrentPage: 1,
      departmentFormPageSize: 5,
      //数据总条数
      total: 0,
      //是否执行加载动作
      //记录当前数据位置
      indexId: 0,
      //模态框的标题名称
      opName: "",
      //调用添加按钮还是修改按钮
      opType: "",
      //需要调用哪个明细信息表格的哪个输入框
      opInfoType:"",
      opInfoTitleType:"",
      opInfoContentType:"",
      //模态框内的输入框标题
      opInfoTitle:"",
      //模态框内的输入框内容
      opInfoContent:"",
      //是否显示院校公告模态框
      dialogFormVisibleTitleForm: false,
      //是否显示院系信息模态框
      dialogFormVisibleDepartmentForm: false,
      //是否显示招生简章模态框
      dialogFormVisibleGetStudentForm: false,
      //是否显示调剂信息模态框
      dialogFormVisibleDsipensingForm: false,
      //改变表单域标签的位置-表单对齐方式
      labelPosition:"left",
      code: "",
      name: "",
      firstCourseCode: "",
      firstCourseName: "",
      //表单暂存数据容器
      storeTempForm:{
            infoNo: "",
            infoType: "title",
            infoTitle: "",
            infoContent: "",
            schoolNo: "",
            createDate: "",
            createTime: "",
            modifyDate: "",
            modifyTime: ""
      },
      //进行表单操作的各个数据
      //院校公告表单
      titleForm:{
        infoNo: "",
            infoType: "title",
            infoTitle: "",
            infoContent: "",
            schoolNo: "",
            createDate: "",
            createTime: "",
            modifyDate: "",
            modifyTime: ""
      },
      //院系信息表单
      departmentForm:{
        departmentId: "",
            departmentNo: "",
            departmentName: "",
            schoolNo: "",
            schoolName: "",
            majorNo: "",
            majorName: "",
            majorCode: "",
      },
      //招生简章表单
      getStudentForm:{
            infoNo: "",
            infoType: "getStudent",
            infoTitle: "",
            infoContent: "",
            schoolNo: "",
            createDate: "",
            createTime: "",
            modifyDate: "",
            modifyTime: ""
      },
      //调剂信息表单:
      dispensingForm:{
            infoNo: "",
            infoType: "dispensing",
            infoTitle: "",
            infoContent: "",
            schoolNo: "",
            createDate: "",
            createTime: "",
            modifyDate: "",
            modifyTime: ""
      },
      //院校明细表格显示的请求数据
      schoolDetailForm: {
        schoolNo: "",
        schoolName: "",
        schoolPojo: {
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
        },
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
          }
      
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
    stateFormat(row, column){
      if(row.infoContent!=null){
        var shortContent = JSON.stringify(row.infoContent).substring(0,30);
        return shortContent;
      }
        

    },
    removeTableItem(index, row, type) {
      var tablename = type + "Form";
      console.log("type类型:" + typeof type);
      //通过变量名的字符串，来获取vue中变量并使用
      this[`${tablename}`].splice(index, 1);
    },
    cancel() {
      this.dialogFormVisible = false;
      //取消显示所有模态框
      this.dialogFormVisibleTitleForm = false;
      this.dialogFormVisibleDepartmentForm = false;
      this.dialogFormVisibleGetStudentForm = false;
      this.dialogFormVisibleDsipensingForm = false;
      //重置模态框信息
      this.titleForm = {infoNo: "",infoType: "title",infoTitle: "",infoContent: "",schoolNo: "",createDate: "",createTime: "",modifyDate: "",modifyTime: ""};
      this.getStudentForm = {infoNo: "",infoType: "title",infoTitle: "",infoContent: "",schoolNo: "",createDate: "",createTime: "",modifyDate: "",modifyTime: ""};
      this.dispensingForm = {infoNo: "",infoType: "title",infoTitle: "",infoContent: "",schoolNo: "",createDate: "",createTime: "",modifyDate: "",modifyTime: ""};
      this.departmentForm = {departmentId: "",departmentNo: "",departmentName: "",schoolNo: "",schoolName: "",majorNo: "",majorName: "",majorCode: ""};
    },
    //院校公告两个分页函数
    handleSizeChange(val) {
      this.pageSize = val;
      console.log("每页" + this.pageSize + "条");
      console.log("每页" + {val} + "条");
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    //招生简章两个分页函数
    handleSizeChangegetStudentForm(val) {
      this.getStudentFormPageSize = val;
      console.log("每页" + this.getStudentFormPageSize + "条");
      console.log("每页" + {val} + "条");
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChangegetStudentForm(val) {
      this.getStudentFormCurrentPage = val;
      console.log(`当前页: ${val}`);
    },
    //调剂信息两个分页函数
    handleSizeChangedispensingForm(val) {
      this.dispensingFormPageSize = val;
      console.log("每页" + this.dispensingFormPageSize + "条");
      console.log("每页" + {val} + "条");
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChangedispensingForm(val) {
      this.dispensingFormCurrentPage = val;
      console.log(`当前页: ${val}`);
    },
    //院系信息两个分页函数
    handleSizeChangedepartmentForm(val) {
      this.departmentFormPageSize = val;
      console.log("每页" + this.departmentFormPageSize + "条");
      console.log("每页" + {val} + "条");
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChangedepartmentForm(val) {
      this.departmentFormCurrentPage = val;
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
          // this.total = body.length;
          console.log("数据总条数："+this.total);
          if (code == 1000) {
            //延时半秒
            setTimeout(() => {
              //隐藏加载动作
              this.loading = false;
            }, 500);
            // this.tableData = body;
            //整理服务端返回的明细信息数据
            //赋值给schoolDetailForm
            this.schoolDetailForm.schoolPojo = body.schoolPojo;
            this.schoolDetailForm.departmentForm = body.departmentPojos; //院系信息
            console.log("body.departmentPojos type:"+ typeof body.departmentPojos);
            this.schoolDetailForm.schoolNo = body.schoolNo; //学校号
            this.schoolDetailForm.schoolName = body.schoolName; //学校名
            // this.schoolDetailForm
            var schoolMainInfoPojoList = body.schoolMainInfoPojos; //学校明细信息
            for (var i = 0; i < schoolMainInfoPojoList.length; i++) {
              if (schoolMainInfoPojoList[i].length > 1) {
                //获取转换成字符串后的信息类型
                var type = schoolMainInfoPojoList[i][0].infoType;
                // var type1 = schoolMainInfoPojoList[i][0].infoType;
                for (var j = 0; j < schoolMainInfoPojoList[i].length; j++) {
                  console.log("j:" + j);
                  console.log("进入多条明细数据逻辑中...")
                  console.log("type: "+type)
                  switch (type) {
                    case "title":
                      this.schoolDetailForm.titleForm = schoolMainInfoPojoList[i];
                      break;
                    case "getStudent":
                      this.schoolDetailForm.getStudentForm = schoolMainInfoPojoList[i];
                      break;
                    case "dispensing":
                      this.schoolDetailForm.dispensingForm = schoolMainInfoPojoList[i];
                      break;
                    case "scholarship":
                      this.schoolDetailForm.scholarshipForm = schoolMainInfoPojoList[i];
                      break;
                    case "describe":
                      this.schoolDetailForm.describeForm = schoolMainInfoPojoList[i];
                      break;
                    default:
                      break;
                  }
                }
              } else {
                var type = schoolMainInfoPojoList[i][0].infoType;
                // var type = json.infoType;
                console.log("测试进入到单条明细数据逻辑中...");
                console.log("type 类型:" + typeof type);
                console.log("type:" + type);
                switch (type) {
                  case "title":
                    this.schoolDetailForm.titleForm = schoolMainInfoPojoList[i];
                    break;
                  case "getStudent":
                    this.schoolDetailForm.getStudentForm = schoolMainInfoPojoList[i];
                    break;
                  case "dispensing":
                    this.schoolDetailForm.dispensingForm = schoolMainInfoPojoList[i];
                    break;
                  case "scholarship":
                    this.schoolDetailForm.scholarshipForm = schoolMainInfoPojoList[i];
                    break;
                  case "describe":
                    this.schoolDetailForm.describeForm = schoolMainInfoPojoList[i][0];
                    // this.schoolDetailForm.describeForm =
                    //   schoolMainInfoPojoList[i][0];
                    //   console.log("在这里-->schoolMainInfoPojoList["+i+"]:"+schoolMainInfoPojoList[i]);
                    //   console.log("在这里-->schoolMainInfoPojoList["+i+"] type :"+ typeof schoolMainInfoPojoList[i]);
                    // this.describeForm = schoolMainInfoPojoList[i][0];
                    break;
                  default:
                    break;
                }
              }
            }
            var smpp = schoolMainInfoPojoList[0].length;
            var s = JSON.stringify(this.schoolDetailForm);
            console.log("length:" + smpp);
            console.log("queryList执行到这里，over");
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
    deleteButton(index, row, s) {
      this.$confirm("确认要删除这条信息吗 ? ", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      }).then(() => {
        switch(s){
          case 'title':
            //删除数据然后更新表格
            this.schoolDetailForm.titleForm.splice(index, 1);
            break;
          case 'getStudent':
            //删除数据然后更新表格
            this.schoolDetailForm.getStudentForm.splice(index, 1);
            break;
          case 'department':
            //删除数据然后更新表格
            this.schoolDetailForm.departmentForm.splice(index, 1);
            break;
          case 'dispensing':
            //删除数据然后更新表格
            this.schoolDetailForm.dispensingForm.splice(index, 1);
            break;
          default:
            break;
        }
              this.$message({
                showClose: true,
                type: "success",
                message: "删除成功!"
              });
              console.log("最新的数据:"+JSON.stringify(this.schoolDetailForm));
      }).catch(() => {
          this.$message({
            showClose: true,
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addTableItem(type) {
      console.log("type类型:" + typeof type);
      this.dialogFormVisible = true;
      switch(type){
        case "title":
          this.opName = "添加院校公告信息";
          this.opInfoTitle = "院校公告标题";
          this.opInfoContent = "院校公告内容";
          this.opType = "add";
          this.dialogFormVisibleTitleForm = true;
          console.log("点击添加后的Form:"+JSON.stringify(this.titleForm));
          break;
        case "getStudent":
          this.opName = "添加招生简章信息";
          this.opInfoTitle = "招生简章标题";
          this.opInfoContent = "招生简章内容";
          this.opType = "add";
          this.dialogFormVisibleGetStudentForm = true;
          break;
        case "dispensing":
          this.opName = "添加调剂信息";
          this.opInfoTitle = "调剂信息标题";
          this.opInfoContent = "调剂信息内容";
          this.opType = "add";
          this.dialogFormVisibleDsipensingForm = true;
          break;
        case "department":
          this.opName = "添加院系信息";
          this.opInfoTitle = "信息标题";
          this.opInfoContent = "信息内容";
          this.opType = "add";
          this.dialogFormVisibleDepartmentForm = true;
          break;
        default:
          break;
      }

      var tablename = "schoolDetailForm." + type + "Form";
      // var tablename = type + "Form";
      console.log("tablename:" + tablename);
      console.log(" this.dialogFormVisibleDepartmentForm:" +  this.dialogFormVisibleDepartmentForm);
    },
    toggleButton(s) {
      console.log("this.opType:" + this.opType);
      console.log("this.opType == 'add':" + (this.opType == "add"));
      console.log("点添加后显示的信息："+s);
      if (this.opType == "add") {
        // addConfirmButton(this.firstCourseInfo);
        //在方法中调用另一个含参方法,根据表单类型调用不同内容的addConfirmButton方法
        switch(s){
          case 'title':
            this.$options.methods.addConfirmButton.bind(this)(s,this.titleForm);
            break;
          case 'getStudent':
            this.$options.methods.addConfirmButton.bind(this)(s,this.getStudentForm);
            break;
          case 'department':
            this.$options.methods.addConfirmButton.bind(this)(s,this.departmentForm);
            break;
          case 'dispensing':
            this.$options.methods.addConfirmButton.bind(this)(s,this.dispensingForm);
            break;
          default:
            break;
        }
        // this.$options.methods.addConfirmButton.bind(this)(this.secondCourseInfo);
      } else if (this.opType == "update") {
        switch(s){
          case 'title':
            this.$options.methods.updateButton.bind(this)(s,this.titleForm);
            break;
          case 'getStudent':
            this.$options.methods.updateButton.bind(this)(s,this.getStudentForm);
            break;
          case 'department':
            this.$options.methods.updateButton.bind(this)(s,this.departmentForm);
            break;
          case 'dispensing':
            this.$options.methods.updateButton.bind(this)(s,this.dispensingForm);
            break;
          default:
            break;
        }
      }
    },

    addConfirmButton(s,dataForm) {
          var json = dataForm;
          dataForm.schoolNo = this.schoolNo + "";
          json = JSON.stringify(json);
          console.log("json-->" + typeof json);
          console.log("json-->" + json);
          // console.log("添加之前this.schoolDetailForm.titleForm.length:"+this.schoolDetailForm.titleForm.length);
          // console.log("this.schoolDetailForm.titleForm[this.schoolDetailForm.titleForm.length]:"+JSON.stringify(this.schoolDetailForm.titleForm[this.schoolDetailForm.titleForm.length-1]));
          console.log("shortContent-->" + shortContent);
          switch(s){
          case 'title':
            var shortContent = dataForm.infoContent;
            this.schoolDetailForm.titleForm.push(dataForm);//添加到明细信息集合中
            this.dialogFormVisibleTitleForm = false; //隐藏表单
            //清空表单内容，以便下次添加信息
            this.titleForm = {infoNo: "",infoType: "title",infoTitle: "",infoContent: "",schoolNo: "",createDate: "",createTime: "",modifyDate: "",modifyTime: ""};
            break;
          case 'getStudent':
            this.schoolDetailForm.getStudentForm.push(dataForm);//添加到明细信息集合中
            this.dialogFormVisibleGetStudentForm = false; //隐藏表单
            //清空表单内容，以便下次添加信息
          this.getStudentForm = {infoNo: "",infoType: "getStudent",infoTitle: "",infoContent: "",schoolNo: "",createDate: "",createTime: "",modifyDate: "",modifyTime: ""};
            break;
          case 'department':
            this.schoolDetailForm.departmentForm.push(dataForm);//添加到明细信息集合中
            this.dialogFormVisibleDepartmentForm = false; //隐藏表单
            //清空表单内容，以便下次添加信息
            this.departmentForm = {departmentId: "",departmentNo: "",departmentName: "",schoolNo: "",schoolName: "",majorNo: "",majorName: "",majorCode: ""};
            break;
          case 'dispensing':
            this.schoolDetailForm.dispensingForm.push(dataForm);//添加到明细信息集合中
            this.dialogFormVisibleDsipensingForm = false; //隐藏表单
            //清空表单内容，以便下次添加信息
            this.dispensingForm = {infoNo: "",infoType: "dispensing",infoTitle: "",infoContent: "",schoolNo: "",createDate: "",createTime: "",modifyDate: "",modifyTime: ""};
            break;
          default:
            break;
        }
          console.log("添加之后this.schoolDetailForm.titleForm.length:"+this.schoolDetailForm.titleForm.length);
          console.log("addConfirmButton方法接收到的参数s: "+s+", dataForm: "+json);
          console.log("最新的数据:"+JSON.stringify(this.schoolDetailForm));
          
          // this.$nextTick(()=>{
          //           this.$refs[dataForm].resetFields();
          //       })
    },
    editButton(index, row,s) {
      let _row;
       switch(s){
        case "title":
          this.opName = "修改院校公告信息";
          this.opInfoTitle = "院校公告标题";
          this.opInfoContent = "院校公告内容";
          this.opType = "update";
          this.dialogFormVisibleTitleForm = true;
          _row = row;
          this.indexId = index;
          //将每一行的数据放到对话框中
          this.titleForm = Object.assign({}, _row); // editForm是Dialog弹框的data
          console.log("点击添加后的Form:"+JSON.stringify(this.titleForm));
          console.log("选择当前[" + this.indexId + "]行");
          break;
        case "getStudent":
          this.opName = "修改招生简章信息";
          this.opType = "update";
          this.dialogFormVisibleGetStudentForm = true;
          _row = row;
          this.indexId = index;
          //将每一行的数据放到对话框中
          this.getStudentForm = Object.assign({}, _row); // editForm是Dialog弹框的data
          console.log("点击添加后的Form:"+JSON.stringify(this.getStudentForm));
          console.log("选择当前[" + this.indexId + "]行");
          break;
        case "dispensing":
          this.opName = "修改调剂信息";
          this.opInfoTitle = "调剂信息标题";
          this.opInfoContent = "调剂信息内容";
          this.opType = "update";
          this.dialogFormVisibleDsipensingForm = true;
          _row = row;
          this.indexId = index;
          //将每一行的数据放到对话框中
          this.dispensingForm = Object.assign({}, _row); // editForm是Dialog弹框的data
          console.log("点击添加后的Form:"+JSON.stringify(this.dispensingForm));
          console.log("选择当前[" + this.indexId + "]行");
          break;
        case "department":
          this.opName = "修改院系信息";
          this.opInfoTitle = "信息标题";
          this.opInfoContent = "信息内容";
          this.opType = "update";
          this.dialogFormVisibleDepartmentForm = true;
          _row = row;
          this.indexId = index;
          //将每一行的数据放到对话框中
          this.departmentForm = Object.assign({}, _row); // editForm是Dialog弹框的data
          console.log("点击添加后的Form:"+JSON.stringify(this.departmentForm));
          console.log("选择当前[" + this.indexId + "]行");
          break;
        default:
          break;
      }
    },
    updateButton(s,dataForm) {
          var json = dataForm;
          json = JSON.stringify(json);
          console.log("json-->" + typeof json);
          console.log("json-->" + json);
          console.log("添加之前this.schoolDetailForm.titleForm.length:"+this.schoolDetailForm.titleForm.length);
          console.log("this.schoolDetailForm.titleForm[this.schoolDetailForm.titleForm.length]:"+JSON.stringify(this.schoolDetailForm.titleForm[this.schoolDetailForm.titleForm.length-1]));
          switch(s){
            case 'title':
              //数据局部刷新操作
              console.log("this.indexId-->" + this.indexId);
              this.schoolDetailForm.titleForm[this.indexId] = dataForm;
              this.dialogFormVisibleTitleForm = false; //隐藏表单
              this.$options.methods.TimeOutF.bind(this)();//调用延时函数
              this.opType = "";
              //清空表单内容，以便下次进行修改信息操作
              this.titleForm = {infoNo: "",infoType: "title",infoTitle: "",infoContent: "",schoolNo: "",createDate: "",createTime: "",modifyDate: "",modifyTime: ""};
              break;
            case 'getStudent':
              //数据局部刷新操作
              console.log("this.indexId-->" + this.indexId);
              this.schoolDetailForm.getStudentForm[this.indexId] = dataForm;
              this.dialogFormVisibleGetStudentForm = false; //隐藏表单
              this.$options.methods.TimeOutF.bind(this)();//调用延时函数
              this.opType = "";
              //清空表单内容，以便下次添加信息
            this.getStudentForm = {infoNo: "",infoType: "title",infoTitle: "",infoContent: "",schoolNo: "",createDate: "",createTime: "",modifyDate: "",modifyTime: ""};
              break;
            case 'department':
              //数据局部刷新操作
              console.log("this.indexId-->" + this.indexId);
              this.schoolDetailForm.departmentForm[this.indexId] = dataForm;
              this.dialogFormVisibleDepartmentForm = false; //隐藏表单
              this.$options.methods.TimeOutF.bind(this)();//调用延时函数
              this.opType = "";
              //清空表单内容，以便下次添加信息
              this.departmentForm = {departmentId: "",departmentNo: "",departmentName: "",schoolNo: "",schoolName: "",majorNo: "",majorName: "",majorCode: ""};
              break;
            case 'dispensing':
              //数据局部刷新操作
              console.log("this.indexId-->" + this.indexId);
              this.schoolDetailForm.dispensingForm[this.indexId] = dataForm;
              this.dialogFormVisibleDsipensingForm = false; //隐藏表单
              this.$options.methods.TimeOutF.bind(this)();//调用延时函数
              this.opType = "";
              //清空表单内容，以便下次添加信息
              this.dispensingForm = {infoNo: "",infoType: "title",infoTitle: "",infoContent: "",schoolNo: "",createDate: "",createTime: "",modifyDate: "",modifyTime: ""};
              break;
            default:
              break;
        }
        console.log("添加之后this.schoolDetailForm.titleForm.length:"+this.schoolDetailForm.titleForm.length);
        console.log("addConfirmButton方法接收到的参数s: "+s+", dataForm: "+json);
        console.log("最新的数据:"+JSON.stringify(this.schoolDetailForm));
    },
    //延时2秒
  TimeOutF(){
    setTimeout(() => {this.loading = false;}, 200);
    this.$message({showClose: true,type: "success",message: "更新成功"});
  },
  saveAll(){
      // console.log("需传到后台的数据:"+JSON.stringify(this.schoolDetailForm));
      this.schoolDetailForm.describeForm.infoTitle = this.schoolDetailForm.schoolName+"简介";
      setSchoolDetailInfo(this.schoolDetailForm).then(
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
                  message: "院校明细信息更新成功"
                });
                // this.$refs.firstCourseInfo.resetFields();
                this.opName = '';
                this.opType = '';
                this.$options.methods.queryList.bind(this)();
                // this.$router.push("/home/schoolDetailInfo?schoolNo="+this.schoolNo);
              } else if (code === 1006) {
                this.$message.error(desc);
                this.opName = '';
                this.opType = '';
                this.$refs.firstCourseInfo.resetFields();
                this.$router.push("/home/schoolDetailInfo?schoolNo="+this.schoolNo);
              } else {
                this.$message({
                  message: desc,
                  type: "warning"
                });
                this.opName = '';
                this.opType = '';
                // this.$refs.firstCourseInfo.resetFields();
              }
            },
            error => {
              this.$message.error("网络开小差了，请稍后再试~");
              // this.$refs.firstCourseInfo.resetFields();
              // this.$router.push("/home/schoolDetailTable");
              this.$router.push("/home/schoolDetailInfo?schoolNo="+this.schoolNo);
            }
          );
  }
  }
  
};
</script>
