<template>
  <div class="app-container">
    <tree-table :data="treeData" :columns="columns" :expand-all="true" border>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" @click="addMenu(scope.row)">新增</el-button>
          <el-button type="warning" @click="modifyMenu(scope.row)">修改</el-button>
          <el-button type="danger" @click="removeMenu(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </tree-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%" center>
      <el-form ref="formRules" :model="form" status-icon>
        <el-form-item
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '不能为空'},
          ]"
          prop="name"
          label="名称">
          <el-input v-model="form.name" auto-complete="off"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '不能为空'},
          ]"
          prop="component"
          label="组件名">
          <el-input v-model="form.component" auto-complete="off"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '不能为空'},
          ]"
          prop="path"
          label="路径">
          <el-input v-model="form.path" auto-complete="off"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '不能为空'},
          ]"
          prop="icon"
          label="图标">
          <el-input v-model="form.icon" auto-complete="off"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '不能为空'},
          ]"
          label="是否隐藏">
          <el-input v-model="form.hidden" auto-complete="off"/>
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          prop="permission"
          label="权限">
          <el-input v-model="form.permission" auto-complete="off"/>
        </el-form-item>
        <el-form-item
          :label-width="formLabelWidth"
          :rules="[
            { required: true, message: '不能为空'},
            { type: 'number', message: '必须为数字值'}
          ]"
          prop="sort"
          label="排序">
          <el-input v-model="form.sort" auto-complete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddOrModify(title)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import { sysMenuAdd, sysMenuDelete, sysMenuModify, sysMenuView } from '@/api/sys'
import { listToTree } from '@/utils'
// import { listToTree } from '@/utils'

export default {
  name: 'MenuView',
  components: { treeTable },
  data() {
    return {
      columns: [
        {
          text: '菜单名称',
          value: 'name',
          width: 300
        },
        {
          text: '路径',
          value: 'path'
        },
        {
          text: '组件',
          value: 'component'
        },
        {
          text: '图标',
          value: 'icon'
        },
        {
          text: '是否隐藏',
          value: 'hidden'
        },
        {
          text: '权限标识',
          value: 'permission'
        }
      ],
      treeData: [{
        component: 'Layout',
        createBy: '',
        createDate: '2019-01-01T00:00:00',
        delFlag: '0',
        hidden: '0',
        href: null,
        icon: 'example',
        id: '100',
        name: '系统',
        parentId: '0',
        parentIds: '',
        path: '/sys',
        permission: null,
        remarks: null,
        sort: 0,
        updateBy: '',
        updateDate: '2019-01-01T00:00:00'
      }],
      formLabelWidth: '80px',
      form: {
        name: '',
        parentId: null,
        path: '',
        icon: '',
        hidden: '',
        component: '',
        permission: '',
        sort: 0
      },
      title: '',
      dialogFormVisible: false
    }
  },
  created() {
    console.log('create')
    this.list()
  },
  methods: {
    list() {
      sysMenuView().then(res => {
        // const data = res.map(e => ({ id: e.id, parentId: e.parentId, name: e.name, href: e.href, permission: e.permission }))
        const treeData = listToTree(res)
        console.log(treeData)
        this.treeData = treeData
      })
    },
    // resetFormData() {
    //   this.fillFormData({
    //     id: null,
    //     parentId
    //   })
    // },
    fillFormData(data) {
      this.form = data
      // this.form.id = data.id
      // this.form.name = data.name
      // this.form.parentId = data.parentId
      // this.form.path = data.path
      // this.form.component = data.component
      // this.form.icon = data.icon
      // this.form.hidden = data.hidden
      // this.form.permission = data.permission
      // this.form.sort = data.sort
    },
    addMenu(row) {
      this.dialogFormVisible = true
      this.title = '增加'
      this.fillFormData({
        id: null,
        parentId: row.id
      })
    },
    modifyMenu(row) {
      this.dialogFormVisible = true
      this.title = '修改'
      this.fillFormData(row)
    },
    submitAddOrModify(title) {
      this.$refs.formRules.validate(vaild => {
        if (vaild) {
          if (title === '增加') {
            sysMenuAdd(this.form).then(response => {
              // console.log(response)
              this.dialogFormVisible = false
              this.list()
              this.$notify({
                title: '增加成功',
                message: response,
                type: 'success'
              })
            }).catch(err => console.log(err))
          } else if (title === '修改') {
            sysMenuModify(this.form).then(response => {
              this.dialogFormVisible = false
              this.list()
              this.$notify({
                title: '修改成功',
                message: response,
                type: 'success'
              })
            }).catch(err => console.log(err))
          }
          return true
        } else {
          return false
        }
      })
    },
    removeMenu(row) {
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        sysMenuDelete({
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
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
