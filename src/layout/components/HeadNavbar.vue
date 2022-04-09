<template>
  <div class="navbar-content">
    <el-image
      :src="logoUrl"
    >
    </el-image>
    <p class="nav-title">
      Demo Vue 系统后台
    </p>
  </div>
</template>

<script setup>
const logoUrl = '/favicon.ico'
</script>

<style scoped lang="stylus">
.navbar-content
  width 100%
  display flex
  align-items center
.nav-title
  color #42b983
  font-size 1.4em
  font-weight bolder
</style>
