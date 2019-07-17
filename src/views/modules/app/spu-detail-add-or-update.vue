<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="商品描述信息" prop="description">
        <el-input v-model="dataForm.description" placeholder="商品描述信息" />
      </el-form-item>
      <el-form-item label="全部规格参数数据" prop="specifications">
        <el-input v-model="dataForm.specifications" placeholder="全部规格参数数据" />
      </el-form-item>
      <el-form-item label="特有规格参数及可选值信息，json格式" prop="skuOptions">
        <el-input v-model="dataForm.skuOptions" placeholder="特有规格参数及可选值信息，json格式" />
      </el-form-item>
      <el-form-item label="包装清单" prop="packingList">
        <el-input v-model="dataForm.packingList" placeholder="包装清单" />
      </el-form-item>
      <el-form-item label="售后服务" prop="afterService">
        <el-input v-model="dataForm.afterService" placeholder="售后服务" />
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
        spuId: 0,
        description: '',
        specifications: '',
        skuOptions: '',
        packingList: '',
        afterService: ''
      },
      dataRule: {
        description: [
          { required: true, message: '商品描述信息不能为空', trigger: 'blur' }
        ],
        specifications: [
          { required: true, message: '全部规格参数数据不能为空', trigger: 'blur' }
        ],
        skuOptions: [
          { required: true, message: '特有规格参数及可选值信息，json格式不能为空', trigger: 'blur' }
        ],
        packingList: [
          { required: true, message: '包装清单不能为空', trigger: 'blur' }
        ],
        afterService: [
          { required: true, message: '售后服务不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.spuId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.spuId) {
          this.$http({
            url: `/app/spuDetail/info/${this.dataForm.spuId}`,
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data) {
              this.dataForm.description = data.spuDetail.description
              this.dataForm.specifications = data.spuDetail.specifications
              this.dataForm.skuOptions = data.spuDetail.skuOptions
              this.dataForm.packingList = data.spuDetail.packingList
              this.dataForm.afterService = data.spuDetail.afterService
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
            url: `/app/spuDetail/${!this.dataForm.spuId ? 'save' : 'update'}`,
            method: 'post',
            data: {
              'spuId': this.dataForm.spuId || undefined,
              'description': this.dataForm.description,
              'specifications': this.dataForm.specifications,
              'skuOptions': this.dataForm.skuOptions,
              'packingList': this.dataForm.packingList,
              'afterService': this.dataForm.afterService
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
