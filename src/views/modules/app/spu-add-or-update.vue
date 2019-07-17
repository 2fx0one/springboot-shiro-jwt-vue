<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title" placeholder="标题" />
      </el-form-item>
      <el-form-item label="子标题" prop="subTitle">
        <el-input v-model="dataForm.subTitle" placeholder="子标题" />
      </el-form-item>
      <el-form-item label="1级类目id" prop="cid1">
        <el-input v-model="dataForm.cid1" placeholder="1级类目id" />
      </el-form-item>
      <el-form-item label="2级类目id" prop="cid2">
        <el-input v-model="dataForm.cid2" placeholder="2级类目id" />
      </el-form-item>
      <el-form-item label="3级类目id" prop="cid3">
        <el-input v-model="dataForm.cid3" placeholder="3级类目id" />
      </el-form-item>
      <el-form-item label="商品所属品牌id" prop="brandId">
        <el-input v-model="dataForm.brandId" placeholder="商品所属品牌id" />
      </el-form-item>
      <el-form-item label="是否上架，0下架，1上架" prop="saleable">
        <el-input v-model="dataForm.saleable" placeholder="是否上架，0下架，1上架" />
      </el-form-item>
      <el-form-item label="是否有效，0已删除，1有效" prop="valid">
        <el-input v-model="dataForm.valid" placeholder="是否有效，0已删除，1有效" />
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
        title: '',
        subTitle: '',
        cid1: '',
        cid2: '',
        cid3: '',
        brandId: '',
        saleable: '',
        valid: '',
        createTime: '',
        lastUpdateTime: ''
      },
      dataRule: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        subTitle: [
          { required: true, message: '子标题不能为空', trigger: 'blur' }
        ],
        cid1: [
          { required: true, message: '1级类目id不能为空', trigger: 'blur' }
        ],
        cid2: [
          { required: true, message: '2级类目id不能为空', trigger: 'blur' }
        ],
        cid3: [
          { required: true, message: '3级类目id不能为空', trigger: 'blur' }
        ],
        brandId: [
          { required: true, message: '商品所属品牌id不能为空', trigger: 'blur' }
        ],
        saleable: [
          { required: true, message: '是否上架，0下架，1上架不能为空', trigger: 'blur' }
        ],
        valid: [
          { required: true, message: '是否有效，0已删除，1有效不能为空', trigger: 'blur' }
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
            url: `/app/spu/info/${this.dataForm.id}`,
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data) {
              this.dataForm.title = data.spu.title
              this.dataForm.subTitle = data.spu.subTitle
              this.dataForm.cid1 = data.spu.cid1
              this.dataForm.cid2 = data.spu.cid2
              this.dataForm.cid3 = data.spu.cid3
              this.dataForm.brandId = data.spu.brandId
              this.dataForm.saleable = data.spu.saleable
              this.dataForm.valid = data.spu.valid
              this.dataForm.createTime = data.spu.createTime
              this.dataForm.lastUpdateTime = data.spu.lastUpdateTime
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
            url: `/app/spu/${!this.dataForm.id ? 'save' : 'update'}`,
            method: 'post',
            data: {
              'id': this.dataForm.id || undefined,
              'title': this.dataForm.title,
              'subTitle': this.dataForm.subTitle,
              'cid1': this.dataForm.cid1,
              'cid2': this.dataForm.cid2,
              'cid3': this.dataForm.cid3,
              'brandId': this.dataForm.brandId,
              'saleable': this.dataForm.saleable,
              'valid': this.dataForm.valid,
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
