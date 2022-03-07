<template>
  <div class="my">
    <span>欢迎您 | </span>
    <el-dropdown>
      <span class="name">
        {{ userInfo.name }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script>
import {} from "vue";
import { getStore, setStore } from "@/utils/store";
import { useRouter } from "vue-router";
export default {
  setup() {
    const userInfo = getStore("userInfo");

    const router = useRouter();
    const logout = () => {
      setStore("token", "");
      router.push("/login");
    };
    return {
      userInfo,
      logout,
    };
  },
};
</script>

<style lang="less" scoped>
.my span {
  font-size: 14px;
  font-weight: 500;
  user-select: none;
}
.name {
  cursor: pointer;
}
// .name:hover .el-icon--right {
// transform: rotate(180deg);
// transition: all 0.3s ease-in-out;
// }
</style>
