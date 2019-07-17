<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="状态：1、未付款 2、已付款,未发货 3、已发货,未确认 4、交易成功 5、交易关闭 6、已评价" prop="status">
        <el-input v-model="dataForm.status" placeholder="状态：1、未付款 2、已付款,未发货 3、已发货,未确认 4、交易成功 5、交易关闭 6、已评价" />
      </el-form-item>
      <el-form-item label="订单创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="订单创建时间" />
      </el-form-item>
      <el-form-item label="付款时间" prop="paymentTime">
        <el-input v-model="dataForm.paymentTime" placeholder="付款时间" />
      </el-form-item>
      <el-form-item label="发货时间" prop="consignTime">
        <el-input v-model="dataForm.consignTime" placeholder="发货时间" />
      </el-form-item>
      <el-form-item label="交易完成时间" prop="endTime">
        <el-input v-model="dataForm.endTime" placeholder="交易完成时间" />
      </el-form-item>
      <el-form-item label="交易关闭时间" prop="closeTime">
        <el-input v-model="dataForm.closeTime" placeholder="交易关闭时间" />
      </el-form-item>
      <el-form-item label="评价时间" prop="commentTime">
        <el-input v-model="dataForm.commentTime" placeholder="评价时间" />
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
        orderId: 0,
        status: '',
        createTime: '',
        paymentTime: '',
        consignTime: '',
        endTime: '',
        closeTime: '',
        commentTime: ''
      },
      dataRule: {
        status: [
          { required: true, message: '状态：1、未付款 2、已付款,未发货 3、已发货,未确认 4、交易成功 5、交易关闭 6、已评价不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '订单创建时间不能为空', trigger: 'blur' }
        ],
        paymentTime: [
          { required: true, message: '付款时间不能为空', trigger: 'blur' }
        ],
        consignTime: [
          { required: true, message: '发货时间不能为空', trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '交易完成时间不能为空', trigger: 'blur' }
        ],
        closeTime: [
          { required: true, message: '交易关闭时间不能为空', trigger: 'blur' }
        ],
        commentTime: [
          { required: true, message: '评价时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.orderId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.orderId) {
          this.$http({
            url: `/app/orderStatus/info/${this.dataForm.orderId}`,
            method: 'get'
          }).then(({ data }) => {
            if (data) {
              this.dataForm.status = data.orderStatus.status
              this.dataForm.createTime = data.orderStatus.createTime
              this.dataForm.paymentTime = data.orderStatus.paymentTime
              this.dataForm.consignTime = data.orderStatus.consignTime
              this.dataForm.endTime = data.orderStatus.endTime
              this.dataForm.closeTime = data.orderStatus.closeTime
              this.dataForm.commentTime = data.orderStatus.commentTime
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
            url: `/app/orderStatus/${!this.dataForm.orderId ? 'save' : 'update'}`,
            method: 'post',
            data: {
              'orderId': this.dataForm.orderId || undefined,
              'status': this.dataForm.status,
              'createTime': this.dataForm.createTime,
              'paymentTime': this.dataForm.paymentTime,
              'consignTime': this.dataForm.consignTime,
              'endTime': this.dataForm.endTime,
              'closeTime': this.dataForm.closeTime,
              'commentTime': this.dataForm.commentTime
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
