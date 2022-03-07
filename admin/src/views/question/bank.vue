<template>
  <div class="bank commonBox">
    <div class="title">题库管理</div>
    <div class="search">
      <el-form :model="form" inline>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入" />
        </el-form-item>
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
        <el-col :span="2" :offset="22">
          <el-button @click="add">添加</el-button>
        </el-col>
        <el-col :span="24">
          <Table v-loading="isLoading" :column="tableColumn" :list="list" :total="total" @onPaginationChange="onPaginationChange">
            <template #typeId="{ row }">
              {{ getTypeLabel(row.typeId) }}
            </template>
            <template #control="{ row }">
              <el-button type="text" @click="update(row)"> 编辑 </el-button>
              <el-button type="text" @click="options(row)"> 选项 </el-button>
              <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" title="确认删除该文章?" @confirm="dele(row.id)">
                <template #reference>
                  <el-button type="text"> 删除 </el-button>
                </template>
              </el-popconfirm>
            </template>
          </Table>
        </el-col>
      </el-row>
    </div>
    <Edit v-model:show="modelDetail.show" :data="modelDetail.data" @frensh="getList" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { statusList } from "@/config/system";
import { ElMessage } from "element-plus";
import Edit from "./edit.vue";
import Table, { TableColumn, Pagination } from "@/components/table/index.vue";
import { getData, del } from "@/apis/questions/bank";
import { TypeItem } from "@/store/children/question";

interface Form {
  title: string;
  typeId: string;
}

export interface List {
  id?: string;
  title: string;
  typeId: string;
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
    Edit,
  },
  setup() {
    const store = useStore();
    const typeList = store.state.question.typeList;
    const form: Form = reactive({
      title: "",
      typeId: "",
    });

    const search = () => {
      getList();
    };

    const reset = () => {
      form.title = "";
      form.typeId = "";
      getList();
    };

    const getTypeLabel = (typeId: string) => {
      const typeItem = typeList.find((i: TypeItem) => i.value === typeId);
      if (typeItem) {
        return typeItem.label;
      }
      return "未知类型";
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
      { label: "标题", prop: "title", width: "", align: "center" },
      { label: "类型", slot: "typeId", width: "", align: "center" },
      { label: "操作", align: "center", slot: "control" },
    ];

    let list: Ref<List[]> = ref([]);
    onMounted(() => {
      getList();
    });

    const isLoading: Ref<boolean> = ref(false);
    const getList = async () => {
      isLoading.value = true;
      const res: any = await getData({ ...form, ...page.value });
      if (res.code === 200) {
        list.value = res.data.result;
        total.value = res.data.total;
        page.value.pageNum = res.data.pageNum;
        page.value.pageSize = res.data.pageSize;
      }
      isLoading.value = false;
    };

    const modelDetail: Ref<ModelDetail> = ref({
      show: false,
      data: {},
    });

    const add = () => {
      modelDetail.value.data = {};
      modelDetail.value.show = true;
    };

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
    const options = (row: List) => {
      router.push(`/question/bankOptions/${row.id}/${row.title}`);
    };

    return {
      isLoading,
      typeList,
      getTypeLabel,
      form,
      search,
      reset,
      list,
      statusList,
      modelDetail,
      add,
      update,
      getList,
      dele,
      total,
      onPaginationChange,
      tableColumn,
      options,
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
