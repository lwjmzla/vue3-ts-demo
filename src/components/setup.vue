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
    <p>{{slots.default && slots.default()}}</p>
    <slot></slot>
    <p>{{attrs}}</p>
  </div>
</template>

<script lang="ts" setup>
import { useSlots, useAttrs, inject } from 'vue';
const props = defineProps({
  title: { type: String, default: '123' },
  beforeClose: Function
});

const slots = useSlots();
console.log(slots);
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
