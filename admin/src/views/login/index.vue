<template>
  <div class="login-container">
    <el-form ref="loginForm" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">登 录</h3>
      </div>
      <el-form-item prop="phone">
        <span class="label">电话：</span>
        <el-input v-model="phone" placeholder="请输入电话" name="phone" type="text" autocomplete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="label">密码：</span>
        <el-input v-model="password" placeholder="请输入密码" name="password" tabindex="2" autocomplete="on" />
      </el-form-item>

      <el-button type="primary" style="width: 100%; margin-bottom: 30px" @click="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { setStore } from "@/utils/store";
import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const phone = ref("");
    const password = ref("");

    const phones = ["18735674692", "3237846556"];

    const router = useRouter();
    const handleLogin = () => {
      if (phones.includes(phone.value)) {
        setStore("token", "123456");
        ElMessage.success("登录成功");
        router.push("/coreHome");
      } else {
        ElMessage.error("登录失败");
      }
    };

    return {
      phone,
      password,
      handleLogin,
    };
  },
});
</script>

<style lang="less" scoped>
/* reset element-ui css */
.login-container {
  /deep/.el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 47px;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="less" scoped>
.login-container {
  min-height: 100vh;
  width: 100%;
  background: #2d3a4b;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .label {
    display: inline-block;
    width: 77px;
    text-align: center;
    color: #fff;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
