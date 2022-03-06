<template>
  <el-dialog v-model="isOpen" :title="detail.id ? '修改' : '添加'" width="50%">
    <el-form ref="ruleFormRef" :rules="rules" label-width="100px" :model="form">
      <el-form-item label="分值" prop="score">
        <el-input v-model="form.score" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="分值描述" prop="desc">
        <el-input v-model="form.desc" placeholder="请输入" />
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
import { computed, defineComponent, reactive, ref, Ref, toRefs, watch } from "vue";
import { add, update, Subject } from "@/apis/questions/bankOptions";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "OptionsEdit",
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
    const router = useRouter();
    const id: Ref = ref(0);
    id.value = router.currentRoute.value.params.id;

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
        form.value = data.value as any;
      }
    });

    const form: Ref<Subject> = ref({
      id: "",
      score: 0,
      subjectId: 0,
      desc: "",
    });
    const rules = reactive({
      score: [{ required: true, message: "分值不可为空", trigger: "blur" }],
      desc: [{ required: true, message: "描述内容不可为空", trigger: "blur" }],
    });

    const submit = async () => {
      let res: any = null;
      form.value.subjectId = id.value;
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
