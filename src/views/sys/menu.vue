<template>
  <div class="app-container">
    <el-form :inline="true" :model="dataForm">
      <el-form-item>
        <el-button v-permission="'sys:menu:save'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <!--<tree-table :data="dataList" :columns="columns" border />-->
    <el-table
      :data="dataList"
      row-key="menuId"
      border
      style="width: 100%;"
      @cell-click="rowClick"
    >
      <el-table-column
        header-align="center"
        label="名称"
        width="150"
      >
        <template slot-scope="scope">
          <span v-text="`${scope.row.name}`" />
        </template>
      </el-table-column>
      <el-table-column
        prop="menuId"
        header-align="center"
        align="center"
        width="80"
        label="ID"
      />
      <!--<el-table-column-->
      <!--prop="parentName"-->
      <!--header-align="center"-->
      <!--align="center"-->
      <!--width="120"-->
      <!--label="上级菜单"-->
      <!--/>-->
      <el-table-column
        header-align="center"
        align="center"
        label="图标"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.icon" />
          <svg-icon :icon-class="scope.row.icon || ''" />
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="类型"
      >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
          <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
          <el-tag v-else-if="scope.row.type === 2" size="small" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderNum"
        header-align="center"
        align="center"
        label="排序号"
      />
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="菜单URL"
      />
      <el-table-column
        prop="perms"
        header-align="center"
        align="center"
        width="150"
        :show-overflow-tooltip="true"
        label="授权标识"
      />
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permission="'sys:menu:update'" type="text" size="small" @click="addOrUpdateHandle(scope.row.menuId)">修改</el-button>
          <el-button v-permission="'sys:menu:delete'" type="text" size="small" @click="deleteHandle(scope.row.menuId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import AddOrUpdate from './menu-add-or-update'
import { treeDataTransform } from '@/utils'
export default {
  components: {
    AddOrUpdate
  },
  data() {
    return {
      dataForm: {},
      dataList: [],
      columns: {
        label: 'name',
        children: 'children'
      },
      dataListLoading: false,
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    rowClick(row, column, cell, event) {
      if (column.label === 'ID') {
        console.log('cell-click', row, column)
      }
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$http({
        url: '/sys/menu/list',
        method: 'get'
      }).then(({ data }) => {
        this.dataList = treeDataTransform(data, 'menuId')
        console.log(this.dataList)
        this.dataListLoading = false
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 删除
    deleteHandle(id) {
      this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: `/sys/menu/delete/${id}`,
          method: 'post'
        }).then(({ msg }) => {
          this.$message({
            message: msg || '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getDataList()
            }
          })
        })
      }).catch(() => {})
    }
  }
}
</script>
