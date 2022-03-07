<template>
  <el-dialog v-model="isOpen" :title="detail.id ? '修改' : '添加'" width="50%">
    {{ form }}
    <el-form ref="ruleFormRef" :rules="rules" label-width="100px" :model="form">
      <el-form-item label="分数值" prop="score">
        <el-input v-model="form.score" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="方向" prop="direction">
        <el-select v-model="form.direction">
          <el-option label="小于" :value="1" />
          <el-option label="分值段" :value="2" />
          <el-option label="大于" :value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="题目类型" prop="content">
        <el-input v-model="form.content" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isOpen = false">取消</el-button>
        <el-button type="primary" :loading="isLoading" @click="submit">{{ detail.id ? "修改" : "添加" }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, Ref, toRefs, watch } from "vue";
import { useRouter } from "vue-router";
import { add, update, Subject } from "@/apis/questions/analysis";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
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
    const router = useRouter();
    const id: Ref = ref(0);
    id.value = router.currentRoute.value.params.typeId;

    const { show, data } = toRefs(props);
    const isOpen = computed({
      get() {
        return show.value;
      },
      set(val) {
        emit("update:show", val);
      },
    });

    const store = useStore();
    const typeList = store.state.question.typeList;

    watch(isOpen, (val) => {
      if (val) {
        form.value = data.value;
      }
    });

    const form: Ref<Subject> = ref({
      id: "",
      score: 0,
      content: "",
      direction: 2,
      typeId: "",
    });
    const rules = reactive({
      direction: [{ required: true, message: "方向不可为空", trigger: "blur" }],
      score: [{ required: true, message: "分值不可为空", trigger: "blur" }],
      content: [{ required: true, message: "内容描述不可为空", trigger: "blur" }],
    });

    const isLoading: Ref<boolean> = ref(false);
    const submit = async () => {
      isLoading.value = true;
      let res: any = null;
      form.value.typeId = id.value;
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
      isLoading.value = false;
    };

    return {
      isLoading,
      typeList,
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
