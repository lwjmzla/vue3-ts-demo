// !单例~
const createStore = () => {
  const state = {};

  const update = () => {};
  const add = () => {};
  const remove = () => {};

  return {
    update,
    add,
    remove
  };
};

let store;

const useStore = () => {
  if (!store) store = createStore();
  return store;
};

export default useStore;
