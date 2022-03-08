<template>
  <div class="tableCom">
    <el-table header-cell-class-name="dark" border highlight-current-row stripe :data="list">
      <el-table-column v-if="isOrderNum" align="center" label="序号" type="index" width="50" />
      <template v-for="(item, index) in column">
        <el-table-column v-if="item.slot" :key="'slot' + index" :label="item.label" :width="item.width" :align="item.align" :show-overflow-tooltip="item.showOverflowTooltip">
          <template #default="{ row }">
            <slot :name="item.slot" :row="row"></slot>
          </template>
        </el-table-column>
        <el-table-column v-else :key="index" :label="item.label" :prop="item.prop" :width="item.width" :align="item.align" :show-overflow-tooltip="item.showOverflowTooltip" />
      </template>
    </el-table>
    <el-pagination
      v-if="isPagination"
      v-model:currentPage="pagination.page"
      :page-sizes="pagination.pageSizes"
      :total="pagination.total"
      :page-size="pagination.pageSize"
      :layout="layout"
      @current-change="onPaginationChange"
      @size-change="onSizeChange"
    />
  </div>
</template>

<script lang="ts">
// 定义时请使用 TableColumn<> 或者 Array<TableColumn>
export interface TableColumn {
  label: string;
  prop?: string;
  width?: string | number;
  align?: "left" | "center" | "right";
  slot?: string;
  showOverflowTooltip?: boolean;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  pageSizes: number[];
}
import { defineComponent, reactive, toRefs, PropType } from "vue";
export default defineComponent({
  props: {
    isOrderNum: {
      type: Boolean,
      default: false,
    },
    column: {
      type: Object as PropType<TableColumn[]>,
      default: () => ({}),
    },
    list: {
      type: Array,
      default: () => [],
    },
    layout: {
      type: String as PropType<string>,
      default: "total, sizes, prev, pager, next, jumper",
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [10, 20, 50, 100],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  emits: ["onPaginationChange"],
  setup(props, { emit }) {
    // 分页
    const { pageSizes, total } = toRefs(props); // 因为是对象，外部数据会随着改变
    const pagination: Pagination = reactive({
      page: 1,
      pageSize: 10,
      total,
      pageSizes,
    });

    const onPaginationChange = (val: number) => {
      pagination.page = val;
      emit("onPaginationChange", pagination);
    };

    const onSizeChange = (val: number) => {
      pagination.pageSize = val;
      emit("onPaginationChange", pagination);
    };

    return {
      pagination,
      onPaginationChange,
      onSizeChange,
    };
  },
});
</script>

<style lang="less" scoped>
.tableCom {
  text-align: center;
  .el-table {
    :deep(.dark) {
      color: #323c47;
      background-color: #fafafa;
    }
  }
}
.el-table + .el-pagination {
  margin-top: 20px;
}
</style>
