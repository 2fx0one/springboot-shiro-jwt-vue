<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column
        prop="enname"
        label="英文名称"
      />
      <el-table-column
        prop="name"
        label="姓名"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleRoleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleRoleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { roleList } from '@/api/sys'

export default {
  name: 'RoleManagerVue',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    roleList().then(res => {
      console.log(res)
      this.tableData = res
    })
  },
  methods: {
    handleRoleEdit(index, row) {
      this.$message.info('click' + row.name)
    },
    handleRoleDelete(index, row) {
      this.$message.info('click' + row.name)
    }
  }
}
</script>

<style scoped>

</style>
