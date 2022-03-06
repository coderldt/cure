<template>
  <div class="dict commonBox">
    <div class="title">字典管理</div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-row>
            <el-col :span="12"> 一级标题 </el-col>
            <el-col :span="2" :offset="10">
              <el-button @click="add">添加</el-button>
            </el-col>
          </el-row>
          <Table :column="tableColumn" :list="list" :total="list.length" :is-pagination="false">
            <template #control="{ row }">
              <el-button type="text" @click="update(row)"> 修改 </el-button>
              <el-button type="text" @click="detail(row)"> 列表 </el-button>
              <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" title="确认删除该字典?" @confirm="dele(row.id)">
                <template #reference>
                  <el-button type="text"> 删除 </el-button>
                </template>
              </el-popconfirm>
            </template>
          </Table>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col :span="12">{{ currentDist.id ? `${currentDist.label} - ` : "" }} 二级列表 </el-col>
            <el-col :span="2" :offset="10">
              <el-button v-if="currentDist.id" @click="addChildren">添加</el-button>
            </el-col>
          </el-row>
          <Table :column="tableColumn" :list="childrenList" :is-pagination="false">
            <template #control="{ row }">
              <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" title="确认删除该字典?" @confirm="delChildren(row.value)">
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
    <ChildrenEdit :id="currentDist.id" v-model:show="modelChildrenDetail.show" @frensh="detail(currentDist)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, Ref, ref } from "vue";
import { ElMessage } from "element-plus";
import { getData, del, Params, getChildrenData, ChildrenList, childrenDel } from "@/apis/sys/dist";
import Table, { TableColumn } from "@/components/table/index.vue";
import Edit from "./edit.vue";
import ChildrenEdit from "./childrenEdit.vue";
interface ModelDetail {
  show: boolean;
  data?: any;
}

export default defineComponent({
  components: {
    Table,
    Edit,
    ChildrenEdit,
  },
  setup() {
    const tableColumn: TableColumn[] = [
      { label: "中文名字", prop: "label" },
      { label: "英文值", prop: "value" },
      { label: "操作", align: "center", slot: "control" },
    ];
    const list: Ref<Params[]> = ref([]);

    const getList = async () => {
      const res = await getData();
      list.value = res.data as [];
    };

    onMounted(() => {
      getList();
    });

    const modelDetail: Ref<ModelDetail> = ref({
      show: false,
      data: {},
    });
    const add = () => {
      modelDetail.value.data = {};
      modelDetail.value.show = true;
    };

    const update = (row: Params) => {
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

    const childrenList: Ref<ChildrenList[]> = ref([]);
    const currentDist: Ref<Params> = ref({});
    const detail = async (row: Params) => {
      currentDist.value = row;
      const res: any = await getChildrenData(row.id as number);
      if (res.code === 200) {
        childrenList.value = res.data;
      }
    };
    const modelChildrenDetail: Ref<ModelDetail> = ref({
      show: false,
    });
    const addChildren = () => {
      modelChildrenDetail.value.show = true;
    };

    const delChildren = async (value: string) => {
      const res: any = await childrenDel(value);
      if (res.code === 200) {
        ElMessage.success("删除成功");
        detail(currentDist.value);
      } else {
        ElMessage.error("删除失败");
      }
    };
    return {
      tableColumn,
      list,
      childrenList,
      add,
      update,
      dele,
      modelDetail,
      modelChildrenDetail,
      getList,
      detail,
      addChildren,
      currentDist,
      delChildren,
    };
  },
});
</script>

<style lang="less" scoped></style>
