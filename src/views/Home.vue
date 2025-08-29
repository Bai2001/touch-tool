<script lang="ts" setup>
import { ref, useTemplateRef, watchEffect } from 'vue'

const isDraging = ref(false)

window.api.onDrag((e, isDrag) => {
  isDraging.value = isDrag
})
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
    cursor: pointer;
    -webkit-app-region: drag;
  }
}
</style>
