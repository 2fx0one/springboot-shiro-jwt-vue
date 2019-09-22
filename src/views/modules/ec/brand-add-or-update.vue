<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="品牌名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="品牌名称" />
      </el-form-item>
      <el-form-item label="品牌图片地址" prop="image">
        <el-input v-model="dataForm.image" placeholder="品牌图片地址" />
      </el-form-item>
      <el-form-item label="品牌的首字母" prop="letter">
        <el-input v-model="dataForm.letter" placeholder="品牌的首字母" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getBrandInfo, saveBrand, updateBrand } from '@/api/ec/brand'
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: '',
        image: '',
        letter: ''
      },
      dataRule: {
        name: [
          { required: true, message: '品牌名称不能为空', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '品牌图片地址不能为空', trigger: 'blur' }
        ],
        letter: [
          { required: true, message: '品牌的首字母不能为空', trigger: 'blur' }
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
          getBrandInfo(this.dataForm.id).then(({ data }) => {
            if (data) {
              this.dataForm.name = data.name
              this.dataForm.image = data.image
              this.dataForm.letter = data.letter
            }
          })
        }
      })
    },
    saveOrUpdate(data) {
      return !this.dataForm.id ? saveBrand(data) : updateBrand(data)
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.saveOrUpdate({
            'id': this.dataForm.id || undefined,
            'name': this.dataForm.name,
            'image': this.dataForm.image,
            'letter': this.dataForm.letter
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
