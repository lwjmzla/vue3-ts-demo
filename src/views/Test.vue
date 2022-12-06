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
    <div class="ContentVisibility">
      <ul>
        <li v-for="(item,index) in 1000" :key="index">
          <ContentVisibility :book="book" :index="index"></ContentVisibility>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, isReactive, reactive, toRefs, onMounted } from 'vue';
import GetDate from './getDate';
// import router from '@/router';
import { useRouter, useRoute } from 'vue-router';
import { DrawerMove } from 'lwj-lego-components';
import bbui from '@/components/bbui.vue';
import ContentVisibility from '@/components/content-visibility.vue';
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
  components: { DrawerMove, ContentVisibility },
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
    const book = {
      bookCover: 'https://www.ibaibu.com/_nuxt/img/logo.735f341.png',
      bookName: 'bookName',
      catlog: 'catlog',
      tags: ['A', 'B', 'C'],
      desc: 'WELCOME TO BAIBU 拥有齐全的面料品类参数数据库,通过智能硬件+AI识别算法,快速精准匹配面料。 扫码下载APP 让/天/下/没/有/难/找/的/布 全程专人1对1服务, 交易步骤全程可控,轻松收货 ..'
    };
    return {
      state,
      ...toRefs(state),
      imagesValue,
      handleUpdate,
      testDrawer,
      handleOpenDrawer,
      handleCloseDrawer,
      handleRouter,
      book
    };
  }
});
</script>
