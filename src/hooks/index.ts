import { ref, Ref, watch } from 'vue';
export * from './useExternal';
export * from './useVirtualList';

// !用来处理值防抖。
export function useDebounce<T> (valueRef: Ref<T>, delay: number) {
  const debounceRef = ref(valueRef.value) as Ref<T>;
  const run = useDebounceFn(() => {
    debounceRef.value = valueRef.value;
  }, 500);
  watch(valueRef, () => {
    run();
  }, { deep: true });
  return debounceRef;
}

// !防抖函数。
export function useDebounceFn (cb: () => void, delay: number) {
  let timer: any = null;
  function run () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      cb();
    }, delay = 500);
  }
  return run;
}

// !节流函数。
export function useThrottleFn (cb: () => void, delay: number) {
  let timer: any = null;
  function run () {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      cb();
      clearTimeout(timer);
      timer = null;
    }, delay = 500);
  }
  return run;
}
