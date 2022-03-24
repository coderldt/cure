<template>
  <el-dialog v-model="isOpen" :title="detail.id ? '修改' : '添加'" width="70%">
    <el-form ref="ruleFormRef" :rules="rules" label-width="100px" :model="form">
      <el-form-item label="名字" prop="name">
        <el-input v-model="form.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="缩略图" prop="logo">
        <el-upload
          ref="uploadRef"
          :file-list="fileList"
          class="upload-demo"
          accept=".png,.jpeg,.jpg"
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
      <el-form-item label="音频" prop="url">
        <el-upload
          ref="AudiouploadRef"
          :file-list="audiofileList"
          class="upload-demo"
          action="https://litt.club/cureApi/uploadAudio"
          accept=".mp3"
          :limit="1"
          :auto-upload="false"
          :on-success="onAudioUpload"
          :on-handle-remove="onAudioRemove"
        >
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
          <el-button class="ml-3" type="success" @click="submitAudioUpload"> 上传 </el-button>
        </el-upload>
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
import { add, update, Audio } from "@/apis/sys/audio";
import type { ElUpload } from "element-plus";
import { ElMessage } from "element-plus";
export default defineComponent({
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
        if (data.value.logo) {
          fileList.value = [{ url: data.value.logo, name: data.value.name }];
        }
        if (data.value.url) {
          audiofileList.value = [{ url: data.value.url, name: data.value.name }];
        }
      }
    });

    const form: Ref<Audio> = ref({
      id: "",
      name: "",
      url: "",
      logo: "",
    });
    const rules = reactive({
      name: [{ required: true, message: "名字不可为空", trigger: "blur" }],
      logo: [{ required: true, message: "缩略图不可为空", trigger: "blur" }],
      url: [{ required: true, message: "音频不可为空", trigger: "blur" }],
    });

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
        form.value.logo = e.data;
        ElMessage.success("上传成功");
      } else {
        ElMessage.error("上传失败");
      }
    };
    const onRemove = (file: any, fileList: any[]) => {
      console.log(file, fileList);
    };

    const audiofileList = ref<any[]>([]);
    const AudiouploadRef = ref<InstanceType<typeof ElUpload>>();
    const submitAudioUpload = () => {
      AudiouploadRef.value!.submit();
    };
    const onAudioUpload = (e: any) => {
      if (e.code === 200) {
        form.value.url = e.data;
        ElMessage.success("上传成功");
      } else {
        ElMessage.error("上传失败");
      }
    };
    const onAudioRemove = (file: any, fileList: any[]) => {
      console.log(file, fileList);
    };

    return {
      isLoading,
      isOpen,
      detail: data,
      form,
      rules,
      submit,
      uploadRef,
      fileList,
      submitUpload,
      onUpload,
      onRemove,
      audiofileList,
      AudiouploadRef,
      submitAudioUpload,
      onAudioUpload,
      onAudioRemove,
    };
  },
});
</script>

<style lang="less">
.el-overlay {
  z-index: 1000;
}
</style>
