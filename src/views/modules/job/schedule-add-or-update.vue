<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="bean名称" prop="beanName">
        <el-input v-model="dataForm.beanName" placeholder="spring bean名称, 如: testTask" />
      </el-form-item>
      <el-form-item label="方法名称" prop="methodName">
        <el-input v-model="dataForm.methodName" placeholder="方法名称" />
      </el-form-item>
      <el-form-item label="参数" prop="params">
        <el-input v-model="dataForm.params" placeholder="参数" />
      </el-form-item>
      <el-form-item label="cron表达式" prop="cronExpression">
        <el-input v-model="dataForm.cronExpression" placeholder="如: 0 0 12 * * ?" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        beanName: '',
        methodName: '',
        params: '',
        cronExpression: '',
        remark: '',
        status: 0
      },
      dataRule: {
        beanName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        methodName: [
          { required: true, message: '方法名称不能为空', trigger: 'blur' }
        ],
        cronExpression: [
          { required: true, message: 'cron表达式不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: `/sys/schedule/info/${this.dataForm.id}`,
            method: 'get'
          }).then(({ data }) => {
            if (data) {
              this.dataForm.beanName = data.beanName
              this.dataForm.methodName = data.methodName
              this.dataForm.params = data.params
              this.dataForm.cronExpression = data.cronExpression
              this.dataForm.remark = data.remark
              this.dataForm.status = data.status
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
            url: `/sys/schedule/${!this.dataForm.id ? 'save' : 'update'}`,
            method: 'post',
            data: {
              'jobId': this.dataForm.id || undefined,
              'beanName': this.dataForm.beanName,
              'methodName': this.dataForm.methodName,
              'params': this.dataForm.params,
              'cronExpression': this.dataForm.cronExpression,
              'remark': this.dataForm.remark,
              'status': !this.dataForm.id ? undefined : this.dataForm.status
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
