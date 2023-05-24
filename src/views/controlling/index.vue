<template>
  <div>
    <el-button type="primary" size="max" @click="addControlling">添加轮播</el-button>
    <el-table border :data="controllingDatas" style="width: 100%;margin-top:20px">
      <el-table-column label="励志语" width="380" prop="sentence" align="center" />
      <el-table-column align="center" label="轮播图" width="680">
        <template slot-scope="scope">
          <img :src="scope.row.pictureUrl" width="100px">
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="controllingDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <controlling :controlling-visible="controllingVisible" :controlling-data="controllingData" :controlling-holse="controllingHolse" />
  </div>
</template>

<script>
import { SearchCarousel, DeleteCarousel } from '../../api/carousel'
import controlling from './controllingVisible.vue'
export default {
  name: 'PugePersonnelMattersSystemIndex',
  components: {
    controlling
  },

  data() {
    return {
      controllingDatas: [], // 轮播图数据
      controllingVisible: false,
      controllingData: {
        pictureUrl: '',
        sentence: ''
      } // 表单数据
    }
  },
  created() {
    // 查询所有轮播图
    this.SearchControlling()
  },

  methods: {
    // 查询所有轮播图
    SearchControlling() {
      SearchCarousel().then(res => {
        this.controllingDatas = res.data.list
      })
    },
    // 添加轮播图
    addControlling() {
      this.controllingVisible = true
    },
    // 删除轮播图
    controllingDelete(id) {
      DeleteCarousel(id).then(res => {
        this.$confirm('确认删除该轮播吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteCarousel(id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.SearchControlling()
          })
        })
      })
    },
    // 关闭弹框,清除表单数据
    controllingHolse() {
      this.controllingVisible = false
      this.controllingData = {
        pictureUrl: '',
        sentence: ''
      }
      this.SearchControlling()
    }
  }
}
</script>

<style lang="scss" scoped></style>
