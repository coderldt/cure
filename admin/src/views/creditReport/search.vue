<template>
  <div class="reportSeatch">
    <el-form ref="ruleForm" :model="form" label-width="120px" class="demo-ruleForm" inline>
      <!-- :rules="rules" -->
      <el-form-item label="公司全名：" prop="name">
        <el-input v-model="form.companyName" />
      </el-form-item>
      <el-form-item label="时间范围：" prop="region">
        <TimeRange @onSubmit="onSubmit" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch"> 搜索 </el-button>
        <el-button @click="onReset"> 重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import TimeRange from "./timeRange.vue";

interface Form {
  companyName: string;
  time: string | string[];
}

interface SubmitParams {
  time?: string;
  finalyValue: string | string[];
}

export default defineComponent({
  components: {
    TimeRange,
  },
  setup() {
    const form: Form = reactive({
      companyName: "",
      time: "",
    });

    const timeOption = ref([
      { label: "近7天", value: "7" },
      { label: "近1月", value: "30" },
      { label: "近3月", value: "90" },
      { label: "近6月", value: "180" },
      { label: "近12月", value: "365" },
    ]);

    const onReset = () => {
      form.companyName = "";
      form.time = "";
    };

    const onSubmit = ({ finalyValue }: SubmitParams) => {
      form.time = finalyValue;
    };

    const onSearch = () => {
      console.log(form);
    };

    return {
      form,
      timeOption,
      onSubmit,
      onReset,
      onSearch,
    };
  },
});
</script>

<style lang="less" scoped></style>
