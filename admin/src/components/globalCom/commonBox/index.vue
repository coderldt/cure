<template>
  <div class="commonBox">
    <div class="title">
      <el-icon v-if="isBack" class="back" @click="onBackClick"><arrow-left-bold /></el-icon>
      {{ title }}
      <div v-if="isMore" class="more" @click="onMoreClick">{{ moreText }}</div>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    isMore: {
      type: Boolean,
      default: false,
    },
    isBack: {
      type: Boolean,
      default: false,
    },
    moreText: {
      type: String,
      default: "更多",
    },
  },
  emits: ["onMoreClick"],
  setup(props, { emit }) {
    const onMoreClick = () => {
      emit("onMoreClick");
    };

    const router = useRouter();
    const onBackClick = () => {
      router.go(-1);
    };
    return {
      onMoreClick,
      onBackClick,
    };
  },
});
</script>

<style lang="less">
.commonBox {
  padding: 20px;
  border-radius: 4px;
  background-color: #fff;

  .title {
    display: flex;
    align-items: center;
    position: relative;
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 15px;
    .back {
      margin-right: 10px;
      cursor: pointer;
      font-size: 20px;
    }
  }

  .more {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 14px;
    color: #74b7ff;
    cursor: pointer;
  }
}
</style>
