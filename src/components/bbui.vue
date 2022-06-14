<template>
  <div>
    <el-button type="primary" @click="handleOpenDrawer">打开</el-button>
    <bb-drawer-move
      ref='testDrawer'
      :size='700'
      :before-close="handleCloseDrawer"
      cache="TEST_DRAWER"
    >
      <template #header>
        <div>123</div>
        <el-button @click="handleCloseDrawer">关闭</el-button>
      </template>
      <div>
        内容
      </div>
      <template #footer>
        <el-button>确认</el-button>
      </template>
    </bb-drawer-move>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// !后续直接从BBUI引入
interface BBDrawerMove {
  open(): void;
  close(): void;
  getCurrentWidth(): number;
}
export default defineComponent({
  setup () {
    const testDrawer = ref<BBDrawerMove>();
    const handleOpenDrawer = () => {
      testDrawer.value?.open();
    };
    const handleCloseDrawer = () => {
      testDrawer.value?.close();
    };
    return {
      testDrawer,
      handleOpenDrawer,
      handleCloseDrawer
    };
  }
});
</script>

<style></style>
