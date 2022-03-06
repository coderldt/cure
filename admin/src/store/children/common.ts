import { InjectionKey } from "vue";
import { Module, Store, useStore as baseUseStore } from "vuex";
import { CommonState, RootState } from "../../types/store";

const common: Module<CommonState, RootState> = {
  namespaced: true,
  state: {
    collapse: true,
  },
  mutations: {
    onCollapseChange(state) {
      state.collapse = !state.collapse;
      console.log("common", state.collapse);
    },
  },
  actions: {
    onCollapseChange({ commit }) {
      commit("onCollapseChange");
    },
  },
};

const key: InjectionKey<Store<RootState>> = Symbol("common");

export function useStore() {
  return baseUseStore(key);
}

export default common;
