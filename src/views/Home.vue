<template>
  <div class="home" @click="add">
    <!-- <img alt="Vue logo" src="../assets/logo.png">-->
    <HelloWorld class="hello" @haha="() => {}" ref="hello" msg="Welcome to Your Vue.js + TypeScript App">
      <div>default</div>
      <template v-slot:footer>
        <div>footer</div>
      </template>
    </HelloWorld>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, watchEffect, watchPostEffect } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  created () {
    type T0 = Exclude<'a' | 'b' | 'c', 'a' |'d'>;
    // !前面的有包含后面的么？有交集，则never（删除掉），返回剩下的值 type Exclude<T, U> = T extends U ? never : T;
    type T1 = Extract<'a' | 'b' | 'c', 'a' |'d'>; // !前面的有包含后面的么？返回交集  type Extract<T, U> = T extends U ? T : never;

    interface IPerson2{
      name: string;
      age: number;
      sex: string;
      eyes: number;
    }
    type w = 'name' | 'age' | 'haha'
    type MY<T, U> = T extends U ? T : U;
    type my = MY<w, keyof IPerson2>

    type Words = 'a'|'b'|'c';

    type W<T> = T extends Words ? true : false;

    type WA = W<'a'>; // -> true

    interface Dog {
      age?: number;
      name?: string;
      price?: number;
    }

    type RequiredDog = Required<Dog>;
    // 等价于

    const dog: RequiredDog = {
      age: 2,
      name: 'xiaobai',
      price: 10
    };
    console.log(dog.price);

    type Record1<K extends keyof any, T> = {
      [P in K]: T
    }
    type Record2<K, T> = {
        [P in keyof K]: T;
    };
    type IPerson3 = Record1<keyof IPerson2, string>
    type IPerson4 = Record2<IPerson2, string>
  },
  setup () {
    const { proxy } = getCurrentInstance() as any; // 这个proxy既可以获取到data() {}里的数据，也可以获取到setup() {}返回的数据
    const add = () => {
      proxy.$refs.hello.addNum();
    };
    onMounted(() => {
      console.log('onMounted', proxy.$refs.hello);
    });
    watchEffect(() => {
      console.log('watchEffect', proxy.$refs.hello);
    }, { flush: 'post' });
    watchPostEffect(() => {
      console.log('watchPostEffect', proxy.$refs.hello);
    });
    return {
      add
    };
  }
});
</script>
