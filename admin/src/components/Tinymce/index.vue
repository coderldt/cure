<template>
  <div>
    <Editor v-model="richText" :api-key="tinymceFlag" :init="editorInit" :disabled="disable" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onActivated, onMounted, Ref, ref, toRefs, watch } from "vue";

import Editor from "@tinymce/tinymce-vue";

export default defineComponent({
  name: "HelloWorld",
  components: {
    Editor,
  },
  props: {
    editorData: {
      type: Object,
      default: () => ({
        wigth: "100%",
        height: 400,
      }),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: "",
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const { editorData, disabled, content } = toRefs(props);
    const formEditor: Ref<any> = ref("");
    const VALUE = ref({
      value: "",
      text: "",
    });
    const value: Ref<string> = ref("");
    const tinymceFlag: Ref<String> = ref("mwf0mkspxukelca4ty2csqhlmjhg13olc3sp2ua0ksetrclp");

    const editorInit: any = {
      language: "zh_CN",
      height: editorData.value.height,
      width: editorData.value.width,
      menubar: false,
      plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount"],
      toolbar: `undo redo | formatselect | bold italic backcolor |
           alignleft aligncenter alignright alignjustify |
           bullist numlist outdent indent | removeformat | help`,
      branding: false,
      fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
      font_formats:
        "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats;知乎配置=BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;小米配置=Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif",
      template_cdate_format: "[CDATE: %m/%d/%Y : %H:%M:%S]",
      template_mdate_format: "[MDATE: %m/%d/%Y : %H:%M:%S]",
      toolbar_drawer: false,
      paste_data_images: true, // 粘贴图片
      // 图片异步上传处理函数
      images_upload_handler: (blobInfo: any, success: any, failure: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(blobInfo.blob());
        reader.onload = function (e: any) {
          success(e.currentTarget.result);
        };
      },
      init_instance_callback: (editor: any) => {
        formEditor.value = editor;
        if (value.value) {
          editor.setContent(value.value, { format: "raw" });
        }
      },
    };

    watch(value, (val) => {
      emit("change", val);
    });

    watch(content, (val) => {
      value.value = val;
    });

    onMounted(() => {
      if (content.value) {
        value.value = content.value;
      }
    });

    return {
      tinymceFlag,
      richText: value,
      editorInit,
      disable: disabled,
    };
  },
});
</script>

<style scoped>
.tox-statusbar__branding {
  display: none;
}
</style>
