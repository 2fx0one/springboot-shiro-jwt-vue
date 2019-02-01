<template>
  <div class="app-container">
    <tree-table :data="treeData" :columns="columns" :expand-all="false" border>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="handleMenu(scope.row)">点击</el-button>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import { menuList } from '@/api/sys'
import { listToTree } from '@/utils'

export default {
  name: 'MenuManager',
  components: { treeTable },
  data() {
    return {
      columns: [
        {
          text: '菜单名称',
          value: 'name',
          width: 300
        },
        {
          text: '链接',
          value: 'href'
        },
        {
          text: '权限标识',
          value: 'permission'
        }
      ],
      treeData: [
        {
          id: 0,
          name: '事件1',
          href: '无',
          permission: '',
          children: [
            {
              id: 0,
              name: '事件2',
              href: '无',
              permission: ''
            }
          ]
        }
      ]
    }
  },
  created() {
    menuList().then(res => {
      const data = res.map(e => ({ id: e.id, parentId: e.parentId, name: e.name, href: e.href, permission: e.permission }))
      const treeData = listToTree(data, 2)
      console.log(treeData)
      this.treeData = treeData
    })
  },
  methods: {
    handleMenu(row) {
      this.$message.info('click' + row.name)
    }
  }
}
</script>

<style scoped>

</style>
