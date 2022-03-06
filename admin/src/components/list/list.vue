<template>
  <div class="list">
    <!-- <template v-for="(item, index) in list" :key="index">
      <component :is="itemType" ></component>
    </template> -->
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    itemType: {
      type: String,
      default: "listItem",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup() {},
});
</script>

<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #dad9d9;
  border-right: 1px solid #dad9d9;
}
</style>
