<template>
  <div class="test">
    <el-button type="primary" @click="handleOpenDrawer">打开</el-button>
    <bb-drawer-move
      ref='testDrawer'
      :size='700'
      cache="TEST_DRAWER"
    >
      <template #header>
        <div>123</div>
        <el-button @click="handleCloseDrawer">关闭</el-button>
      </template>
      <div>
        <bb-image-upload
        :value="imagesValue"
        :limit="5"
        :size="0.5"
        @update="handleUpdate"
      ></bb-image-upload>
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
  name: 'Test',
  setup () {
    const testDrawer = ref<BBDrawerMove>();
    const handleOpenDrawer = () => {
      testDrawer.value?.open();
    };
    const handleCloseDrawer = () => {
      testDrawer.value?.close();
    };

    const imagesValue = ref(['https://img.ibaibu.com/baibu_9717ef59543444c7bae1f6b257fcf1d4.png']);
    const handleUpdate = (images:string[]) => {
      console.log(images);
    };
    return {
      imagesValue,
      handleUpdate,
      testDrawer,
      handleOpenDrawer,
      handleCloseDrawer
    };
  }
});
</script>
