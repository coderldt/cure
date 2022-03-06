import { InjectionKey } from "vue";
import { createStore, Store, StoreOptions } from "vuex";
import common from "./children/common";
import risk from "./children/risk";
import { RootState } from "../types/store";

export const key: InjectionKey<Store<RootState>> = Symbol("index");

const store = createStore<RootState>({
  state: {
    data: 123,
  },
  modules: {
    common,
    risk,
  },
});

export default store;
