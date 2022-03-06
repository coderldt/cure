<template>
  <div class="creditReport commonBox">
    <div class="title">征信报告</div>
    <Search />
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="name" label="公司名称" align="center" />
      <el-table-column prop="createTime" label="生成时间" align="center" />
      <el-table-column prop="status" label="状态" align="center" />
      <el-table-column prop="address" label="操作" width="180" align="center" />
      <template v-slot:empty>
        <el-empty description="暂时数据" :image-size="80" />
      </template>
    </el-table>
    <el-pagination v-model:currentPage="currentPage" :page-size="100" layout="total, prev, pager, next, jumper" :total="0" @current-change="handleCurrentChange" />
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import Search from "./search.vue";

interface List {
  name: string;
  createTime: string;
  status: number;
  address: string;
}

export default defineComponent({
  components: {
    Search,
  },
  setup() {
    const list: Ref<List[]> = ref([]);

    const currentPage: Ref<number> = ref(0);
    const handleCurrentChange = () => {};
    return {
      list,
      currentPage,
      handleCurrentChange,
    };
  },
});
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
