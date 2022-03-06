<template>
  <div class="echarts">
    <div :id="id" :style="{ height: `${height}px` }"></div>
    <el-empty v-if="isEmpty" :image-size="emptySize" description="暂无数据" />
    <slot></slot>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, toRefs, watch } from "vue";
import * as echarts from "echarts";
import debounce from "lodash.debounce";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 400,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    emptySize: {
      type: Number,
      default: 80,
    },
  },
  setup(props) {
    const { options, id } = toRefs(props);
    // 判断数据为空
    const isEmpty = computed(() => !options.value.series.length);

    // echarts初始化
    let chartDom = null;
    let myChart = null;

    const setOptions = () => {
      myChart.setOption(options.value);
    };

    onMounted(() => {
      chartDom = document.querySelector(`#${id.value}`);
      myChart = echarts.init(chartDom);
      setOptions();
    });
    watch(options, setOptions);

    // 屏幕分辨率调整时，自适应动画
    const resize = debounce(() => {
      myChart.resize({
        animation: {
          duration: 300,
          easing: "cubicInOut",
        },
      });
    }, 300);
    window.addEventListener("resize", resize);

    onUnmounted(() => {
      window.removeEventListener("resize", resize);
    });
    return {
      isEmpty,
    };
  },
};
</script>

<style lang="less" scoped>
.echarts {
  position: relative;
}
.el-empty {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
