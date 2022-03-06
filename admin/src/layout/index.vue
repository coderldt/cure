<template>
  <el-container>
    <el-aside :width="getCommonWidth">
      <Logo :title="configData.title" />
      <Menu />
    </el-aside>
    <el-container>
      <el-header :style="{ right: 0, left: getCommonWidth }">
        <Header />
      </el-header>
      <el-main :style="{ left: getCommonWidth }">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { computed, inject } from "vue";
import Logo from "@/components/logo/index.vue";
import Header from "./header.vue";
import Menu from "@/components/menu/index.vue";
import { config } from "@/config";
import { collapseKey } from "@/hooks/collapse";
export default {
  components: {
    Header,
    Logo,
    Menu,
  },
  setup() {
    const configData = config;
    const collapse = inject(collapseKey);

    const getCommonWidth = computed(() => {
      return collapse.collapseStatus ? "63px" : "200px";
    });

    return {
      configData,
      getCommonWidth,
    };
  },
};
</script>

<style lang="less" scoped>
.el-container {
  position: relative;
  height: 100vh;
}
.el-header {
  position: fixed;
  background-color: #fff;
  color: var(--el-text-color-primary);
  line-height: 60px;
  padding: 0;
  box-shadow: 1px 0 3px #aeadad;
  z-index: 1;
  transition: all 0.5s;
  z-index: 999;
}

.el-aside {
  position: fixed;
  min-height: 100vh;
  background-color: #fff;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
  box-shadow: 2px 0px 5px #e4e2e2;
  z-index: 2;
  transition: width 0.5s;
  z-index: 999;
}

.el-main {
  position: absolute;
  right: 0;
  bottom: 0;
  top: 60px;
  background-color: #f3f6f8;
  color: var(--el-text-color-primary);
  padding: 20px;
  transition: all 0.5s;
}
</style>
