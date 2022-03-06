<template>
  <div class="bank commonBox">
    <div class="title"><span class="back" @click="back">&lt; 返回 </span>题库选项</div>
    <div class="title">{{ title }}</div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="2" :offset="22">
          <el-button @click="add">添加</el-button>
        </el-col>
        <el-col :span="24">
          <Table :column="tableColumn" :list="list" :is-pagination="false">
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
    <OptionEdit v-model:show="modelDetail.show" :data="modelDetail.data" @frensh="getList" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { statusList } from "@/config/system";
import { ElMessage } from "element-plus";
import OptionEdit from "./OptionEdit.vue";
import Table, { TableColumn } from "@/components/table/index.vue";
import { getData, del, Subject } from "@/apis/questions/bankOptions";

interface ModelDetail {
  show: boolean;
  data?: any;
}

export default defineComponent({
  components: {
    Table,
    OptionEdit,
  },
  setup() {
    const router = useRouter();
    const id: Ref = ref(0);
    const title: Ref = ref("");
    id.value = router.currentRoute.value.params.id;
    title.value = router.currentRoute.value.params.title;

    const tableColumn: TableColumn[] = [
      { label: "分数", prop: "score", width: "", align: "center" },
      { label: "描述", prop: "desc", width: "", align: "center" },
      { label: "操作", align: "center", slot: "control" },
    ];

    let list: Ref<Subject[]> = ref([]);
    onMounted(() => {
      getList();
    });

    const getList = async () => {
      if (!id.value) {
        return;
      }
      const res: any = await getData({ subjectId: Number(id.value) });
      if (res.code === 200) {
        list.value = res.data;
      }
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

    const dele = async (id: number) => {
      const res: any = await del(id);
      if (res.code === 200) {
        ElMessage.success("删除成功");
        getList();
      } else {
        ElMessage.error("删除失败");
      }
    };

    const back = () => {
      router.back();
    };

    return {
      title,
      list,
      statusList,
      modelDetail,
      add,
      update,
      getList,
      dele,
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
