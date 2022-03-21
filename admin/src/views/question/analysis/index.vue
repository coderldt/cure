<template>
  <div class="bank commonBox">
    <div class="title">题库解析</div>
    <div class="search">
      <el-form :model="form" inline>
        <el-form-item label="类型" prop="typeId">
          <el-select v-model="form.typeId">
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="24">
          <Table v-loading="isLoading" :column="tableColumn" :list="list" :is-pagination="false">
            <template #control="{ row }">
              <el-button type="text" @click="analysis(row)"> 解析 </el-button>
            </template>
          </Table>
        </el-col>
      </el-row>
    </div>
    <!-- <Edit v-model:show="modelDetail.show" :data="modelDetail.data" @frensh="getList" /> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { statusList } from "@/config/system";
import { ElMessage } from "element-plus";
// import Edit from "./edit.vue";
import Table, { TableColumn, Pagination } from "@/components/table/index.vue";
import { getData, del } from "@/apis/questions/bank";
import { getTypeList } from "@/apis/questions/bankOptions";

interface Form {
  typeId: string;
}

export interface List {
  id?: string;
  label: string;
  value: string;
  parentId: number | string;
}

interface Page {
  pageNum: number;
  pageSize: number;
}

interface ModelDetail {
  show: boolean;
  data?: any;
}

export default defineComponent({
  components: {
    Table,
    // Edit,
  },
  setup() {
    const store = useStore();
    const typeList = store.state.question.typeList;

    const form: Form = reactive({
      typeId: "",
    });

    const search = () => {
      getList();
    };

    const reset = () => {
      form.typeId = "";
      getList();
    };

    const total = ref(0);
    const page: Ref<Page> = ref({
      pageNum: 1,
      pageSize: 10,
    });
    const onPaginationChange = (Object: Pagination) => {
      const { page: pageNum, pageSize } = Object;
      page.value.pageNum = pageNum;
      page.value.pageSize = pageSize;
      getList();
    };

    const tableColumn: TableColumn[] = [
      { label: "类型", prop: "label", width: "", align: "center" },
      { label: "操作", align: "center", slot: "control" },
    ];

    let list: Ref<List[]> = ref([]);
    onMounted(() => {
      getList();
    });

    const isLoading: Ref<boolean> = ref(false);
    const getList = async () => {
      isLoading.value = true;
      const res: any = await getTypeList({ ...form });
      if (res.code === 200) {
        list.value = res.data;
        // total.value = res.data.total;
        // page.value.pageNum = res.data.pageNum;
        // page.value.pageSize = res.data.pageSize;
      }
      isLoading.value = false;
    };

    const modelDetail: Ref<ModelDetail> = ref({
      show: false,
      data: {},
    });

    const update = (row: List) => {
      modelDetail.value.data = row;
      modelDetail.value.show = true;
    };

    const dele = async (id: number) => {
      const res: any = await del(id);
      if (res.code === 200) {
        ElMessage.success("删除成功");
        getList();
      } else {
        ElMessage.error("删除失败");
      }
    };

    const router = useRouter();
    const analysis = (row: List) => {
      router.push(`/question/analysis/${row.value}/${row.label}`);
    };

    return {
      isLoading,
      typeList,
      form,
      search,
      reset,
      list,
      statusList,
      modelDetail,
      update,
      getList,
      dele,
      total,
      onPaginationChange,
      tableColumn,
      analysis,
    };
  },
});
</script>

<style lang="less" scoped>
.userManager {
  min-height: calc(100% - 40px);
}
.tree .el-input {
  margin-bottom: 15px;
}
</style>
