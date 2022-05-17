<template>
  <div class="demo-date-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <!-- <el-date-picker v-model="value1" type="date" placeholder="Pick a day" /> -->
      <demo
        class="my-demo"
        name="lwj"
        :before-close="handleClose"
        @confirm="handleConfirm"
      >
        <template v-slot:liSlot="{item}">
          <div @click="isShow = !isShow">{{item}}</div>
        </template>
      </demo>
    </div>
    <div class="block">
      <span class="demonstration">Picker with quick options</span>
      <template v-if="isShow">
        <el-date-picker
          v-model="value2"
          type="date"
          placeholder="Pick a day"
          :disabled-date="disabledDate"
          :shortcuts="shortcuts"
        />
      </template>
    </div>
    <div class="block">
      <span class="demonstration">Timestamp</span>
      <div class="demonstration">Value：{{ value3 }}</div>
      <el-date-picker
        v-model="value3"
        type="datetime"
        placeholder="Pick a Date"
        value-format="YYYY-MM-DD hh:mm:ss"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script>

import { defineComponent, ref, shallowRef, onMounted, nextTick, provide } from 'vue';
import demo from '@/components/demo.vue';
import { ElMessageBox } from 'element-plus';
export default defineComponent({
  name: 'About',
  components: {
    demo
  },
  setup () {
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref('');
    const isShow = ref(true);

    provide('isShow', isShow);

    const shortcuts = [
      {
        text: 'Today',
        value: new Date()
      },
      {
        text: 'Yesterday',
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24);
          return date;
        }
      },
      {
        text: 'A week ago',
        value: () => {
          const date = new Date();
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
          return date;
        }
      }
    ];

    const disabledDate = ref(null);
    onMounted(async () => {
      isShow.value = false;
      await nextTick();
      disabledDate.value = (time) => {
        return time.getTime() > Date.now();
      };
      isShow.value = true;
    });
    const handleChange = (val) => {
      console.log(val);
    };

    const handleConfirm = (val) => {
      console.log(val);
    };
    const handleClose = (done) => {
      ElMessageBox.confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch(() => {
          console.log(123);
        });
    };
    return {
      value1,
      value2,
      value3,
      shortcuts,
      disabledDate,
      isShow,
      handleChange,
      handleConfirm,
      handleClose
    };
  }
});

</script>
<style lang="scss" scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.my-demo{
  :deep(button){
    color: red;
  }
}

.my-demo{
  ::v-deep button{
    color: red;
  }
}
</style>
