<template>
  <div class="test">
    <el-button type="primary" @click="handleOpenDrawer">打开</el-button>
    <el-button type="primary" @click="handleRouter">跳转</el-button>
    <!-- <bb-drawer-move
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
    </bb-drawer-move> -->

    <drawer-move
      ref='testDrawer'
      :size='700'
      cache="TEST_DRAWER"
    >
      <template #header>
        <div>123</div>
        <el-button @click="handleCloseDrawer">关闭11</el-button>
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
    </drawer-move>
    {{name}}{{age}}
    <p>{{state.name}}{{state.age}}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, isReactive, reactive, toRefs, onMounted } from 'vue';
import GetDate from './getDate';
// import router from '@/router';
import { useRouter, useRoute } from 'vue-router';
import { DrawerMove } from 'lwj-lego-components';
import bbui from '@/components/bbui.vue';
console.log(bbui);
// !注意使用本地包的话。1。lwj-lego-components生成软链  2.保持vue版本一致"vue": "file:../vue3-ts-demo/node_modules/vue",

// !后续直接从BBUI引入
// interface BBDrawerMove {
//   open(): void;
//   close(): void;
//   getCurrentWidth(): number;
// }
interface State {
  name: string;
  age: number;
}
export default defineComponent({
  name: 'Test',
  components: { DrawerMove },
  setup () {
    type DrawerInstance = InstanceType<typeof DrawerMove>
    const enquiredDetailDrawer = ref<DrawerInstance | null>(null);
    enquiredDetailDrawer.value?.open();
    const router = useRouter();
    const route = useRoute();
    console.log(route);
    console.log(isReactive(route));
    console.log(route.params.id);
    const state = reactive<State>({
      name: 'lwj',
      age: 18
    });
    console.log(state);
    const testDrawer = ref<DrawerInstance | null>(null);
    const handleOpenDrawer = () => {
      testDrawer.value?.open();
    };
    const handleCloseDrawer = () => {
      testDrawer.value?.close();
    };

    const imagesValue = ref(['https://www.baidu.com/img/flexible/logo/pc/result.png']);
    const handleUpdate = (images:string[]) => {
      console.log(images);
    };
    const handleRouter = () => {
      router.push({
        name: 'TestId',
        params: { id: 1 },
        query: { name: 'lwj' }
      });
      // router.push('/test/1');
    };
    onMounted(() => {
      (window as any).myDate = new GetDate();
      async function async1 () {
        console.log(2);
        await async2();
        console.log(6);
      }

      async function async2 () {
        console.log(3);
      }

      console.log(1);

      setTimeout(() => {
        console.log(8);
      }, 0);

      async1();

      new Promise<void>((resolve) => {
        console.log(4);
        resolve();
      }).then(() => {
        console.log(7);
      });

      console.log(5);
    });
    return {
      state,
      ...toRefs(state),
      imagesValue,
      handleUpdate,
      testDrawer,
      handleOpenDrawer,
      handleCloseDrawer,
      handleRouter
    };
  }
});
</script>
