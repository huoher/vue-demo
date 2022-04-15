<template>
  <el-container>
    <el-header>
      <HeadNavbar></HeadNavbar>
    </el-header>
    <el-container>
      <el-aside>
        <SidebarMenu></SidebarMenu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import SidebarMenu from "@/layout/components/SidebarMenu";
import HeadNavbar from "@/layout/components/HeadNavbar";
</script>

<style scoped lang="stylus">
.el-main
  background-color #f6f6f6
</style>
