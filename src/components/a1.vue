<template>
<div>

<el-table-column label="编辑">
                <template slot-scope="scope">
                    <router-link to="/a2">
                      <el-button type="primary" icon="el-icon-edit" @click='update()'>编辑</el-button>
                    </router-link>
                </template>
	</el-table-column>

  <el-carousel :interval="2000" type="card" height="200px">
    <el-carousel-item v-for="item in showCard" :key="item.content">
      <h3>{{ item.content }}</h3>
    </el-carousel-item>
  </el-carousel>
  
   
</div>
</template>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<script>
export default {
  data() {
    return {
      //轮播图数据
      showCard: [
        {
          content: "Java"
        },
        {
          content: "Python"
        },
        {
          content: "JavaScript"
        },
        {
          content: "Go"
        },
        {
          content: "Php"
        },
        {
          content: "Scala"
        }
      ],
    };
  },
  created(){
    
  },
  methods: {
	update(){
		this.$router.push({
			path:'/a2'
		});
	}
  }
};
</script>