<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="可秒杀库存" prop="secondKillStock">
        <el-input v-model="dataForm.secondKillStock" placeholder="可秒杀库存" />
      </el-form-item>
      <el-form-item label="秒杀总数量" prop="secondKillTotal">
        <el-input v-model="dataForm.secondKillTotal" placeholder="秒杀总数量" />
      </el-form-item>
      <el-form-item label="库存数量" prop="stock">
        <el-input v-model="dataForm.stock" placeholder="库存数量" />
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
        skuId: 0,
        secondKillStock: '',
        secondKillTotal: '',
        stock: ''
      },
      dataRule: {
        secondKillStock: [
          { required: true, message: '可秒杀库存不能为空', trigger: 'blur' }
        ],
        secondKillTotal: [
          { required: true, message: '秒杀总数量不能为空', trigger: 'blur' }
        ],
        stock: [
          { required: true, message: '库存数量不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.skuId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.skuId) {
          this.$http({
            url: `/app/stock/info/${this.dataForm.skuId}`,
            method: 'get'
          }).then(({ data }) => {
            if (data) {
              this.dataForm.secondKillStock = data.stock.secondKillStock
              this.dataForm.secondKillTotal = data.stock.secondKillTotal
              this.dataForm.stock = data.stock.stock
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
            url: `/app/stock/${!this.dataForm.skuId ? 'save' : 'update'}`,
            method: 'post',
            data: {
              'skuId': this.dataForm.skuId || undefined,
              'secondKillStock': this.dataForm.secondKillStock,
              'secondKillTotal': this.dataForm.secondKillTotal,
              'stock': this.dataForm.stock
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
