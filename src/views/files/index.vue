<!--  -->
<template>
  <div class="files">
    <div class="files-find">
      <!-- 模糊搜索 -->
      <div style="margin-top: 15px;">
        <el-input v-model="fileName" placeholder="请输入内容" clearable class="input-with-select" @clear="ClearInput">
          <el-select slot="prepend" v-model="label" placeholder="请选择" @change="searchFiless()">
            <el-option label="全体" value="全体" />
            <el-option label="前端" value="前端" />
            <el-option label="后端" value="后端" />
            <el-option label="实习生" value="实习生" />
            <el-option label="" value="" />
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="searchFiless()" />
        </el-input>
        <el-button type="success" size="medium" @click="reset()">重置</el-button>
      </div>
      <el-button type="primary" size="medium" @click="openPopup() ">添加</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="fileInformation" border stripe max-height="600px" table-layout:fixed>
      <el-table-column align="center" type="index" label="序号" width="60" />
      <el-table-column align="center" width="250" prop="fileName" label="文件名" />
      <el-table-column align="center" width="200" prop="label" label="标签" />
      <el-table-column align="center" width="450" prop="summary" label="文件描述">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.summary" placement="top">
            <div class="table-title">{{ scope.row.summary }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="gmtModified" width="200" label="上传时间" />
      <el-table-column align="center" prop="authorName" label="上传者" />
      <el-table-column align="center" width="400" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="medium" @click="fileDelete(scope.row.id)">删除 </el-button>
          <el-button type="primary" size="medium" @click="download(scope.row)">下载 </el-button>
          <el-button type="primary" size="medium" @click="showModal(scope.row)">编辑 </el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        :total="total"
        :current-change="current"
        :page-sizes="[10, 20, 30, 40]"
        :size-change="size"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onShowSizeChange"
        @current-change="onChange"
      />
    </div>
    <child v-if="formVisible" :form-visible="formVisible" :remote-close-file="remoteCloseFile" :file-form="fileForm" :remote-close="remoteClose" />
  </div>
</template>

<script>
import child from '@/views/files/child'
import { searchFile, deleteFile, downloadFile } from '@/api/file'
import { download } from '~/utils/download'
export default {
  components: {
    child
  },
  data() {
    return {
      // 总条目数
      total: 100,
      // 当前页数
      current: 1,
      // 每页显示个数
      size: 10,
      // 搜索框
      fileName: '',
      // 搜索框——标签
      label: '',
      // 表格数据
      fileInformation: [],
      // 表单内容
      fileForm: {
        name: '',
        describe: '',
        uploader: '',
        tag: '',
        date: '',
        upload: '',
        fileUrl: '',
        id: ''
      },
      // 弹出框
      formVisible: false
    }
  },
  created() {
    this.__init()
  },
  methods: {
    /**
     * 初始化页面
     */
    __init() {
      this.getFile()
    },
    /**
     * 获取文件数据
    */
    getFile() {
      searchFile({ current: this.current, size: this.size, fileName: this.fileName, label: this.label }).then(res => {
        this.total = res.data.fileIPage.total
        this.fileInformation = res.data.fileIPage.records
      })
    },
    /**
     * 监听页数
    */
    onChange(current) {
      this.current = current
      this.getFile()
    },
    /**
     * 监听条数
    */
    onShowSizeChange(size) {
      this.size = size
      this.getFile()
    },
    // 打开弹出框
    openPopup(id) {
      this.formVisible = true
      this.fileForm = {}
    },
    // 弹出框关闭
    remoteClose() {
      this.formVisible = false
      this.fileForm = {
        name: '',
        describe: '',
        uploader: '',
        tag: '',
        date: '',
        upload: '',
        fileUrl: '',
        id: ''
      }
      this.getFile()
    },
    // 清除上传文件
    remoteCloseFile() {
      this.fileForm.fileUrl = ''
    },
    // 删除
    fileDelete(id) {
      this.$confirm('是否确认删除？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          deleteFile(id).then(res => {
            this.getFile()
          })
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '放弃删除并离开页面'
              : '停留在当前页面'
          })
        })
    },
    // 编辑
    showModal(res) {
      // 弹出窗口
      this.openPopup()
      this.fileForm = res
    },
    // 搜索
    searchFiless() {
      searchFile({ current: 1, size: this.size, fileName: this.fileName, label: this.label }).then(res => {
        this.total = res.data.fileIPage.total
        this.fileInformation = res.data.fileIPage.records
      })
    },
    // 下载
    download(row) {
      downloadFile(row.id).then(res => {
        download(res.data.url)
      })
    },
    // 清除弹框
    ClearInput() {
      this.searchFiless()
    },
    // 重置
    reset() {
      this.fileName = ''
      this.label = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.files {
  height: 95%;
  background-color: whitesmoke;
  .files-find {
    height: 50px;
    .el-input {
      width: 510px;
      float: left;
    }
    .el-button {
      float: left;
      margin:0 30px;
    }
  }
  /deep/ .is-scrolling-none{
    height: 100%;
  }
  .block {
    margin-top: 25px;
    background-color: whitesmoke;
    text-align: center;
  }
}
.el-select {
    width: 100px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .table-title {
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }

</style>
