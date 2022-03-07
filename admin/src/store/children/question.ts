import { InjectionKey } from "vue";
import { Module, Store, useStore as baseUseStore } from "vuex";
import { RootState } from "../../types/store";
import { getChildrenData } from "@/apis/sys/dist";

export interface TypeItem {
  parentId: number;
  label: string;
  value: string;
}

interface State {
  typeList: Array<TypeItem>;
}

const risk: Module<State, RootState> = {
  namespaced: true,
  state: {
    typeList: [],
  },
  mutations: {
    saveTypeList(state, data) {
      state.typeList = data;
    },
  },
  actions: {
    getTypeList({ commit }) {
      getChildrenData(5).then((res: any) => {
        if (res.code === 200) {
          commit("saveTypeList", res.data);
        }
      });
    },
  },
};

const key: InjectionKey<Store<State>> = Symbol("question");

export function useStore() {
  return baseUseStore(key);
}

export default risk;
