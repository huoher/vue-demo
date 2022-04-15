<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      background-color="#f0f0f0"
    >
      <SidebarMenuItem
        v-for="route in routes"
        :key="route.path"
        :base-path="route.path"
        :is-collapse="isCollapse"
        :route="route"
      >
      </SidebarMenuItem>
    </el-menu>
  </el-scrollbar>
</template>

<script setup>
import SidebarMenuItem from '@/layout/components/SidebarMenuItem'
import { computed, onMounted } from 'vue'
import store from '@/store'

let isCollapse = false

const routes = computed(() => {
  return store.state.permission.routes
})

onMounted(() => {
  console.log(routes.value)
})
</script>

<style lang="stylus" scoped>
.scrollbar-wrapper
  overflow-x hidden !important

  .el-menu-item.is-active
    color #d2f6ee
    background-color #1ece9a
</style>
