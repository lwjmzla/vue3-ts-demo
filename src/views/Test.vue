<template>
  <div class="test">
    111
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
  },
  created () {
    const arr = [
      {
        type: 'region',
        name: '华南小站'
      }
    ];
  }
});
</script>
