import { InjectionKey } from "vue";
import { Module, Store, useStore as baseUseStore } from "vuex";
import { RootState } from "../../types/store";

interface State {
  detail: Object;
}

const risk: Module<State, RootState> = {
  namespaced: true,
  state: {
    detail: {},
  },
  mutations: {
    onDetailChange(state, detail) {
      state.detail = detail;
    },
  },
  actions: {
    onDetailChange({ commit }, detail) {
      console.log("risk", detail);

      commit("onDetailChange", detail);
    },
    clean({ commit }) {
      commit("onDetailChange", {});
    },
  },
};

const key: InjectionKey<Store<State>> = Symbol("risk");

export function useStore() {
  return baseUseStore(key);
}

export default risk;
