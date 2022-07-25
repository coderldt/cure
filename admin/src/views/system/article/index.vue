<template>
  <div class="userManager commonBox">
    <div class="title">文章管理</div>
    <div class="search">
      <el-form :model="form" inline>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入" />
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
            <template #status="{ row }">
              <el-switch v-model="row.status" :active-value="1" :inactive-value="2" />
            </template>
            <template #control="{ row }">
              <el-button type="text" @click="update(row)"> 编辑 </el-button>
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
import { statusList } from "@/config/system";
import { ElMessage } from "element-plus";
import Edit from "./edit.vue";
import Table, { TableColumn, Pagination } from "@/components/table/index.vue";
import { getData, del } from "@/apis/sys/article";

interface Form {
  title: string;
}

export interface List {
  id?: string;
  title: string;
  content: string;
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
    const form: Form = reactive({
      title: "",
    });

    const search = () => {
      getList();
    };

    const reset = () => {
      form.title = "";
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
      { label: "标题", prop: "title", width: "", align: "center" },
      { label: "内容", prop: "content", width: "", align: "center", showOverflowTooltip: true },
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
        await getList();
      } else {
        ElMessage.error("删除失败");
      }
    };

    return {
      isLoading,
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
      // edit,
      total,
      // del,
      // rePass,
      onPaginationChange,
      tableColumn,
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
