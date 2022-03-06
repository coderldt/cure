<template>
  <div class="listItem" :style="{ width: `${col / 0.24}%` }">
    <div class="label">{{ label }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    label: String,
    value: String,
    col: Number,
  },
  setup() {},
});
</script>

<style lang="less" scoped>
.listItem {
  display: flex;
  border-left: 1px solid #dad9d9;
  border-bottom: 1px solid #dad9d9;
  box-sizing: border-box;
  > div {
    padding: 7px;
  }
  .label {
    width: 210px;
    color: #3e4957;
    background-color: #eef1f4;
    border-right: 1px solid #dad9d9;
  }

  .value {
    flex: 1;
    color: #546470;
    background-color: #fff;
  }
}
</style>
