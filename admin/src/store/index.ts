import { InjectionKey } from "vue";
import { createStore, Store, StoreOptions } from "vuex";
import common from "./children/common";
import risk from "./children/risk";
import question from "./children/question";
import { RootState } from "../types/store";

export const key: InjectionKey<Store<RootState>> = Symbol("index");

const store = createStore<RootState>({
  state: {
    data: 123,
  },
  modules: {
    common,
    risk,
    question,
  },
});

export default store;
