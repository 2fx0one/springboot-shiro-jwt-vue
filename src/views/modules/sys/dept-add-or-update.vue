<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="" prop="parentId">
        <el-input v-model="dataForm.parentId" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="parentIds">
        <el-input v-model="dataForm.parentIds" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="name">
        <el-input v-model="dataForm.name" placeholder="" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="排序" />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="创建时间" />
      </el-form-item>
      <el-form-item label="修改时间" prop="updateTime">
        <el-input v-model="dataForm.updateTime" placeholder="修改时间" />
      </el-form-item>
      <el-form-item label="" prop="tenantId">
        <el-input v-model="dataForm.tenantId" placeholder="" />
      </el-form-item>
      <el-form-item label="" prop="delFlag">
        <el-input v-model="dataForm.delFlag" placeholder="" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptInfo, saveDept, updateDept } from '@/api/sys/dept'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        deptId: 0,
        parentId: '',
        parentIds: '',
        name: '',
        sort: '',
        createTime: '',
        updateTime: '',
        tenantId: '',
        delFlag: ''
      },
      dataRule: {
        parentId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        parentIds: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '排序不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '修改时间不能为空', trigger: 'blur' }
        ],
        tenantId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        delFlag: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.deptId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.deptId) {
          getDeptInfo(this.dataForm.deptId).then(({ data }) => {
            if (data) {
              this.dataForm.parentId = data.parentId
              this.dataForm.parentIds = data.parentIds
              this.dataForm.name = data.name
              this.dataForm.sort = data.sort
              this.dataForm.createTime = data.createTime
              this.dataForm.updateTime = data.updateTime
              this.dataForm.tenantId = data.tenantId
              this.dataForm.delFlag = data.delFlag
            }
          })
        }
      })
    },
    saveOrUpdate(data) {
      return !this.dataForm.id ? saveDept(data) : updateDept(data)
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.saveOrUpdate({
            'deptId': this.dataForm.deptId || undefined,
            'parentId': this.dataForm.parentId,
            'parentIds': this.dataForm.parentIds,
            'name': this.dataForm.name,
            'sort': this.dataForm.sort,
            'createTime': this.dataForm.createTime,
            'updateTime': this.dataForm.updateTime,
            'tenantId': this.dataForm.tenantId,
            'delFlag': this.dataForm.delFlag
          }).then(({ msg }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 500,
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
