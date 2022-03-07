<template>
  <div class="bank commonBox">
    <div class="title"><span class="back" @click="back">&lt; 返回 </span>题库解析选项</div>
    <div class="title">{{ title }}</div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="2" :offset="22">
          <el-button @click="add">添加</el-button>
        </el-col>
        <el-col :span="24">
          <Table v-loading="isLoading" :column="tableColumn" :list="list" :is-pagination="false">
            <template #score="{ row }">
              {{ row.direction === 1 ? `${row.score}&lt;` : row.direction === 3 ? `>=${row.score}` : row.score }}
            </template>
            <template #control="{ row }">
              <el-button type="text" @click="update(row)"> 编辑 </el-button>
              <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" title="确认删除该段解析?" @confirm="del(row.id)">
                <template #reference>
                  <el-button type="text"> 删除 </el-button>
                </template>
              </el-popconfirm>
            </template>
          </Table>
        </el-col>
      </el-row>
    </div>
    <AnalysisEdit v-model:show="modelDetail.show" :data="modelDetail.data" @frensh="getList" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { statusList } from "@/config/system";
import { ElMessage } from "element-plus";
import AnalysisEdit from "./analysisEdit.vue";
import Table, { TableColumn } from "@/components/table/index.vue";
import { getData, Subject, dele } from "@/apis/questions/analysis";

interface ModelDetail {
  show: boolean;
  data?: any;
}

export default defineComponent({
  components: {
    Table,
    AnalysisEdit,
  },
  setup() {
    const router = useRouter();
    const id: Ref = ref(0);
    const title: Ref = ref("");

    id.value = router.currentRoute.value.params.typeId;
    title.value = router.currentRoute.value.params.title;

    const tableColumn: TableColumn[] = [
      { label: "分数", width: "", align: "center", slot: "score" },
      { label: "描述", prop: "content", width: "", align: "center" },
      { label: "操作", align: "center", slot: "control" },
    ];

    let list: Ref<Subject[]> = ref([]);
    onMounted(() => {
      getList();
    });

    const isLoading: Ref<boolean> = ref(false);
    const getList = async () => {
      if (!id.value) {
        return;
      }
      isLoading.value = true;
      const res: any = await getData({ typeId: id.value });
      if (res.code === 200) {
        list.value = res.data.sort((a: Subject, b: Subject) => (a.score as number) - (b.score as number));
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

    const update = (row: Subject) => {
      modelDetail.value.data = row;
      modelDetail.value.show = true;
    };

    const del = async (id: number) => {
      const res: any = await dele(id);
      if (res.code === 200) {
        ElMessage.success("解析删除成功");
        getList();
      } else {
        ElMessage.error("删除失败");
      }
    };

    const back = () => {
      router.back();
    };

    return {
      isLoading,
      title,
      list,
      statusList,
      modelDetail,
      add,
      update,
      getList,
      del,
      tableColumn,
      back,
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

.back {
  display: inline-block;
  margin-right: 20px;
}
</style>
