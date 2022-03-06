<template>
  <div class="cRadioTag">
    <div v-for="(item, index) in list" :key="index" class="item" :class="{ isActive: getCurrentItem == item.key }" :name="item.key" @click="onItemClick(item.key)">
      {{ item.label }}
    </div>
  </div>
</template>
<script>
import { computed, defineComponent, toRefs } from "vue";
export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    defaultSelect: {
      type: String,
      default: "",
    },
  },
  emits: ["update:defaultSelect"],
  setup(props, { emit }) {
    const { defaultSelect } = toRefs(props);

    const getCurrentItem = computed({
      get: () => {
        return defaultSelect.value;
      },
      set: (value) => {
        emit("update:defaultSelect", value);
      },
    });

    const onItemClick = (key) => {
      getCurrentItem.value = key;
    };

    return {
      getCurrentItem,
      onItemClick,
    };
  },
});
</script>

<style lang="less" scoped>
.cRadioTag {
  display: flex;
  .item {
    margin-right: 20px;
    padding: 5px 20px 6px;
    border-radius: 2px;
    color: #474747;
    background-color: #f3f3f3;
    transition: all 0.3s;
    cursor: pointer;
  }
  .item.isActive {
    color: #fff;
    background-color: #0099ff;
  }
}
</style>
