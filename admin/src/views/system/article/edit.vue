<template>
  <el-dialog v-model="isOpen" :title="detail.id ? '修改' : '添加'" width="70%">
    <el-form ref="ruleFormRef" :rules="rules" label-width="100px" :model="form">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="缩略图" prop="picture">
        <el-upload
          ref="uploadRef"
          :file-list="fileList"
          accept=".png,.jpeg,.jpg"
          class="upload-demo"
          action="https://litt.club/cureApi/upload"
          :limit="1"
          :auto-upload="false"
          :on-success="onUpload"
          :on-handle-remove="onRemove"
        >
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
          <el-button class="ml-3" type="success" @click="submitUpload"> 上传 </el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <Tinymce ref="editor" :content="form.content" @change="noticeContentChange" />
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
import { add, update, Article } from "@/apis/sys/article";
import Tinymce from "@/components/Tinymce/index.vue";
import type { ElUpload } from "element-plus";
import { ElMessage } from "element-plus";
export default defineComponent({
  components: {
    Tinymce,
  },
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
        if (data.value.title && data.value.content) {
          fileList.value = [{ url: data.value.image, name: data.value.title }];
        }
      }
    });

    const form: Ref<Article> = ref({
      id: "",
      title: "",
      content: "",
      image: "",
    });
    const rules = reactive({
      title: [{ required: true, message: "标题不可为空", trigger: "blur" }],
      content: [{ required: true, message: "内容不可为空", trigger: "blur" }],
    });

    const noticeContentChange = (val: string) => {
      form.value.content = val;
    };

    const isLoading: Ref<boolean> = ref(false);
    const submit = async () => {
      let res: any = null;
      isLoading.value = true;

      if (form.value.id) {
        res = await update(form.value);
      } else {
        res = await add(form.value);
      }

      if (res.code === 200) {
        ElMessage.success("操作成功");
        emit("frensh");
        fileList.value = [];
        isOpen.value = false;
      } else {
        ElMessage.error("操作失败");
      }
      isLoading.value = false;
    };

    const fileList = ref<any[]>([]);
    const uploadRef = ref<InstanceType<typeof ElUpload>>();
    const submitUpload = () => {
      uploadRef.value!.submit();
    };
    const onUpload = (e: any) => {
      if (e.code === 200) {
        form.value.image = e.data;
        ElMessage.success("上传成功");
      } else {
        ElMessage.error("上传失败");
      }
    };
    const onRemove = (file: any, fileList: any[]) => {
      console.log(file, fileList);
    };

    return {
      isLoading,
      isOpen,
      detail: data,
      form,
      rules,
      submit,
      noticeContentChange,
      uploadRef,
      fileList,
      submitUpload,
      onUpload,
      onRemove,
    };
  },
});
</script>

<style lang="less">
.el-overlay {
  z-index: 1000;
}
</style>
