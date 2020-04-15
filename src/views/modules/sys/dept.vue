<template>
  <div class="app-container mod-sys-dept">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-permission="'sys:dept:save'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-permission="'sys:dept:delete'" type="danger" :disabled="dataListSelections.length <= 0" @click="deleteHandle()">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="dataListLoading"
      :data="dataList"
      border
      style="width: 100%;"
      @selection-change="selectionChangeHandle"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
      />
      <el-table-column
        prop="deptId"
        header-align="center"
        align="center"
        label=""
      />
      <el-table-column
        prop="parentId"
        header-align="center"
        align="center"
        label=""
      />
      <el-table-column
        prop="parentIds"
        header-align="center"
        align="center"
        label=""
      />
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label=""
      />
      <el-table-column
        prop="sort"
        header-align="center"
        align="center"
        label="排序"
      />
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间"
      />
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="修改时间"
      />
      <el-table-column
        prop="tenantId"
        header-align="center"
        align="center"
        label=""
      />
      <el-table-column
        prop="delFlag"
        header-align="center"
        align="center"
        label=""
      />
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.deptId)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.deptId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page.index"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="page.size"
      :total="page.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
    />
    <!-- 弹窗, 新增 / 修改 -->
    <dept-add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
import DeptAddOrUpdate from './dept-add-or-update'
import { getDeptList, delDept } from '@/api/sys/dept'
export default {
  components: {
    DeptAddOrUpdate
  },
  data() {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      page: {
        index: 1,
        size: 10,
        total: 0
      },
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  created() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      getDeptList({
        'page': this.page.index,
        'limit': this.page.size,
        'key': this.dataForm.key
      }).then(({ data }) => {
        if (data) {
          this.dataList = data.list
          this.page.total = data.total
        } else {
          this.dataList = []
          this.page.total = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle(val) {
      this.page.size = val
      this.page.index = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.page.index = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
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
      const ids = id ? [id] : this.dataListSelections.map(item => item.id)
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delDept(ids).then(({ msg }) => {
          this.$message({
            message: msg || '操作成功',
            type: 'success',
            duration: 500,
            onClose: () => {
              this.getDataList()
            }
          })
        })
      })
    }
  }
}
</script>
