import { ref, Ref, InjectionKey } from "vue";

interface Collapse {
  collapseStatus: boolean;
  onCollapseChange: () => void;
}

const collapseKey: InjectionKey<Collapse> = Symbol("collapse");

const collapseHook: Collapse = {
  collapseStatus: false,
  onCollapseChange: function () {
    this.collapseStatus = !this.collapseStatus;
  },
};

export { Collapse, collapseKey };
export default collapseHook;
