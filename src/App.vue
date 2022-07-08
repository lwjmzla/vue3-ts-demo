<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-link to="/test">test</router-link>
  </div>
  <router-view v-slot="{ Component }">
    <transition name="slide-right" mode="out-in">
      <keep-alive>
        <component :is="Component" :key="refreshRouterViewKey" class="w100" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>

import { defineComponent, ref, toRefs, watch, nextTick, reactive } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  setup () {
    const state = reactive({
      refreshRouterViewKey: null
    });
    const route = useRoute();

    watch(() => route.fullPath, () => {
      state.refreshRouterViewKey = route.fullPath;
    }, { immediate: true });

    // nextTick(() => {
    //   state.refreshRouterViewKey = fullPath;
    // });
    return {
      ...toRefs(state)
    };
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/* 页面切换动画
------------------------------- */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s ease;
}
// slide-right
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
// slide-left
.slide-left-enter-from {
  @extend .slide-right-leave-to;
}
.slide-left-leave-to {
  @extend .slide-right-enter-from;
}
// opacitys
.opacitys-enter-active,
.opacitys-leave-active {
  will-change: transform;
  transition: all 0.3s ease;
}
.opacitys-enter-from,
.opacitys-leave-to {
  opacity: 0;
}

</style>
