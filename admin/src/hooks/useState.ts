import { computed } from "vue";
import { useStore, mapState } from "vuex";

const useState = function (type, mapper) {
  const store = useStore();
  let namespaced = "";
  let mappers = "";
  if (mapper) {
    namespaced = type;
    mappers = mapper;
  } else {
    mappers = type;
  }

  const storeStateFns = mapState(namespaced, mappers);
  const storeState = {};

  Object.entries(storeStateFns).forEach(([key, fn]) => {
    const stateFn = fn.bind({ $store: store });
    storeState[key] = computed(stateFn);
  });
  return storeState;
};

export default useState;
