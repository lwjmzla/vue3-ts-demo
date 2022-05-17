
<script lang="tsx">
import { defineComponent, ref, mergeProps } from 'vue';
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

    return () => (
      <div>
        <div>{num.value}</div>
        <div>{slots.default?.()}</div>
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
