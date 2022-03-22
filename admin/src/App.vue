<template>
  <!-- <Layout /> -->
  <router-view />
</template>
<script lang="ts">
import { provide, defineComponent, ref, onMounted } from "vue";
// import Layout from "@/layout/index.vue";
import collapseHook, { collapseKey } from "@/hooks/collapse";
import { setStore, getStore } from "@/utils/store";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

interface UserInfo {
  name: string;
  age?: number;
}

export default defineComponent({
  components: {
    // Layout,
  },
  setup() {
    const userInfo: UserInfo = { name: "coderlt" };
    const router = useRouter();
    setStore("userInfo", userInfo);
    const token = getStore("token");
    if (!token) {
      router.push("/login");
    }

    provide(collapseKey, collapseHook);

    const store = useStore();
    onMounted(() => {
      store.dispatch("question/getTypeList");
    });

    const a = 1;
  },
});
</script>

<style>
.el-overlay {
  z-index: 1000 !important;
}
</style>
