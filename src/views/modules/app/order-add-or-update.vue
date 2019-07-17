<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="总金额，单位为分" prop="totalPay">
        <el-input v-model="dataForm.totalPay" placeholder="总金额，单位为分" />
      </el-form-item>
      <el-form-item label="实付金额。单位:分。如:20007，表示:200元7分" prop="actualPay">
        <el-input v-model="dataForm.actualPay" placeholder="实付金额。单位:分。如:20007，表示:200元7分" />
      </el-form-item>
      <el-form-item label="" prop="promotionIds">
        <el-input v-model="dataForm.promotionIds" placeholder="" />
      </el-form-item>
      <el-form-item label="支付类型，1、在线支付，2、货到付款" prop="paymentType">
        <el-input v-model="dataForm.paymentType" placeholder="支付类型，1、在线支付，2、货到付款" />
      </el-form-item>
      <el-form-item label="邮费。单位:分。如:20007，表示:200元7分" prop="postFee">
        <el-input v-model="dataForm.postFee" placeholder="邮费。单位:分。如:20007，表示:200元7分" />
      </el-form-item>
      <el-form-item label="订单创建时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="订单创建时间" />
      </el-form-item>
      <el-form-item label="物流名称" prop="shippingName">
        <el-input v-model="dataForm.shippingName" placeholder="物流名称" />
      </el-form-item>
      <el-form-item label="物流单号" prop="shippingCode">
        <el-input v-model="dataForm.shippingCode" placeholder="物流单号" />
      </el-form-item>
      <el-form-item label="用户id" prop="userId">
        <el-input v-model="dataForm.userId" placeholder="用户id" />
      </el-form-item>
      <el-form-item label="买家留言" prop="buyerMessage">
        <el-input v-model="dataForm.buyerMessage" placeholder="买家留言" />
      </el-form-item>
      <el-form-item label="买家昵称" prop="buyerNick">
        <el-input v-model="dataForm.buyerNick" placeholder="买家昵称" />
      </el-form-item>
      <el-form-item label="买家是否已经评价,0未评价，1已评价" prop="buyerRate">
        <el-input v-model="dataForm.buyerRate" placeholder="买家是否已经评价,0未评价，1已评价" />
      </el-form-item>
      <el-form-item label="收获地址（省）" prop="receiverState">
        <el-input v-model="dataForm.receiverState" placeholder="收获地址（省）" />
      </el-form-item>
      <el-form-item label="收获地址（市）" prop="receiverCity">
        <el-input v-model="dataForm.receiverCity" placeholder="收获地址（市）" />
      </el-form-item>
      <el-form-item label="收获地址（区/县）" prop="receiverDistrict">
        <el-input v-model="dataForm.receiverDistrict" placeholder="收获地址（区/县）" />
      </el-form-item>
      <el-form-item label="收获地址（街道、住址等详细地址）" prop="receiverAddress">
        <el-input v-model="dataForm.receiverAddress" placeholder="收获地址（街道、住址等详细地址）" />
      </el-form-item>
      <el-form-item label="收货人手机" prop="receiverMobile">
        <el-input v-model="dataForm.receiverMobile" placeholder="收货人手机" />
      </el-form-item>
      <el-form-item label="收货人邮编" prop="receiverZip">
        <el-input v-model="dataForm.receiverZip" placeholder="收货人邮编" />
      </el-form-item>
      <el-form-item label="收货人" prop="receiver">
        <el-input v-model="dataForm.receiver" placeholder="收货人" />
      </el-form-item>
      <el-form-item label="发票类型(0无发票1普通发票，2电子发票，3增值税发票)" prop="invoiceType">
        <el-input v-model="dataForm.invoiceType" placeholder="发票类型(0无发票1普通发票，2电子发票，3增值税发票)" />
      </el-form-item>
      <el-form-item label="订单来源：1:app端，2：pc端，3：M端，4：微信端，5：手机qq端" prop="sourceType">
        <el-input v-model="dataForm.sourceType" placeholder="订单来源：1:app端，2：pc端，3：M端，4：微信端，5：手机qq端" />
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
        totalPay: '',
        actualPay: '',
        promotionIds: '',
        paymentType: '',
        postFee: '',
        createTime: '',
        shippingName: '',
        shippingCode: '',
        userId: '',
        buyerMessage: '',
        buyerNick: '',
        buyerRate: '',
        receiverState: '',
        receiverCity: '',
        receiverDistrict: '',
        receiverAddress: '',
        receiverMobile: '',
        receiverZip: '',
        receiver: '',
        invoiceType: '',
        sourceType: ''
      },
      dataRule: {
        totalPay: [
          { required: true, message: '总金额，单位为分不能为空', trigger: 'blur' }
        ],
        actualPay: [
          { required: true, message: '实付金额。单位:分。如:20007，表示:200元7分不能为空', trigger: 'blur' }
        ],
        promotionIds: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        paymentType: [
          { required: true, message: '支付类型，1、在线支付，2、货到付款不能为空', trigger: 'blur' }
        ],
        postFee: [
          { required: true, message: '邮费。单位:分。如:20007，表示:200元7分不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '订单创建时间不能为空', trigger: 'blur' }
        ],
        shippingName: [
          { required: true, message: '物流名称不能为空', trigger: 'blur' }
        ],
        shippingCode: [
          { required: true, message: '物流单号不能为空', trigger: 'blur' }
        ],
        userId: [
          { required: true, message: '用户id不能为空', trigger: 'blur' }
        ],
        buyerMessage: [
          { required: true, message: '买家留言不能为空', trigger: 'blur' }
        ],
        buyerNick: [
          { required: true, message: '买家昵称不能为空', trigger: 'blur' }
        ],
        buyerRate: [
          { required: true, message: '买家是否已经评价,0未评价，1已评价不能为空', trigger: 'blur' }
        ],
        receiverState: [
          { required: true, message: '收获地址（省）不能为空', trigger: 'blur' }
        ],
        receiverCity: [
          { required: true, message: '收获地址（市）不能为空', trigger: 'blur' }
        ],
        receiverDistrict: [
          { required: true, message: '收获地址（区/县）不能为空', trigger: 'blur' }
        ],
        receiverAddress: [
          { required: true, message: '收获地址（街道、住址等详细地址）不能为空', trigger: 'blur' }
        ],
        receiverMobile: [
          { required: true, message: '收货人手机不能为空', trigger: 'blur' }
        ],
        receiverZip: [
          { required: true, message: '收货人邮编不能为空', trigger: 'blur' }
        ],
        receiver: [
          { required: true, message: '收货人不能为空', trigger: 'blur' }
        ],
        invoiceType: [
          { required: true, message: '发票类型(0无发票1普通发票，2电子发票，3增值税发票)不能为空', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '订单来源：1:app端，2：pc端，3：M端，4：微信端，5：手机qq端不能为空', trigger: 'blur' }
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
            url: `/app/order/info/${this.dataForm.id}`,
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data) {
              this.dataForm.totalPay = data.order.totalPay
              this.dataForm.actualPay = data.order.actualPay
              this.dataForm.promotionIds = data.order.promotionIds
              this.dataForm.paymentType = data.order.paymentType
              this.dataForm.postFee = data.order.postFee
              this.dataForm.createTime = data.order.createTime
              this.dataForm.shippingName = data.order.shippingName
              this.dataForm.shippingCode = data.order.shippingCode
              this.dataForm.userId = data.order.userId
              this.dataForm.buyerMessage = data.order.buyerMessage
              this.dataForm.buyerNick = data.order.buyerNick
              this.dataForm.buyerRate = data.order.buyerRate
              this.dataForm.receiverState = data.order.receiverState
              this.dataForm.receiverCity = data.order.receiverCity
              this.dataForm.receiverDistrict = data.order.receiverDistrict
              this.dataForm.receiverAddress = data.order.receiverAddress
              this.dataForm.receiverMobile = data.order.receiverMobile
              this.dataForm.receiverZip = data.order.receiverZip
              this.dataForm.receiver = data.order.receiver
              this.dataForm.invoiceType = data.order.invoiceType
              this.dataForm.sourceType = data.order.sourceType
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
            url: `/app/order/${!this.dataForm.id ? 'save' : 'update'}`,
            method: 'post',
            data: {
              'id': this.dataForm.id || undefined,
              'totalPay': this.dataForm.totalPay,
              'actualPay': this.dataForm.actualPay,
              'promotionIds': this.dataForm.promotionIds,
              'paymentType': this.dataForm.paymentType,
              'postFee': this.dataForm.postFee,
              'createTime': this.dataForm.createTime,
              'shippingName': this.dataForm.shippingName,
              'shippingCode': this.dataForm.shippingCode,
              'userId': this.dataForm.userId,
              'buyerMessage': this.dataForm.buyerMessage,
              'buyerNick': this.dataForm.buyerNick,
              'buyerRate': this.dataForm.buyerRate,
              'receiverState': this.dataForm.receiverState,
              'receiverCity': this.dataForm.receiverCity,
              'receiverDistrict': this.dataForm.receiverDistrict,
              'receiverAddress': this.dataForm.receiverAddress,
              'receiverMobile': this.dataForm.receiverMobile,
              'receiverZip': this.dataForm.receiverZip,
              'receiver': this.dataForm.receiver,
              'invoiceType': this.dataForm.invoiceType,
              'sourceType': this.dataForm.sourceType
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
