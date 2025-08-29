<script lang="ts" setup>
import { ref } from 'vue'
</script>
<template>
  <div class="ball-container">
    <div class="ball">home</div>
  </div>
</template>
<style lang="less" scoped>
.ball-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .ball {
    width: 58px;
    height: 58px;
    background: blue;
    border-radius: 5px;
    user-select: none;
  }
}
</style>
