import { createStore, Store, useStore as baseUseStore } from 'vuex';
import { InjectionKey } from 'vue';
interface StateType {
  name: string;
  age: number;
}

export const key: InjectionKey<Store<StateType>> = Symbol('InjectionKey');

const store: Store<StateType> = createStore({
  state: {
    name: 'lwj',
    age: 18
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
});

export function useStore () {
  return baseUseStore(key);
}

export default store;
