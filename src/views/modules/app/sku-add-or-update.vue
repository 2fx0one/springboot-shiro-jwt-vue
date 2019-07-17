<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="spu id" prop="spuId">
        <el-input v-model="dataForm.spuId" placeholder="spu id" />
      </el-form-item>
      <el-form-item label="商品标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="商品标题" />
      </el-form-item>
      <el-form-item label="商品的图片，多个图片以‘,’分割" prop="images">
        <el-input v-model="dataForm.images" placeholder="商品的图片，多个图片以‘,’分割" />
      </el-form-item>
      <el-form-item label="销售价格，单位为分" prop="price">
        <el-input v-model="dataForm.price" placeholder="销售价格，单位为分" />
      </el-form-item>
      <el-form-item label="特有规格属性在spu属性模板中的对应下标组合" prop="indexes">
        <el-input v-model="dataForm.indexes" placeholder="特有规格属性在spu属性模板中的对应下标组合" />
      </el-form-item>
      <el-form-item label="sku的特有规格参数键值对，json格式，反序列化时请使用linkedHashMap，保证有序" prop="ownSpec">
        <el-input v-model="dataForm.ownSpec" placeholder="sku的特有规格参数键值对，json格式，反序列化时请使用linkedHashMap，保证有序" />
      </el-form-item>
      <el-form-item label="是否有效，0无效，1有效" prop="enable">
        <el-input v-model="dataForm.enable" placeholder="是否有效，0无效，1有效" />
      </el-form-item>
      <el-form-item label="添加时间" prop="createTime">
        <el-input v-model="dataForm.createTime" placeholder="添加时间" />
      </el-form-item>
      <el-form-item label="最后修改时间" prop="lastUpdateTime">
        <el-input v-model="dataForm.lastUpdateTime" placeholder="最后修改时间" />
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
        spuId: '',
        title: '',
        images: '',
        price: '',
        indexes: '',
        ownSpec: '',
        enable: '',
        createTime: '',
        lastUpdateTime: ''
      },
      dataRule: {
        spuId: [
          { required: true, message: 'spu id不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '商品标题不能为空', trigger: 'blur' }
        ],
        images: [
          { required: true, message: '商品的图片，多个图片以‘,’分割不能为空', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '销售价格，单位为分不能为空', trigger: 'blur' }
        ],
        indexes: [
          { required: true, message: '特有规格属性在spu属性模板中的对应下标组合不能为空', trigger: 'blur' }
        ],
        ownSpec: [
          { required: true, message: 'sku的特有规格参数键值对，json格式，反序列化时请使用linkedHashMap，保证有序不能为空', trigger: 'blur' }
        ],
        enable: [
          { required: true, message: '是否有效，0无效，1有效不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '添加时间不能为空', trigger: 'blur' }
        ],
        lastUpdateTime: [
          { required: true, message: '最后修改时间不能为空', trigger: 'blur' }
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
            url: `/app/sku/info/${this.dataForm.id}`,
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data) {
              this.dataForm.spuId = data.sku.spuId
              this.dataForm.title = data.sku.title
              this.dataForm.images = data.sku.images
              this.dataForm.price = data.sku.price
              this.dataForm.indexes = data.sku.indexes
              this.dataForm.ownSpec = data.sku.ownSpec
              this.dataForm.enable = data.sku.enable
              this.dataForm.createTime = data.sku.createTime
              this.dataForm.lastUpdateTime = data.sku.lastUpdateTime
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
            url: `/app/sku/${!this.dataForm.id ? 'save' : 'update'}`,
            method: 'post',
            data: {
              'id': this.dataForm.id || undefined,
              'spuId': this.dataForm.spuId,
              'title': this.dataForm.title,
              'images': this.dataForm.images,
              'price': this.dataForm.price,
              'indexes': this.dataForm.indexes,
              'ownSpec': this.dataForm.ownSpec,
              'enable': this.dataForm.enable,
              'createTime': this.dataForm.createTime,
              'lastUpdateTime': this.dataForm.lastUpdateTime
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
