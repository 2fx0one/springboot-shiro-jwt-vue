<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="dataForm.roleName" placeholder="角色名称" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注" />
      </el-form-item>
      <el-form-item size="mini" label="授权">
        <el-tree
          ref="menuListTree"
          :data="menuList"
          :props="menuListTreeProps"
          node-key="menuId"
          :default-expand-all="true"
          show-checkbox
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { listToTree } from '@/utils'
export default {
  data() {
    return {
      visible: false,
      menuList: [],
      menuListTreeProps: {
        label: 'name',
        children: 'children'
      },
      dataForm: {
        id: 0,
        roleName: '',
        remark: ''
      },
      dataRule: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ]
      },
      tempKey: -1000 // 临时key, 在这个key之后的值是半选中状态
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.$http({
        url: '/sys/menu/list',
        method: 'get'
      }).then(({ data }) => {
        this.menuList = listToTree(data, 'menuId')
      }).then(() => {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          this.$refs.menuListTree.setCheckedKeys([])
        })
      }).then(() => {
        if (this.dataForm.id) {
          this.$http({
            url: `/sys/role/info/${this.dataForm.id}`,
            method: 'get'
          }).then(({ data }) => {
            if (data) {
              this.dataForm.roleName = data.roleName
              this.dataForm.remark = data.remark
              var idx = data.menuIdList.indexOf(this.tempKey)
              if (idx !== -1) {
                data.menuIdList.splice(idx, data.menuIdList.length - idx)
              }
              this.$refs.menuListTree.setCheckedKeys(data.menuIdList)
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: `/sys/role/${!this.dataForm.id ? 'save' : 'update'}`,
            method: 'post',
            data: {
              'roleId': this.dataForm.id || undefined,
              'roleName': this.dataForm.roleName,
              'remark': this.dataForm.remark,
              'menuIdList': [].concat(this.$refs.menuListTree.getCheckedKeys(), [this.tempKey], this.$refs.menuListTree.getHalfCheckedKeys())
            }
          }).then(({ msg }) => {
            this.$message({
              message: msg || '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.$emit('refreshDataList')
              }
            })
          })
        }
      })
    }
  }
}
</script>
