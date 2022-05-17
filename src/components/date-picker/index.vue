<template>
  <div class="index-cont" :class="styleType === 'whole' ? 'whole' : 'cut'">
    <!-- {whole: styleType === 'whole'} -->
    <template v-if="isShowStartDate">
      <el-date-picker
        v-model="startDateTime"
        v-bind="startAttrs"
        :disabled-date="disabledStartDate"
        @change="changeStartDateTime"
        @blur="startTimeBlur"
        @focus="startTimeFocus"
      />
    </template>

    <slot name="range-separator">
      <div class="range-separator align-center">
        <button
          class="cont padding-left-5 padding-right-5"
          v-if="styleType === 'whole'"
          @click.prevent
        >
          {{ rangeSeparator }}
        </button>
        <p class="cont" v-else>{{ rangeSeparator }}</p>
      </div>
    </slot>
    <template v-if="isShowEndDate">
      <el-date-picker
        v-model="endDateTime"
        v-bind="endAttrs"
        :disabled-date="disabledEndDate"
        @change="changeEndDateTime"
        @blur="endTimeBlur"
        @focus="endTimeFocus"
      />
    </template>
  </div>
</template>

<script lang="ts">
/*
 * 说明：日期时间范围选择组件；
 * 功能：请移步 element-ui DateTimePicker 组件接口说明（用法一致）
 * 本组件说明地址：https://zhijing19.feishu.cn/docs/doccnTFn8rsbyp104vdT9COFR7e
 * */
import { defineComponent, watch, reactive, toRefs, nextTick, toRef } from 'vue';
import { deepEqual } from './index';
import dayjs from 'dayjs';

interface StateParams{
  startDateTime: any;
  endDateTime: any;
  startAttrs: Record<string, any>;
  endAttrs: Record<string, any>;
  rangeSeparator: string;
  disabledStartDate: null | ((time: Date) => boolean);
  disabledEndDate: null | ((time: Date) => boolean);
  isShowStartDate: boolean;
  isShowEndDate: boolean;
}
interface ShortcutsItem {
  text: string;
  value?: () => [Date, Date]
  onClick?: (params: any) => void
}
interface Attrs {
  type: string;
  'value-format'?: string;
  'range-separator'?: string;
  'start-placeholder'?: string;
  'end-placeholder'?: string;
  shortcuts?: ShortcutsItem[];

  [key: string]: any;
}

export default defineComponent({
  name: 'DateTimePicker',
  mixins: [],
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Array,
      default: () => ['', '']
    },
    // 样式类型: whole: 整体显示；cut：分开显示
    styleType: {
      type: String,
      default: 'whole'
    }
    // 开始、结束时间的 change 事件是否关联
    // relationChange: {
    //   type: Boolean,
    //   default: true
    // }
  },
  emits: ['update:modelValue', 'change', 'focus', 'blur', 'startChange', 'endChange'],
  setup (props, context) {
    // console.log(props, context)
    const state = reactive<StateParams>({
      startDateTime: null,
      endDateTime: null,
      startAttrs: {},
      endAttrs: {},
      rangeSeparator: '-',
      disabledStartDate: null,
      disabledEndDate: null,
      isShowStartDate: true,
      isShowEndDate: true
    });

    const createAttrs = (type: 'start' | 'end') => {
      // console.log(context.attrs)
      const attrs = { ...context.attrs } as Attrs;
      // 过滤不必要的 attrs
      const attrsKeys = Object.keys(attrs);
      // console.log(attrsKeys)
      if (attrsKeys.includes('range-separator')) {
        state.rangeSeparator = attrs['range-separator']!;
        delete attrs['range-separator'];
      }
      if (attrsKeys.includes('type') && ['datetimerange', 'daterange', 'monthrange'].includes(attrs.type)) {
        attrs.type = attrs.type.replace(/range/, '');
      }
      // 开始类型
      if (type === 'start') {
        if (attrs.shortcuts) {
          attrs.shortcuts = attrs.shortcuts.map((item) => {
            return {
              text: item.text,
              onClick (picker) {
                const [start, end] = item.value!();
                picker.emit('pick', dayjs(start));
                state.endDateTime = attrs?.['value-format'] ? dayjs(end).format(attrs?.['value-format']) : end;
                changeStartDateTime(dayjs(start).format('YYYY-MM-DD'));
                changeEndDateTime(dayjs(end).format('YYYY-MM-DD'));
              }
            };
          });
        }
        if (attrs['start-placeholder']) {
          attrs.placeholder = attrs['start-placeholder'];
        }
      }
      // 结束类型
      if (type === 'end') {
        if (attrs.shortcuts) {
          attrs.shortcuts = attrs.shortcuts.map((item) => {
            return {
              text: item.text,
              onClick (picker) {
                const [start, end] = item.value!();
                picker.emit('pick', dayjs(end));
                state.startDateTime = attrs?.['value-format'] ? dayjs(start).format(attrs?.['value-format']) : start;
                changeStartDateTime(dayjs(start).format('YYYY-MM-DD'));
                changeEndDateTime(dayjs(end).format('YYYY-MM-DD'));
              }
            };
          });
        }
        if (attrs['end-placeholder']) {
          attrs.placeholder = attrs['end-placeholder'];
        }
      }
      delete attrs['start-placeholder'];
      delete attrs['end-placeholder'];
      console.log(attrs);
      // console.log(state.startDateTime)
      // console.log(state.endDateTime)
      return attrs;
    };

    // 开始时间改变回调方法
    const changeStartDateTime = async (val: any) => {
      console.log('changeStartDateTime', val);
      if (!val) {
        state.endDateTime = null;

        resetDisabledDate();
      } else {
        state.isShowEndDate = false;
        await nextTick();
        state.disabledEndDate = (time) => {
          return (time.getTime() + 24 * 60 * 60 * 1000) <= new Date(val).getTime();
        };
        state.isShowEndDate = true;
      }
      context.emit('startChange', val);

      handleInput();
      handleChange();
    };

    // 结束时间改变回调方法
    const changeEndDateTime = async (val: any) => {
      console.log('changeEndDateTime', val);
      if (!val) {
        state.startDateTime = null;

        resetDisabledDate();
      } else {
        state.isShowStartDate = false;
        await nextTick();
        state.disabledStartDate = (time: Date) => {
          return time.getTime() > new Date(val).getTime();
        };
        state.isShowStartDate = true;
      }
      context.emit('endChange', val);

      handleInput();
      handleChange();
    };

    const resetDisabledDate = async () => {
      state.isShowStartDate = false;
      state.isShowEndDate = false;
      await nextTick();
      state.disabledStartDate = null;
      state.isShowStartDate = true;
      state.disabledEndDate = null;
      state.isShowEndDate = true;
    };

    // 组件 input 回调方法
    const handleInput = () => {
      if (!state.startDateTime && !state.endDateTime) {
        context.emit('update:modelValue', null);
        return;
      }
      // 开始、结束时间，其中一个没值时不触发回调
      if (!state.startDateTime || !state.endDateTime) {
        return;
      }
      if (context.attrs?.['value-format']) {
        state.startDateTime = dayjs(state.startDateTime).format(context.attrs?.['value-format'] as string);
        state.endDateTime = dayjs(state.endDateTime).format(context.attrs?.['value-format'] as string);
      }
      handleReturnDateTime();
      context.emit('update:modelValue', [state.startDateTime, state.endDateTime]);
    };

    // 组件 change 回调方法
    const handleChange = () => {
      if (!state.startDateTime && !state.endDateTime) {
        context.emit('change', null);
        return;
      }
      // 开始、结束时间，其中一个没值时不触发回调（relationChange 为 true 时成立）
      if ((!state.startDateTime || !state.endDateTime)) {
        return;
      }
      if (context.attrs?.['value-format']) {
        state.startDateTime = dayjs(state.startDateTime).format(context.attrs?.['value-format'] as string);
        state.endDateTime = dayjs(state.endDateTime).format(context.attrs?.['value-format'] as string);
      }
      handleReturnDateTime();
      context.emit('change', [state.startDateTime, state.endDateTime]);
    };

    // 特别处理类型为 date 的返回时间方法
    const handleReturnDateTime = () => {
      if (state.startAttrs?.type !== 'date') {
        return;
      }
      if (!Object.keys(context.attrs).includes('value-format')) {
        return;
      }
      if (!Object.keys(context.attrs).includes('default-time')) {
        return;
      }
      const valueFormat =
        (context.attrs?.['value-format'] || context.attrs?.valueFormat || '') as string;
      if (valueFormat.indexOf('HH' || 'HH:mm' || 'HH:mm:ss') === -1) {
        return;
      }
      const defaultTime =
        (context.attrs?.['default-time'] || context.attrs?.defaultTime || []) as Array<any>;
      if (!defaultTime.length) {
        return;
      }
      // 根据 valueFormat 格式来处理数据
      const handleValueFormat = () => {
        if (valueFormat.split('HH:mm:ss').length - 1) {
          return 8;
        }
        if (valueFormat.split('HH:mm').length - 1) {
          return 5;
        }
        if (valueFormat.split('HH').length - 1) {
          return 2;
        }
        return 0;
      };
      let [startDateTime, endDateTime] = ['', ''];
      if (state.startDateTime) {
        startDateTime = state.startDateTime.slice(
          0,
          state.startDateTime.length - handleValueFormat()
        );
      } else {
        state.startDateTime = null;
      }
      if (state.endDateTime) {
        endDateTime = state.endDateTime.slice(
          0,
          state.endDateTime.length - handleValueFormat()
        );
      } else {
        state.endDateTime = null;
      }
      state.startDateTime = startDateTime
        ? `${startDateTime}${defaultTime[0]}`
        : null;
      state.endDateTime = endDateTime ? `${endDateTime}${defaultTime[1]}` : null;
    };

    // 开始时间失去焦点回调方法
    const startTimeBlur = (ev: any) => {
      context.emit('blur', { type: 'start', ev });
      if (!state.startDateTime) {
        state.endDateTime = null;
        handleInput();
      }
    };

    // 结束时间失去焦点回调方法
    const endTimeBlur = (ev: any) => {
      context.emit('blur', { type: 'end', ev });
      if (!state.endDateTime) {
        state.startDateTime = null;
        handleInput();
      }
    };

    // 开始时间获得焦点回调方法
    const startTimeFocus = (ev: any) => {
      context.emit('focus', { type: 'start', ev });
    };

    // 结束时间获得焦点回调方法
    const endTimeFocus = (ev: any) => {
      context.emit('focus', { type: 'end', ev });
    };

    watch(() => context.attrs, (newVal, oldVal) => {
      console.log(newVal, oldVal);
      if (!deepEqual(newVal, oldVal)) {
        state.startAttrs = {
          // 'default-time': ["00:00:00", "23:59:59"],
          placeholder: '开始时间',
          type: 'datetime',
          // 'value-format': "yyyy-MM-dd HH:mm:ss"
          'value-format': 'YYYY-MM-DD hh:mm:ss'
        };
        state.endAttrs = createAttrs('end');
      }
    }, { immediate: true });

    return {
      ...toRefs(state),
      startTimeBlur,
      endTimeBlur,
      startTimeFocus,
      endTimeFocus,
      changeStartDateTime,
      changeEndDateTime
    };
  },
  components: {}
});
</script>

<style scoped lang="scss">
.index-cont {
  display: inline-flex;
  &.cut {
    :deep(.range-separator .cont) {
      width: 40px;
      text-align: center;
      margin: 4px 0;
    }
    :deep(.el-icon-date){
      height: 32px;
    }
  }
  &.whole {
    :deep(.range-separator .cont) {
      height: 100%;
      border: 0;
      border-top: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      background-color: transparent;
      font-size: inherit;
    }
    :deep(.el-input__inner) {
      text-align: center;
    }
    :deep(.el-date-editor:nth-of-type(1)) {
        .el-input__inner {
          padding-right: 0;
          border-right: none;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        .el-input__suffix {
          display: none;
        }
      }
    :deep(.el-date-editor:nth-last-of-type(1)) {
        .el-input__inner {
          padding-left: 0;
          border-left: none;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        .el-input__prefix {
          display: none;
        }
      }
  }
}
</style>
