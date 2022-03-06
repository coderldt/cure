<template>
  <CommonBox title="代办事项">
    <div class="content">
      <div v-for="(item, index) in list" :key="index" class="item">
        <div class="label">
          {{ item.title }}
          <el-icon size="14"><arrow-right /></el-icon>
        </div>
        <div class="term">
          <span class="value">{{ item.value }}</span>
          <img :src="surprisedImg" alt="" />
        </div>
      </div>
    </div>
  </CommonBox>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import surprised from "@/assets/img/surprised.png";

interface list {
  title: string;
  value: number;
}

export default defineComponent({
  setup() {
    const list: Array<list> = [
      { title: "高风险信号", value: 17 },
      { title: "中风险信号", value: 0 },
      { title: "低风险信号", value: 256 },
      { title: "提示信息", value: 625 },
    ];

    const surprisedImg = surprised;
    return {
      list,
      surprisedImg,
    };
  },
});
</script>

<style lang="less" scoped>
.content {
  display: flex;

  .item {
    flex: 1;
    padding-right: 20px;

    .label {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      font-size: 14px;
      color: #a5a5a5;
    }

    .term {
      display: flex;
      height: 40px;

      .value {
        flex: 1;
        font-size: 30px;
        font-weight: 600;
      }
      img {
        width: auto;
        height: 100%;
      }
    }
  }

  .item:not(:first-child) {
    margin-left: 20px;
  }
  .item:not(:last-child) {
    border-right: 1px solid #eaeaea;
  }
  .item:last-child {
    padding-right: 0;
  }
}
</style>
