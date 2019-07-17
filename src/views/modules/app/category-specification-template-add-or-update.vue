<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="规格参数模板，json格式" prop="spuTemplate">
        <el-input v-model="dataForm.spuTemplate" placeholder="规格参数模板，json格式" />
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
        categoryId: 0,
        spuTemplate: ''
      },
      dataRule: {
        spuTemplate: [
          { required: true, message: '规格参数模板，json格式不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.categoryId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.categoryId) {
          this.$http({
            url: `/app/categorySpecificationTemplate/info/${this.dataForm.categoryId}`,
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data) {
              this.dataForm.spuTemplate = data.categorySpecificationTemplate.spuTemplate
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
            url: `/app/categorySpecificationTemplate/${!this.dataForm.categoryId ? 'save' : 'update'}`,
            method: 'post',
            data: {
              'categoryId': this.dataForm.categoryId || undefined,
              'spuTemplate': this.dataForm.spuTemplate
            }
          }).then(({ msg }) => {
            this.$message({
              message: '操作成功',
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
