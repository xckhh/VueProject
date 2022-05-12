<template>
  <div class="index-page">
    <menu-banner></menu-banner>
    <div class="gray-page">
      <hot></hot>
      <all-partner/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less">
  .index-page {
    .gray-page {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: auto;
      background-color: #f5f5f5;
    }
  }
</style>