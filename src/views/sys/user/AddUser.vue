<template>
  <div class="app-container">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="80px" style="width: 60%">

      <el-form-item label="归属部门" prop="officeId">
        <el-cascader
          :options="officeOptions"
          v-model="form.officeIdArray"
          change-on-select
          style="width: 40%;"
          @change="cascaderChange"/>
      </el-form-item>

      <el-form-item label="警号" prop="no">
        <el-input v-model="form.no"/>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="登录名" prop="loginName">
        <el-input v-model="form.loginName"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"/>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password"/>
      </el-form-item>

      <el-form-item label="允许登录">
        <el-switch v-model="form.loginFlag"/>
      </el-form-item>

      <el-form-item label="邮件">
        <el-input v-model="form.email"/>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone"/>
      </el-form-item>

      <el-form-item label="手机">
        <el-input v-model="form.mobile"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remarks"/>
      </el-form-item>

      <el-form-item label="分配角色">
        <el-checkbox-group v-model="form.permissionRoleIds">
          <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{ isModify ? '修改' : '立即创建' }}</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { listToTree } from '@/utils'
import { checkLoginName, goAdd, userAdd, userDetail, officeList } from '@/api/sys'
import { Message } from 'element-ui'
import { userModify } from '@/api/sys'

export default {
  name: 'AddUser',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.confirmPassword !== '') {
          this.$refs.ruleForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isModify: false,
      dialogVisible: false,
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
      roleList: [],
      form: {
        id: '',
        officeId: '',
        officeName: '',
        no: '',
        name: '',
        loginName: '',
        oldLoginName: '',
        password: '',
        confirmPassword: '',

        loginFlag: true,
        email: '',
        phone: '',
        mobile: '',
        remarks: '',
        permissionRoleIds: []
      },
      rules: {
        officeId: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        no: [
          { required: true, message: '请输入', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        password: [
          // { required: true, message: '请输入', trigger: 'blur' }
          { validator: validatePass, trigger: 'blur' }
        ],
        confirmPassword: [
          // { required: true, message: '请输入', trigger: 'blur' }
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.path.indexOf('ModifyUser') !== -1 && this.$route.query.id) {
      userDetail({ id: this.$route.query.id }).then(res => {
        console.log('detail')
        console.log(res)
        // this.form = res
        this.form.oldLoginName = res.loginName
        this.isModify = true
      })
    }
    officeList().then(res => {
      const data = res.map(e => ({ id: e.id, parentId: e.parentId, label: e.name, value: e.id }))
      this.officeOptions = listToTree(data)
    }).catch(err => {
      console.log(err)
    })

    goAdd().then(res => {
      console.log(res.roleList)
      this.roleList = res.roleList
    })
  },
  methods: {
    cancel() {
      this.$router.go(-1)
    },
    submitForm(formName) {
      console.log('submit!')
      console.log(this.form)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('OK!')
          checkLoginName({
            // onlyData: false,
            loginName: this.form.loginName,
            oldLoginName: this.form.oldLoginName
          }).then(res => {
            if (res > 0) {
              Message({
                message: '服务器返回数据结构有误，请联系系统管理员！',
                type: 'error',
                duration: 5 * 1000
              })
            } else {
              if (this.isModify) {
                userModify({
                  ...this.form
                }).then(res => {
                  console.log(res)
                  if (res.code === '0000') {
                    this.$router.go(-1)
                  }
                })
              } else {
                userAdd({
                  ...this.form
                }).then(res => {
                  console.log(res)
                  if (res.code === '0000') {
                    this.$router.go(-1)
                  }
                })
              }
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },

    cascaderChange(val) {
      console.log(val)
      this.form.officeId = val[val.length - 1]
      console.log(this.form.officeId)
    }
  }
}
</script>

<style scoped>

</style>
