<template>
  <CommonBox title="统计分析">
    <div class="content">
      <div v-for="(item, index) in list" :key="index" class="item">
        <div class="label">
          {{ item.title }}
        </div>
        <div class="term">
          <span class="value">{{ item.value }}</span>
          <div class="trend" :style="{ background: colorList[item.type].back }">
            <el-icon :color="colorList[item.type].color">
              <component :is="item.type ? 'bottom' : 'top'" />
            </el-icon>
            <div class="count" :style="{ color: colorList[item.type].color }">
              {{ item.count }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="typeItem">
      <el-tabs v-model="tabsActive">
        <el-tab-pane v-for="(item, index) in tabs" :key="index" :label="item.label" :name="item.component">
          <component :is="item.component" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </CommonBox>
</template>
<script lang="ts">
import { ref, defineComponent, Ref } from "vue";
import Model from "./children";

interface List {
  title: string;
  value: number;
  type: number;
  count: number;
}

interface Color {
  back: string;
  color: string;
}

interface Tab {
  label: string;
  component: string;
}
export default defineComponent({
  components: {
    ...Model,
  },
  setup() {
    // 0 下降 1 上升
    const list: Ref<List[]> = ref([
      { title: "平台注册企业数量", value: 17, type: 0, count: 5 },
      { title: "已过门资产数量", value: 0, type: 1, count: 20 },
      { title: "已尽调资产数量", value: 256, type: 0, count: 5 },
      { title: "风险预警在监控企业", value: 625, type: 1, count: 100 },
    ]);

    const colorList = {
      0: {
        back: "#fef4f4",
        color: "#e86361",
      },
      1: {
        back: "#d3edea",
        color: "#2bcbba",
      },
    };

    const tabsActive: Ref<string> = ref("antiFraudModel");
    const tabs: Tab[] = [
      { label: "反欺诈模型", component: "antiFraudModel" },
      { label: "安检门模型", component: "safetyCheckModel" },
      { label: "业务风险识别模型", component: "businessRiskModel" },
      { label: "风险预警模型", component: "rRiskWarningModel" },
      { label: "主体评分模型", component: "subjectScoreModel" },
    ];

    return {
      list,
      colorList,
      tabsActive,
      tabs,
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
      align-items: center;
      height: 40px;

      .value {
        flex: 1;
        font-size: 30px;
        font-weight: 600;
      }

      .trend {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px 10px;
        border-radius: 4px;
        height: 24px;
        min-width: 40px;

        .el-icon {
          position: relative;
          top: 1px;
        }
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

.typeItem {
  margin-top: 15px;
}
</style>
