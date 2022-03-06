<template>
  <div class="collapse" @click="onCollapseChange">
    <el-icon color="#000" :size="20">
      <component :is="collapseStatus ? 'fold' : 'expand'" />
    </el-icon>
  </div>
</template>
<script>
import { inject } from "vue";
import { collapseKey } from "@/hooks/collapse";
export default {
  setup() {
    const collapseStatus = inject(collapseKey);
    return {
      collapseStatus: collapseStatus.collapseStatus,
      onCollapseChange: collapseStatus.onCollapseChange,
    };
  },
};
</script>

<style lang="less" scoped>
.collapse {
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
}
</style>
