<template>
  <div class="hello">
    <el-button @click="handleConfirm" type="primary">confirm</el-button>
    <el-button @click="handlBeforeClose" type="primary">beforeClose</el-button>
    <ul>
      <li v-for="(item,index) in myData" :key="index">
        <slot name="liSlot" :item="item" :index="index">{{index}}</slot>
      </li>
    </ul>
    {{isShow}}
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { DrawerMove } from 'lwj-lego-components';
import { ElTable } from 'element-plus';

export default defineComponent({
  name: 'Demo',
  // inheritAttrs: false,
  props: {
    beforeClose: Function
  },
  emits: ['confirm'],
  setup (props, { emit, attrs }) {
    type TypeElTable = InstanceType<typeof ElTable>
    const tableRef = ref<TypeElTable | null>(null);
    tableRef.value?.clearSelection();
    tableRef.value?.toggleRowSelection([], true);

    type DrawerInstance = InstanceType<typeof DrawerMove>
    const enquiredDetailDrawer = ref<DrawerInstance | null>(null);
    enquiredDetailDrawer.value?.open();
    enquiredDetailDrawer.value?.getCurrentWidth();
    // console.log(attrs);
    const handleConfirm = () => {
      emit('confirm', 'confirm111');
    };
    const handlBeforeClose = () => {
      props.beforeClose!(handleConfirm);
    };
    const myData = ['lwj', 'lwb'];
    return {
      handleConfirm,
      handlBeforeClose,
      myData,
      isShow: inject('isShow')
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
