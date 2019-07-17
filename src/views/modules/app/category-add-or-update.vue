<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px" @keyup.enter.native="dataFormSubmit()">
      <el-form-item label="类目名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="类目名称" />
      </el-form-item>
      <el-form-item label="父类目id,顶级类目填0" prop="parentId">
        <el-input v-model="dataForm.parentId" placeholder="父类目id,顶级类目填0" />
      </el-form-item>
      <el-form-item label="是否为父节点，0为否，1为是" prop="isParent">
        <el-input v-model="dataForm.isParent" placeholder="是否为父节点，0为否，1为是" />
      </el-form-item>
      <el-form-item label="排序指数，越小越靠前" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="排序指数，越小越靠前" />
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
        name: '',
        parentId: '',
        isParent: '',
        sort: ''
      },
      dataRule: {
        name: [
          { required: true, message: '类目名称不能为空', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '父类目id,顶级类目填0不能为空', trigger: 'blur' }
        ],
        isParent: [
          { required: true, message: '是否为父节点，0为否，1为是不能为空', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '排序指数，越小越靠前不能为空', trigger: 'blur' }
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
            url: `/app/category/info/${this.dataForm.id}`,
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data) {
              this.dataForm.name = data.category.name
              this.dataForm.parentId = data.category.parentId
              this.dataForm.isParent = data.category.isParent
              this.dataForm.sort = data.category.sort
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
            url: `/app/category/${!this.dataForm.id ? 'save' : 'update'}`,
            method: 'post',
            data: {
              'id': this.dataForm.id || undefined,
              'name': this.dataForm.name,
              'parentId': this.dataForm.parentId,
              'isParent': this.dataForm.isParent,
              'sort': this.dataForm.sort
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
