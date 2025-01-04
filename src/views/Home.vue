<template>
  <div class="container" style="padding-top: 0">
    <SearchMap />
  </div>
</template>
<script setup lang="ts">
  // @ts-ignore
  import SearchMap from '../components/SearchMap.vue'
</script>
<style scoped lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 60px;
    text-align: center;
  }
  .creator {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    text-decoration: none;
    color: black;
  }
  .icon {
    color: white;
  }
</style>
