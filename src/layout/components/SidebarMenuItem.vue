<template>
  <template
    v-if="hasOneShowingChild(props.route.children, props.route) && (!onlyOneChild.children || onlyOneChild.noShowingChildren)"
  >
    <el-menu-item
      :index="resolvePath(onlyOneChild.child.path)"
      active-text-color="#d0f4ed"
    >
      <span>{{ onlyOneChild.child.meta.title }}</span>
    </el-menu-item>
  </template>
  <template
    v-else
  >
    <el-sub-menu
      ref="subMenu"
      :index="resolvePath(props.route.path)"
      popper-append-to-body
    >
      <template
        #title
        v-if="props.route.meta"
      >
        <span>{{ props.route.meta.title }}</span>
      </template>
      <SidebarMenuItem
        v-for="child in props.route.children"
        :key="child.path"
        :route="child"
        :base-path="resolvePath(child.path)"
      >
      </SidebarMenuItem>
    </el-sub-menu>
  </template>
</template>

<script setup>
import path from 'path-browserify'
import { reactive } from 'vue'

const props = defineProps({
  route: {
    type:　Object,
  },
  isCollapse: {
    type:　Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

function resolvePath(routePath) {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  console.log(path.resolve(props.basePath, routePath))
  return path.resolve(props.basePath, routePath)
}

const onlyOneChild = reactive({
  child: null
})
function hasOneShowingChild(children = [], parent) {
  const showingChildren = children.filter(item => {
    console.log(item)
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.child = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.child = { ... parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
</script>

<style scoped lang="stylus">
</style>
