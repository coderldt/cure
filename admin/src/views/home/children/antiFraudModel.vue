<template>
  <div class="antiFraudModel">
    <el-row :gutter="20">
      <el-col :span="14">
        <Echarts id="platformRegis" v-loading="loading" :height="300" :options="platformRegis">
          <el-select v-model="platformRegisVal" size="mini" placeholder="请选择时间">
            <el-option v-for="item in selectTimes" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </Echarts>
      </el-col>
      <el-col :span="10">
        <Echarts id="antiFraud" v-loading="loading" :height="300" :empty-size="100" :options="antiFraud">
          <el-select v-model="antiFraudTimeVal" size="mini" placeholder="请选择时间">
            <el-option v-for="item in selectTimes" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </Echarts>
      </el-col>
      <el-col :span="24">
        <div class="title">反欺诈模型运行结果</div>
        <el-form ref="formSearch" :inline="true" :model="form" :rules="formRules" class="请输入企业名称">
          <el-row>
            <el-col :span="6">
              <el-form-item prop="enterpriseMame" label="企业名称">
                <el-input v-model="form.enterpriseMame" placeholder="企业名称" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="命中规则">
                <el-select v-model="form.hitRule">
                  <el-option label="全部" value="all" />
                  <el-option label="aToB" value="aToB" />
                  <el-option label="bToC" value="bToC" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="调用时间">
                <el-date-picker v-model="form.callTime" type="daterange" range-separator="To" start-placeholder="开始日期" end-placeholder="结束日期" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button @click="formResetFields">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table v-loading="loading" :data="list" border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="enterpriseMame" label="企业名称" align="center" />
          <el-table-column prop="hitRule" label="命中规则" align="center" />
          <el-table-column prop="callTime" label="调用时间" align="center" />
        </el-table>
        <el-pagination v-model:currentPage="pagination.page" layout="prev, pager, next" :total="pagination.total" @current-change="getList" />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { ElMessage, ElForm } from "element-plus";
import { defineComponent, ref, watch, reactive, Ref } from "vue";

interface TimeOptions {
  label: string;
  value: string;
}

interface Form {
  enterpriseMame: string;
  hitRule: string;
  callTime: string;
}

interface List {
  enterpriseMame: string;
  hitRule: string;
  callTime: string;
}

interface Pagination {
  total: number;
  page: number;
  pageSize: number;
}

export default defineComponent({
  setup() {
    const selectTimes: Array<TimeOptions> = reactive([
      { label: "七天", value: "7", age: 100 },
      { label: "一月", value: "30" },
      { label: "三月", value: "120" },
      { label: "半年", value: "186" },
      { label: "一年", value: "365" },
    ]);

    const platformRegisVal: Ref<string> = ref("7");
    const getPlatformRegis = () => {
      ElMessage.success("数据加载成功");
    };
    watch(platformRegisVal, getPlatformRegis);
    const platformRegis = {
      title: {
        text: "平台注册企业变化趋势",
        textStyle: {
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };

    const antiFraudTimeVal: Ref<string> = ref("7");
    const getantiFraud = () => {
      ElMessage.success("数据加载成功");
    };
    watch(antiFraudTimeVal, getantiFraud);
    const antiFraud = {
      title: {
        text: "反欺诈模型命中规则分布",
        textStyle: {
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        type: "scroll",
        bottom: "5%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "20",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "Search Engine" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    };

    // 表单搜索
    const form: Form = reactive({
      enterpriseMame: "1",
      hitRule: "all",
      callTime: "",
    });
    const formRules = reactive({
      enterpriseMame: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
        {
          min: 3,
          max: 5,
          message: "Length should be 3 to 5",
          trigger: "blur",
        },
      ],
    });

    const formSearch = ref<InstanceType<typeof ElForm>>();
    // formSearch.value;
    const formResetFields = () => {
      formSearch.value?.resetFields();
    };

    const onSubmit = async () => {
      const valid = await formSearch.value?.validate();
      if (valid) {
        getList();
        console.log(111, form);
      }
    };

    const list = ref<List[]>([]);
    const pagination = reactive<Pagination>({
      total: 88,
      page: 1,
      pageSize: 10,
    });

    const getList = () => {
      list.value = [
        { enterpriseMame: "1", hitRule: "1", callTime: "2020-01-01" },
        { enterpriseMame: "2", hitRule: "2", callTime: "2021-10-08" },
        { enterpriseMame: "3", hitRule: "3", callTime: "2022-10-13" },
        { enterpriseMame: "4", hitRule: "5", callTime: "2021-01-02" },
        { enterpriseMame: "5", hitRule: "6", callTime: "1998-10-15" },
        { enterpriseMame: "6", hitRule: "1", callTime: "1996-10-30" },
        { enterpriseMame: "7", hitRule: "75", callTime: "2022-01-01" },
        { enterpriseMame: "8", hitRule: "135", callTime: "2022-05-06" },
        { enterpriseMame: "9", hitRule: "34683", callTime: "2021-06-19" },
      ];
      pagination.total = Math.floor(Math.random() * 100);
      ElMessage.success("数据加载成功");
    };
    getList();

    const loading = ref(true);
    setTimeout(() => {
      loading.value = false;
    }, 1500);
    return {
      selectTimes,
      platformRegisVal,
      platformRegis,
      antiFraudTimeVal,
      antiFraud,
      form,
      formRules,
      formSearch,
      onSubmit,
      formResetFields,
      list,
      pagination,
      getList,
      loading,
    };
  },
});
</script>

<style lang="less" scoped>
#platformRegis + .el-select,
#antiFraud + .el-select {
  position: absolute;
  right: 10px;
  top: 0;
  width: 90px;
}

:deep(.el-date-editor--daterange.el-input__inner) {
  width: 100%;
}

.el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
