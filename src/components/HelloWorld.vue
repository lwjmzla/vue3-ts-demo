
<script lang="tsx">
import { defineComponent, ref, mergeProps, watchEffect, getCurrentInstance, withModifiers, onMounted } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store/index';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup (props, { expose, slots, attrs }) {
    const store = useStore(key);
    console.log(store.state.name);
    const num = ref(0);
    const addNum = () => {
      // num.value = num.value + 1;
      num.value++;
      // num.value = num.value++; // !这个是永远取值0了，傻了
    };
    expose({
      addNum
    });
    const newAttrs = mergeProps(
      {
        // 该 class 将与 $attrs 中的其他 class 合并。
        class: 'active'
      },
      attrs
    );
    console.log(newAttrs);
    /**
     * !sadsadwqesad
     */
    const stop = watchEffect((onCleanup) => { //! onCleanup清理回调(也是函数)会在该副作用下一次执行前被调用，可以用来清理无效的副作用
      console.log('num.value:', num.value);
      let timer:any = setTimeout(() => {
        console.log('timer');
      }, 2000);
      onCleanup(() => {
        clearTimeout(timer);
        timer = null;
      });
    });
    const { proxy } = getCurrentInstance() as any;
    const hello = ref<HTMLElement | null>(null);
    watchEffect(() => {
      console.log('watchEffect--hello', proxy.$refs.hello); // !ref="hello"生效 像onMounted那样获取到DOM或者组件实例
      console.log('watchEffect ref hello', hello.value); // ! ref={hello}生效
    }, { flush: 'post' });

    onMounted(() => {
      console.log('onMounted hello', hello.value);
    });

    return () => (
      <div ref={hello}>
        <div>{num.value}</div>
        <div onClick={withModifiers(() => stop(), ['stop', 'prevent'])}>{slots.default?.() || 'default-hello'}</div>
        <div>{slots.footer?.()}</div>
      </div>
    );
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
