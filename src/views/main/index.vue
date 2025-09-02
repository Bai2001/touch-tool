<script lang="ts" setup>
import Nav from './components/nav.vue'
</script>
<template>
  <div class="main">
    <Nav></Nav>
    <main>123</main>
  </div>
</template>
<style lang="less" scoped>
.main {
  border-radius: 5px;
  overflow: hidden;
  height: 100%;

  display: flex;
  flex-direction: column;

  main {
    flex: 1;
  }
}
</style>
