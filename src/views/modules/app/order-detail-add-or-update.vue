<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="订单id" prop="orderId">
        <el-input v-model="dataForm.orderId" placeholder="订单id" />
      </el-form-item>
      <el-form-item label="sku商品id" prop="skuId">
        <el-input v-model="dataForm.skuId" placeholder="sku商品id" />
      </el-form-item>
      <el-form-item label="购买数量" prop="num">
        <el-input v-model="dataForm.num" placeholder="购买数量" />
      </el-form-item>
      <el-form-item label="商品标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="商品标题" />
      </el-form-item>
      <el-form-item label="商品动态属性键值集" prop="ownSpec">
        <el-input v-model="dataForm.ownSpec" placeholder="商品动态属性键值集" />
      </el-form-item>
      <el-form-item label="价格,单位：分" prop="price">
        <el-input v-model="dataForm.price" placeholder="价格,单位：分" />
      </el-form-item>
      <el-form-item label="商品图片" prop="image">
        <el-input v-model="dataForm.image" placeholder="商品图片" />
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
        orderId: '',
        skuId: '',
        num: '',
        title: '',
        ownSpec: '',
        price: '',
        image: ''
      },
      dataRule: {
        orderId: [
          { required: true, message: '订单id不能为空', trigger: 'blur' }
        ],
        skuId: [
          { required: true, message: 'sku商品id不能为空', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '购买数量不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '商品标题不能为空', trigger: 'blur' }
        ],
        ownSpec: [
          { required: true, message: '商品动态属性键值集不能为空', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '价格,单位：分不能为空', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '商品图片不能为空', trigger: 'blur' }
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
            url: `/app/orderDetail/info/${this.dataForm.id}`,
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data) {
              this.dataForm.orderId = data.orderDetail.orderId
              this.dataForm.skuId = data.orderDetail.skuId
              this.dataForm.num = data.orderDetail.num
              this.dataForm.title = data.orderDetail.title
              this.dataForm.ownSpec = data.orderDetail.ownSpec
              this.dataForm.price = data.orderDetail.price
              this.dataForm.image = data.orderDetail.image
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
            url: `/app/orderDetail/${!this.dataForm.id ? 'save' : 'update'}`,
            method: 'post',
            data: {
              'id': this.dataForm.id || undefined,
              'orderId': this.dataForm.orderId,
              'skuId': this.dataForm.skuId,
              'num': this.dataForm.num,
              'title': this.dataForm.title,
              'ownSpec': this.dataForm.ownSpec,
              'price': this.dataForm.price,
              'image': this.dataForm.image
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
