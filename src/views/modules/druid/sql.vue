<template>
  <div class="app-container">
    <iframe
      :src="src"
      width="100%"
      :height="height"
      frameborder="0"
      scrolling="yes"
    />
  </div>
</template>

<script>
export default {
  name: 'Sql',
  data() {
    return {
      height: document.body.clientHeight * 0.8,
      src: 'http://localhost:8894/api/druid/sql.html'
    }
  }
}
</script>

<style scoped>

</style>
