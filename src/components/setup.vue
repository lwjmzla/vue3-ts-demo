<template>
  <div class="hello">
    <el-button @click="handleConfirm" type="primary">confirm</el-button>
    <el-button @click="handlBeforeClose" type="primary">beforeClose</el-button>
    <ul>
      <li v-for="(item,index) in myData" :key="index">
        <slot name="liSlot" :item="item" :index="index">{{index}}</slot>
      </li>
    </ul>
    {{isShow}} {{title}}
    <slot></slot>
    <p>{{attrs}}</p>

    <div>
        <input
            v-model="debounceCurrValue"
            placeholder="Typed value"
            style="width: 280"
        />
        <p style="marginTop: 16px">DebouncedValue: {{debounceValue}}</p>
    </div>

    <div class="hello1">
      <button
        style="margin-top: 30px"
        type="button"
        @click="handleVirtualScrollTo"
      >
        scroll to
      </button>
      <div
        :ref="containerProps.ref"
        @scroll="containerProps.onScroll"
        style="height: 300px; overflow: auto;border: 1px solid #cccccc"
      >
        <div :style="wrapperStyle">
          <div
            v-for="active in list"
            :key="active"
            style="
              height: 59px;
              border-bottom: 1px solid #cccccc;
              background-color: white;
            "
          >
            {{ active }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, useAttrs, inject, ref, Ref, watch } from 'vue';
import { useDebounce, useExternal, useVirtualList } from '@/hooks/index';

const props = defineProps({
  title: { type: String, default: '123' },
  beforeClose: Function
});

const slots = useSlots();
const attrs = useAttrs();

const emit = defineEmits(['confirm']);

const handleConfirm = () => {
  emit('confirm', 'confirm111');
};
const handlBeforeClose = () => {
  props.beforeClose!(handleConfirm);
};
const myData = ['lwj', 'lwb'];
const isShow = inject('isShow');

const debounceCurrValue = ref(1);

const debounceValue = useDebounce(debounceCurrValue, 500);
// const debounceValue: any = ref('');
// const debounceFnRun = useDebounceFn(() => {
//   debounceValue.value = debounceCurrValue.value++;
// }, 500);
const arr = ['i', 'b', 'a', 'i', 'b', 'u'];

const { load, unload } = useExternal(
  'https://static-cdn.' + arr.join('') + '.com/vue/2.6.10/vue.min.js',
  (el) => { console.log(el); }
);

const { list, wrapperStyle, containerProps, scrollTo } = useVirtualList(
  Array.from(Array(1000).keys()),
  {
    itemHeight: 60
    // overscan: 10
  }
);

const handleVirtualScrollTo = () => {
  scrollTo(500);
};
</script>

<script lang="ts">
export default {
  name: 'Setup'
  // inheritAttrs: false,
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
