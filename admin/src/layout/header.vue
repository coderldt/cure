<template>
  <div class="header">
    <Collapse class="collapse" />
    <My class="my" />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import Collapse from "@/components/collapse";
import My from "@/components/my";
export default defineComponent({
  components: {
    Collapse,
    My,
  },
  setup() {},
});
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 100%;
  padding: 0 20px;

  .my {
    flex: 1;
    text-align: right;
  }
}
</style>
