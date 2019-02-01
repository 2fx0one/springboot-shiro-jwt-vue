<template>
  <div>
    modify
  </div>
</template>

<script>
import { userDetail } from '@/api/sys'

export default {
  name: 'ModifyUser',
  created() {
    console.log(this.$route.query)
    userDetail(this.$route.query.id).then(res => {
      console.log(res)
    })
  }
}
</script>

<style scoped>

</style>
