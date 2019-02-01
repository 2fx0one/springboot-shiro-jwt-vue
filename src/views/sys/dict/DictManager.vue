<template>
  <div class="app-container">
    <el-table
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column
        prop="type"
        label="类型"
      />
      <el-table-column
        prop="value"
        label="键值"
      />
      <el-table-column
        prop="label"
        label=" 标签"
      />
      <el-table-column
        prop="description"
        label="描述"
      />
      <el-table-column
        prop="sort"
        label="排序"
      />
      <el-table-column
        label="父"
      >
        <template slot-scope="scope">
          {{ scope.row.hasChild }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.hasChild"
            type="primary"
            size="mini"
            @click="handleRoleEdit(scope.$index, scope.row)"
          >展开</el-button>
          <el-button
            size="mini"
            @click="handleRoleEdit(scope.$index, scope.row)"
          >新增</el-button>
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
import { dictList } from '@/api/sys'

export default {
  name: 'DictManager',
  data() {
    return {
      tableData: []
    }
  },
  created() {
    dictList().then(res => {
      console.log(res)
      this.tableData = res
    })
  },
  methods: {
    handleRoleEdit(index, row) {
      this.$message.info('click' + row.label)
    },
    handleRoleDelete(index, row) {
      this.$message.info('click' + row.label)
    }
  }
}
</script>

<style scoped>
  tr >>> .el-table__row {
    height: 25px;
  }
</style>
