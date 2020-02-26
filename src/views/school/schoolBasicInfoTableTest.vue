import Vue from 'vue'
<template>
<el-table :data="data01.Content.MDM017402" border height="350" style="width:90%;margin-top: 15px;">
				<el-table-column fixed="left" label="MRO客户抬头" width="320">
					<template slot-scope="scope">
						<el-input v-model="scope.row.MROCardName ">
							<i slot="suffix" @click="openCardCode('MROCardName','MROCardCode',scope.$index)" class="el-input__icon el-icon-search"></i>
						</el-input>
					</template>
				</el-table-column>
				<el-table-column label="MRO分配金额" width="320">
					<template slot-scope="scope">
						<!-- {{ scope.row.MROAmount }}-->
						<el-input v-model="scope.row.MROAmount" type="number"></el-input>
					
					</template>
				</el-table-column>
				<el-table-column label="大宗客户抬头" width="320">
					<template slot-scope="scope">
						<el-input v-model="scope.row.DZCardName">
							<i slot="suffix" @click="openCardCode('DZCardName','DZCardCode',scope.$index)" class="el-input__icon el-icon-search"></i>
						</el-input>
					</template>
				</el-table-column>
				<el-table-column label="大宗分配额" width="320">
					<template slot-scope="scope">
						<!--   {{ scope.row.DZAmount }}-->
						<el-input v-model="scope.row.DZAmount"  type="number"></el-input>
					</template>
				</el-table-column>

				<el-table-column label="操作" width="220">
					<template slot-scope="scope">
						<el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
</template>
<script>
  export default {
    data() {
      return {
        data01: {
           Content:{
                MDM017402:{
                    "MROCardCode":"",
					"MROCardName":"",					
					"DZCardCode":"",
					"DZCardName":"",
					"MROAmount":'',
					"DZAmount":''
                }
            }
        },
        
      };
    },
    methods: {
      AddListRow() {
				this.data01.Content.MDM017402.push({
					"MROCardCode":"",
					"MROCardName":"",					
					"DZCardCode":"",
					"DZCardName":"",
					"MROAmount":'',
					"DZAmount":''
				});
            },
            handleDelete(index) {
				this.data01.Content.MDM017402.splice(index, 1);
			}, 
    }
  }
</script>
