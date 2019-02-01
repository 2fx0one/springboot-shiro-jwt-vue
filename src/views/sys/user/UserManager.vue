<template>
  <div class="app-container">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="归属部门">
        <el-cascader
          :options="officeOptions"
          v-model="searchForm.officeIdArray"
          style="width: 360px"
          change-on-select
          @change="cascaderChange"/>
      </el-form-item>
      <el-form-item label="登录名">
        <el-input v-model="searchForm.loginName" placeholder="登录名"/>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" placeholder="姓名"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchUser">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetSearch">重置</el-button>
      </el-form-item>

      <el-form-item>
        <el-button style="margin-bottom: 20px;" type="success" @click="handleAddUsesr">新增用户</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%">
      <el-table-column
        prop="officeName"
        label="归属部门"
        width="200"/>
      <el-table-column
        prop="loginName"
        label="登录名"
        width="180"/>
      <el-table-column
        prop="name"
        label="姓名"
        width="200"/>
      <el-table-column
        prop="phone"
        label="电话"
        width="180"/>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleUserEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleUserDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deleteUser, userList, officeList } from '@/api/sys'
import { listToTree } from '@/utils'
export default {
  name: 'UserManager',
  data() {
    return {
      officeOptions: [
        {
          label: '1',
          value: '1',
          id: '',
          children: [{
            label: '2',
            value: '2',
            id: ''
          }]
        }
      ],
      searchForm: {
        loginName: '',
        name: '',
        officeId: '360000000000',
        officeIdArray: ['360000000000']
      },
      tableData: [{
        officeName: '',
        loginName: '',
        no: '',
        name: '',
        phone: '',
        mobile: '',
        loginFlag: false
      }]
    }
  },
  created() {
    console.log('create')
    officeList().then(res => {
      const data = res.map(e => ({ id: e.id, parentId: e.parentId, label: e.name, value: e.id }))
      this.officeOptions = listToTree(data)
    }).catch(err => {
      console.log(err)
    })

    this.getUserList(this.searchForm)
  },
  methods: {
    getUserList({ officeId, loginName, name }) {
      userList({
        officeId,
        loginName,
        name
      }).then(res => {
        console.log(res)
        this.tableData = res
      }).catch(err => {
        console.log('err', err)
      })
    },
    cascaderChange(val) {
      this.searchForm.officeId = val[val.length - 1]
      console.log(this.searchForm.officeId)
    },
    searchUser() {
      this.getUserList(this.searchForm)
    },
    resetSearch() {
      this.searchForm = {
        officeId: ['360000000000'],
        loginName: '',
        name: ''
      }
      this.getUserList(this.searchForm)
    },
    handleAddUsesr() {
      this.$router.push({ path: '/sysManager/AddUser' })
    },
    handleUserEdit(index, row) {
      console.log(index, row)
      this.$router.push({ path: `/sysManager/ModifyUser?id=${row.id}` })
    },
    handleUserDelete(index, row) {
      console.log(index, row.id)
      this.$confirm('此操作将删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id: row.id }).then(res => {
          console.log(res)
          this.getUserList(this.searchForm)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
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
  .grid-content {
    min-height: 36px;
    margin-bottom: 20px;
  }
  .grid-content span {
    width: 70px;
    font-size: 13px;
    display: inline-block;
    text-align: right;
  }
</style>

<style>
  .el-cascader-menu {
    height: 400px;
  }
</style>
