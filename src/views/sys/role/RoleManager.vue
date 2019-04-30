<template>
  <div class="app-container">
    <div class="buttons">
      <el-button @click="handleRoleAdd">创建角色</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          label="ID"
          width="80"
        >
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="180"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>角色名称: {{ scope.row.name }}</p>
              <p>英文名称: {{ scope.row.enname }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="180"
        >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>创建时间: {{ scope.row.createDate }}</p>
              <p>更新时间: {{ scope.row.updateDate }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.createDate }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column
          label="状态"
          width="100"
        >
          <template slot-scope="scope">
            <!--<i class="el-icon-time"></i>-->
            <span style="margin-left: 10px">{{ scope.row.useable === 1 ? '生效' : '失效' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleRoleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              v-if="scope.row.delFlag === 0"
              size="mini"
              type="danger"
              @click="handleRoleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      @open="dialogOpen()"
      @close="dialogClose()"
    >
      <!--:before-close="handleClose"-->
      <!--&gt;-->
      <span>Role Id =  {{ form.id }}</span>
      <el-form :model="form" status-icon>
        <el-form-item :label-width="'80px'" prop="label" label="角色名">
          <el-input v-model="form.roleName" auto-complete="off" />
        </el-form-item>
        <!--<el-form-item  prop="label" label="角色描述" :label-width="'80px'">-->
        <!--<el-input v-model="form.description" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <el-tree
        ref="tree"
        :data="menutreeData"
        :expand-on-click-node="false"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
      />
      <div class="buttons">
        <!--<el-button @click="getCheckedNodes">通过 node 获取</el-button>-->
        <!--<el-button @click="getCheckedKeys">通过 key 获取</el-button>-->
        <!--<el-button @click="setCheckedNodes">通过 node 设置</el-button>-->
        <!--<el-button @click="setCheckedKeys">通过 key 设置</el-button>-->
        <el-button @click="resetChecked">清空</el-button>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="dialogVisible = false">取 消</el-button>
        <el-button :loading="btnLoading" size="medium" type="primary" @click="submitAddOrModify(title)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { sysRoleDelete, sysRoleAdd, sysRoleModify, sysRoleView, sysMenuView } from '@/api/sys'
import { listToTree } from '@/utils'

export default {
  name: 'RoleManagerVue',
  data() {
    return {
      menutreeData: [],
      defaultProps: {
        id: 0,
        parentId: 0,
        label: 'name',
        path: 'path',
        children: 'children'
      },

      tableData: [],
      dialogVisible: false,
      title: '',
      form: {
        id: null

      }
    }
  },
  created() {
    this.list()
    sysMenuView().then(res => {
      res.forEach(e => { e.label = e.name })
      const treeData = listToTree(res)
      console.log(treeData)
      this.menutreeData = treeData
    })
  },
  methods: {
    list() {
      sysRoleView().then(res => {
        this.tableData = res
      })
    },
    fillFormData(data) {
      this.form.id = data.id
      this.form.name = data.name
      this.form.parentId = data.parentId
      this.form.path = data.path
      this.form.component = data.component
      this.form.icon = data.icon
      this.form.hidden = data.hidden
      this.form.permission = data.permission
      this.form.sort = data.sort
    },
    handleRoleAdd() {
      this.title = '新增角色'
      this.dialogVisible = true
      this.fillFormData({

      })
      // this.$message.info('click' + row.name)
    },
    handleRoleEdit(index, row) {
      this.title = '修改角色'
      this.dialogVisible = true
      this.fillFormData(row)
    },
    submitAddOrModify(title) {
      console.log(title, this.form)
      console.log(this.$refs.tree.getCheckedKeys(true))
    },
    handleRoleDelete(index, row) {
      // this.$message.info('click' + row.name)
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        sysRoleDelete({
          id: row.id
        }).then(response => {
          this.$notify({
            title: '删除成功',
            message: response,
            type: 'success'
          })
          this.list()
        }).catch(err => console.log(err))
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    }
  }
}
</script>

<style scoped>

</style>
