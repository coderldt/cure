<template>
  <el-dialog v-model="isOpen" :title="detail.id ? '修改' : '添加'" width="50%">
    <el-form ref="ruleFormRef" :rules="rules" label-width="100px" :model="form">
      <el-form-item label="题目描述" prop="title">
        <el-input v-model="form.title" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="题目类型" prop="typeId">
        <el-input v-model="form.typeId" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isOpen = false">取消</el-button>
        <el-button type="primary" @click="submit">{{ detail.id ? "修改" : "添加" }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, Ref, toRefs, watch } from "vue";
import { add, update, Subject } from "@/apis/questions/bank";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "Edit",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:show", "frensh"],
  setup(props, { emit }) {
    const { show, data } = toRefs(props);
    const isOpen = computed({
      get() {
        return show.value;
      },
      set(val) {
        emit("update:show", val);
      },
    });

    watch(isOpen, (val) => {
      if (val) {
        form.value = data.value;
      }
    });

    const form: Ref<Subject> = ref({
      id: "",
      title: "",
      typeId: "",
    });
    const rules = reactive({
      title: [{ required: true, message: "标题不可为空", trigger: "blur" }],
      typeId: [{ required: true, message: "类型不可为空", trigger: "blur" }],
    });

    const submit = async () => {
      let res: any = null;
      if (form.value.id) {
        res = await update(form.value);
      } else {
        res = await add(form.value);
      }

      if (res.code === 200) {
        ElMessage.success("操作成功");
        emit("frensh");
        isOpen.value = false;
      } else {
        ElMessage.error("操作失败");
      }
    };

    return {
      isOpen,
      detail: data,
      form,
      rules,
      submit,
    };
  },
});
</script>

<style lang="less" scoped></style>
