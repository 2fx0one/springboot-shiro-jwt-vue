<template>
  <div class="app-container">
    <tree-table :data="treeData" :columns="columns" :expand-all="false" border>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.responsesAgency"
            size="mini"
            type="danger">{{ scope.row.responsesAgency && '监控支撑点' || '' }}
          </el-button>
          <el-button
            v-if="scope.row.grade === '3' && scope.row.responsesAgency === '1'"
            type="text"
            @click=" cancelAgency(scope.row, '0')">取消
          </el-button>
          <el-button
            v-if="scope.row.grade === '3' && !scope.row.responsesAgency"
            type="text"
            @click=" cancelAgency(scope.row, '1')">设置监控支撑点
          </el-button>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import { officeList } from '@/api/sys'
import { listToTree } from '@/utils'
import { officeModify } from '../../../api/sys'

export default {

  name: 'OfficeManager',
  components: { treeTable },
  data() {
    return {
      columns: [
        {
          text: '部门名称',
          value: 'name',
          width: 300
        },
        {
          text: 'ID',
          value: 'id'
        },
        {
          text: '所属区域',
          value: 'areaName'
        }
      ],
      treeData: [
        {
          id: 0,
          name: '',
          areaName: '无',
          children: [
            {
              id: 1,
              name: '',
              areaName: '无'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.getOfficeList()
  },
  methods: {
    getOfficeList() {
      officeList().then(res => {
        console.log(res)
        const data = res.map(e => ({
          id: e.id,
          grade: e.grade,
          responsesAgency: e.responsesAgency,
          parentId: e.parentId,
          name: e.name,
          areaName: e.area.name
        }))
        // const data = res
        const treeData = listToTree(data, 2)

        // treeData.children.sort((a, b) => a - b)
        console.log(treeData)
        this.treeData = treeData
      })
    },
    cancelAgency(row, status) {
      // console.log(row)
      officeModify({
        id: row.id,
        status
      }).then(res => {
        console.log(res)
        this.getOfficeList()
      })
      this.$message.info(row + ' : ' + status)
    }
  }
}
</script>

<style scoped>

</style>
