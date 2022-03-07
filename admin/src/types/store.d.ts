import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";

// 声明自己的 store state
export interface RootState {
  data: number;
}

export interface CommonState {
  collapse: boolean;
}

declare module "@vue/runtime-core" {
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<RootState | CommonState>;
  }
}
