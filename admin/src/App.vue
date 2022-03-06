<template>
  <Layout />
</template>
<script lang="ts">
import { provide, defineComponent, ref } from "vue";
import Layout from "@/layout/index.vue";
import collapseHook, { collapseKey } from "@/hooks/collapse";
import { setStore } from "@/utils/store";

interface UserInfo {
  name: string;
  age?: number;
}

export default defineComponent({
  components: {
    Layout,
  },
  setup() {
    const userInfo: UserInfo = { name: "coderlt" };
    setStore("userInfo", userInfo);
    provide(collapseKey, collapseHook);

    const a = 1;
  },
});
</script>
