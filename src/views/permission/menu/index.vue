<template>
  <div class="app-container">

    <el-form
      :rules="rules"
      :inline="true"
      :model="query"
      size="mini"
    >
      <el-form-item>
        <el-button
          v-if="menuId"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="allocation()"
        >分配</el-button>
        <el-button
          v-if="!menuId"
          v-permission="'menu:add'"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="handleAdd(0)"
        >添加</el-button>
      </el-form-item>
    </el-form>

    <button-tab
      v-model="activeTab"
      :options="tabsOptions"
      @click.native="changeTab"
    />

    <el-table
      ref="dataTable"
      :data="list"
      border
      stripe
      style="width: 100%;height: 100%;"
      row-key="id"
      :tree-props="{children: 'children'}"
      :header-cell-style="{ background: '#fafafa' }"
      :row-class-name="rowClassNameFun"
      :header-row-class-name="headerRowClassName"
      @select="selectFun"
      @select-all="selectAllFun"
    >
      <el-table-column
        v-if="menuId"
        reserve-selection
        type="selection"
        width="55"
      />
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="60"
      />
      <el-table-column
        align="center"
        prop="name"
        label="名称"
      />
      <el-table-column
        align="center"
        prop="url"
        label="请求地址"
      />
      <el-table-column
        align="center"
        prop="code"
        label="权限标识"
      />
      <el-table-column
        align="center"
        prop="systemType"
        label="系统标识"
      />
      <el-table-column
        align="center"
        prop="type"
        label="类型"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.type ===1">目录</span>
          <span v-if="scope.row.type ===2">菜单</span>
          <span v-if="scope.row.type ===3">按钮</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="icon"
        label="图标"
      >
        <template slot-scope="scope">
          <i :class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="排序"
        prop="sort"
      />
      <el-table-column
        v-if="!menuId"
        align="center"
        label="操作"
        width="260px"
      >
        <template slot-scope="scope">
          <el-button
            v-permission="'menu:add'"
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="handleAdd(scope.row.id)"
          >
            新增
          </el-button>
          <el-button
            v-permission="'menu:edit'"
            type="success"
            size="mini"
            @click="handleEdit(scope.row.id)"
          >
            编辑
          </el-button>
          <el-button
            v-permission="'menu:delete'"
            type="danger"
            size="mini"
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit
      :title="edit.title"
      :visible="edit.visible"
      :form="edit.formData"
      :remote-close="remoteClose"
    />
  </div>
</template>
<script>
import { menuSearch, DeleteMenu, SeeMenu } from '~/api/permission/menuRole'
import { systemSearch } from '~/api/permission/systemRole'
import Edit from './edit'
import ButtonTab from '~/components/Tabs/ButtonTab.vue'
import { addResizeListener } from '~/utils/addEventListener'
export default {
  components: {
    ButtonTab,
    Edit
  },

  props: {
    menuId: {
      type: [String, Number, Array],
      default: null
    }
  },
  data() {
    return {
      checkedKeys: false, // 是否全部选中
      list: [], // 列表数据
      query: {}, // 查询条件
      edit: {
        title: '',
        visible: false,
        formData: {}
      },
      page: {
        current: 1,
        size: 1
      },
      activeTab: '88',
      tabsOptions: [],
      CollectionMenuList: [],
      loading: false,
      maxHeight: 0,
      paddingBottom: 20,
      headerHeight: 225,
      ids: [],
      listIds: [],
      selectArr: this.menuId,
      rules: {
        menuname: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      },
      collectList: this.selectArr,
      recode: []
    }
  },

  watch: {
    // list: {
    //   handler() {
    //     this.fetchSystem()
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.fetchData()
    addResizeListener(this.$el, this.updateTableHeight)
    this.$nextTick(() => {
      this.updateTableHeight()
    })
  },
  methods: {
    updateTableHeight() {
      this.maxHeight = window.innerHeight - (20 + this.paddingBottom + this.headerHeight)
    },
    async fetchData(query = { name: '' }) {
      if (this.selectArr) {
        this.ids = this.selectArr.map(item => {
          return item.menuId
        })
      }
      const params = {
        current: this.page.current,
        size: this.page.size,
        ...query
      }
      const { data } = await menuSearch(params)
      if (this.activeTab === '66') {
        this.list = data.menus.systemCTree
      } else if (this.activeTab === '88') {
        this.list = data.menus.systemPeopleTree
      } else if (this.activeTab === '99') {
        this.list = data.menus.systemControllerTree
      }
      this.initData(this.list)
      // 初始化数据格式
      // this.checkedRoles()
      this.fetchSystem()
    },
    calleArr(array) {
      if (this.ids.includes(array.id)) {
        this.$refs.dataTable.toggleRowSelection(array, true)
      }
      if (array.children && Array.isArray(array.children) && array.children.length !== 0) {
        for (const i in array.children) {
          const data = array.children[i]
          this.calleArr(data)
        }
      }
      // this.selectAllFun(array);
    },
    checkedRoles() {
      if (this.ids) {
        this.list.forEach(item => {
          this.calleArr(item)
        })
      }
    },
    initData(data) {
      data.forEach((item) => {
        const m = this.selectArr.some((items) => {
          // console.log(items);
          return items.menuId === item.id
        })
        if (m) {
          item.isSelect = true // 默认为选中
          this.$refs.dataTable.toggleRowSelection(item, true)
          // this.setRowIsSelect(item);
        } else {
          item.isSelect = false // 默认为不选中
        //   this.$refs.dataTable.toggleRowSelection(item, false)
          // this.setRowIsSelect(item);
          // this.$refs.dataTable.toggleRowSelection(item, true)
        }
        if (item.children && item.children.length) {
          this.initData(item.children)
        }
      })
    },
    async fetchSystem() {
      const { data } = await systemSearch()
      this.tabsOptions =
        data &&
        data.systemList.map((item, index) => {
          return {
            name: item.systemType,
            label: item.systemName
          }
        })
    },
    collect(data) {
      data.forEach(item => {
        const m = this.selectArr.findIndex(items => {
          return items.menuId === item.id
        })
        console.log(m)

        if (m !== -1) {
          if (!item.isSelect) {
            this.selectArr.splice(m, 1)
          }
        } else {
          if (item.isSelect) {
            this.selectArr.push({
              menuId: item.id,
              systemType: item.systemType
            })
          }
        }
        if (item.children && item.children.length) {
          this.collect(item.children)
        }
      })
    },
    changeTab() {
    //   this.$forceUpdate();
      this.collect(this.list)
      this.fetchData()
    },
    handleAdd(id) {
      this.edit.formData.parentId = id
      this.edit.title = '新增'
      this.edit.visible = true
    },
    handleEdit(id) {
      SeeMenu(id).then(res => {
        this.edit.formData = res.data.menu
        this.edit.title = '编辑'
        this.edit.visible = true
      })
    },
    handleDelete(id) {
      this.$confirm('确认删除该菜单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        DeleteMenu(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.fetchData()
        })
      })
    },
    CollectionMenu(val) {
      this.CollectionMenuList = val
      this.$set(this.CollectionMenu, 'systemType', this.activeTab)
    },
    allocation() {
      this.changeTab()
      this.$emit('saveRoleMenu', this.selectArr)
    },
    collectData(data) {
      data.forEach((item) => {
        if (item.isSelect === true) {
          this.collectList.push(item)
        }
        if (item.children && item.children.length) {
          this.collectData(item.children)
        }
      })
    },
    reload() {
      this.query = {}
      this.fetchData()
    },
    remoteClose() {
      this.edit.formData = {}
      this.edit.visible = false
      this.fetchData()
    },

    selectFun(selection, row) {
      this.setRowIsSelect(row)
    },
    setRowIsSelect(row) {
      // 当点击父级点复选框时，当前的状态可能为未知状态，所以当前行状态设为false并选中，即可实现子级点全选效果
      if (row.isSelect === '') {
        row.isSelect = false
        this.$refs.dataTable.toggleRowSelection(row, true)
      }
      row.isSelect = !row.isSelect
      const that = this

      function selectAllChildrens(data) {
        data.forEach((item) => {
          item.isSelect = row.isSelect
          that.$refs.dataTable.toggleRowSelection(item, row.isSelect)
          if (item.children && item.children.length) {
            selectAllChildrens(item.children)
          }
        })
      }

      function getSelectStatus(selectStatuaArr, data) {
        data.forEach((childrenItem) => {
          selectStatuaArr.push(childrenItem.isSelect)
          if (childrenItem.children && childrenItem.children.length) {
            getSelectStatus(selectStatuaArr, childrenItem.children)
          }
        })
        return selectStatuaArr
      }
      function getLevelStatus(row) {
        // 如果当前节点的parantId =0 并且有子节点，则为1
        // 如果当前节点的parantId !=0 并且子节点没有子节点 则为3
        if (row.parentId == 0) {
          if (row.children && row.children.length) {
            return 1
          } else {
            return 4
          }
        } else {
          if (!row.children || !row.children.length) {
            return 3
          } else {
            return 2
          }
        }
      }
      let result = {}
      // 获取明确的节点
      function getExplicitNode(data, parentId) {
        data.forEach((item) => {
          if (item.id == parentId) {
            result = item
          }
          if (item.children && item.children.length) {
            getExplicitNode(item.children, parentId)
          }
        })
        return result
      }
      function operateLastLeve(row) {
        // 操作的是子节点  1、获取父节点  2、判断子节点选中个数，如果全部选中则父节点设为选中状态，如果都不选中，则为不选中状态，如果部分选择，则设为不明确状态
        let selectStatuaArr = []
        const item = getExplicitNode(that.list, row.parentId)
        selectStatuaArr = getSelectStatus(selectStatuaArr, item.children)
        if (
          selectStatuaArr.every((selectItem) => {
            return selectItem == true
          })
        ) {
          item.isSelect = true
          that.$refs.dataTable.toggleRowSelection(item, true)
        } else if (
          selectStatuaArr.every((selectItem) => {
            return selectItem == false
          })
        ) {
          item.isSelect = false
          that.$refs.dataTable.toggleRowSelection(item, false)
        } else {
          item.isSelect = ''
        }
        // 则还有父级
        if (item.parentId != 0) {
          operateLastLeve(item)
        }
      }
      // 判断操作的是子级点复选框还是父级点复选框，如果是父级点，则控制子级点的全选和不全选

      // 1、只是父级 2、既是子集，又是父级 3、只是子级
      const levelSataus = getLevelStatus(row)
      if (levelSataus == 1) {
        selectAllChildrens(row.children)
      } else if (levelSataus == 2) {
        selectAllChildrens(row.children)
        operateLastLeve(row)
      } else if (levelSataus == 3) {
        operateLastLeve(row)
      }
    },

    checkIsAllSelect() {
      this.oneProductIsSelect = []
      this.list.forEach((item) => {
        this.oneProductIsSelect.push(item.isSelect)
      })
      // 判断一级产品是否是全选.如果一级产品全为true，则设置为取消全选，否则全选
      const isAllSelect = this.oneProductIsSelect.every((selectStatusItem) => {
        return selectStatusItem == true
      })
      return isAllSelect
    },

    selectAllFun(selection) {
      const isAllSelect = this.checkIsAllSelect()
      this.list.forEach((item) => {
        item.isSelect = isAllSelect
        this.$refs.dataTable.toggleRowSelection(item, !isAllSelect)
        this.selectFun(selection, item)
      })
    },

    rowClassNameFun({ row }) {
      if (row.isSelect === '') {
        return 'indeterminate'
      }
    },

    headerRowClassName({ row }) {
      const oneProductIsSelect = []
      this.list.forEach((item) => {
        oneProductIsSelect.push(item.isSelect)
      })
      if (oneProductIsSelect.includes('')) {
        return 'indeterminate'
      }
      return ''
    },

    toggleSelection(row, select) {
      if (row) {
        this.$nextTick(() => {
          this.$refs.dataTable && this.$refs.dataTable.toggleRowSelection(row, select)
        })
      }
    },
    cancelAll() {
      this.$refs.dataTable.clearSelection()
    }
  }
}
</script>

<style scoped>
.indeterminate .el-checkbox__input .el-checkbox__inner {
  background-color: #409eff !important;
  border-color: #409eff !important;
  color: #fff !important;
}

.indeterminate .el-checkbox__input.is-checked .el-checkbox__inner::after {
  transform: scale(0.5);
}

.indeterminate .el-checkbox__input .el-checkbox__inner {
  background-color: #f2f6fc;
  border-color: #dcdfe6;
}
.indeterminate .el-checkbox__input .el-checkbox__inner::after {
  border-color: #c0c4cc !important;
  background-color: #c0c4cc;
}
.product-show th .el-checkbox__inner {
  display: none !important;
}

.indeterminate .el-checkbox__input .el-checkbox__inner::after {
  content: "";
  position: absolute;
  display: block;
  background-color: #fff;
  height: 2px;
  transform: scale(0.5);
  left: 0;
  right: 0;
  top: 5px;
  width: auto !important;
}
.product-show .el-checkbox__inner {
  display: block !important;
}

.product-show .el-checkbox {
  display: block !important;
}

</style>
