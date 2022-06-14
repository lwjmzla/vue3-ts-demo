import { defineComponent, computed, resolveComponent, openBlock, createBlock, mergeProps, withCtx, renderSlot, ref, onMounted, Teleport, createVNode, createElementVNode, createElementBlock, createCommentVNode, pushScopeId, popScopeId } from 'vue';

var script$1 = defineComponent({
    name: 'bb-button',
    inheritAttrs: false,
    props: {
        width: {
            type: Number,
            default: null
        }
    },
    setup(props) {
        const btnStyle = computed(() => {
            const ret = {};
            if (props.width) {
                ret['width'] = setToPx(props.width);
            }
            return ret;
        });
        const setToPx = (value) => {
            return value + 'px';
        };
        return {
            btnStyle,
            setToPx
        };
    }
});

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = resolveComponent("el-button");

  return (openBlock(), createBlock(_component_el_button, mergeProps({ class: "bbui-button" }, _ctx.$attrs, { style: _ctx.btnStyle }), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3 /* FORWARDED */
  }, 16 /* FULL_PROPS */, ["style"]))
}

script$1.render = render$1;
script$1.__file = "packages/bb-button/src/index.vue";

// @ts-ignore
const install$2 = (app) => {
    app.component(script$1.name, script$1);
};

const propsType = {
    size: {
        type: Number,
        default: 600,
    },
    // 缓存移动宽度
    cache: {
        type: String,
        default: "UNIVERSAL",
    },
    minSize: {
        type: Number,
        default: 400,
    },
    loading: {
        type: Boolean,
        default: false,
    },
};
var script = defineComponent({
    name: 'bb-drawer-move',
    props: propsType,
    setup(props, context) {
        const visible = ref(false);
        const drawerWidth = ref(props.size);
        // 更改默认值
        const initAttrs = () => {
            const attrs = Object.assign({ 
                // 默认不显示 头部和关闭icon（不显示头部不显示titile）
                "show-close": false, "with-header": false }, context.attrs);
            return attrs;
        };
        // 获取当前宽度
        const getCurrentWidth = () => {
            return drawerWidth.value;
        };
        // 计算移动
        const barMove = () => {
            const windowWidth = window.innerWidth;
            const bodyId = document.querySelector('body');
            bodyId.onmousemove = (v) => {
                v.preventDefault();
                const moveX = v.clientX;
                if (windowWidth - moveX < props.minSize ||
                    windowWidth - moveX > windowWidth - 200) {
                    return;
                }
                drawerWidth.value = windowWidth - moveX;
            };
            bodyId.onmouseup = () => {
                bodyId.onmousemove = null;
            };
            bodyId.onmouseleave = () => {
                bodyId.onmousemove = null;
            };
        };
        const storageWidth = ref();
        // 获取宽度缓存
        const getCache = () => {
            if (!props.cache)
                return;
            const windowWidth = window.innerWidth;
            const drawerCache = window.localStorage.getItem("DRAWER_CACHE");
            const getDrawerCache = drawerCache
                ? JSON.parse(drawerCache)[props.cache]
                : {};
            if (getDrawerCache === null || getDrawerCache === void 0 ? void 0 : getDrawerCache.size) {
                const width = getDrawerCache.size > windowWidth - 200
                    ? windowWidth - 200
                    : getDrawerCache.size;
                drawerWidth.value = width;
                storageWidth.value = width;
            }
        };
        // 设置缓存
        const setCache = () => {
            if (drawerWidth.value === storageWidth.value)
                return;
            const drawerCache = window.localStorage.getItem("DRAWER_CACHE");
            const getDrawerCache = drawerCache ? JSON.parse(drawerCache) : {};
            const newCache = Object.assign(Object.assign({}, getDrawerCache), { [props.cache]: {
                    size: drawerWidth.value,
                } });
            window.localStorage.setItem("DRAWER_CACHE", JSON.stringify(newCache));
        };
        const open = () => {
            getCache();
            visible.value = true;
        };
        const close = () => {
            setCache();
            visible.value = false;
        };
        onMounted(() => {
            // 关闭浏览器
            window.addEventListener("beforeunload", () => {
                setCache();
            });
        });
        return {
            // arg
            visible,
            drawerWidth,
            // fn
            initAttrs,
            getCurrentWidth,
            open,
            close,
            barMove,
            getCache,
            setCache,
        };
    },
});

const _withScopeId = n => (pushScopeId("data-v-435a0cfc"),n=n(),popScopeId(),n);
const _hoisted_1 = /*#__PURE__*/ _withScopeId(() => /*#__PURE__*/createElementVNode("div", null, " . . . ", -1 /* HOISTED */));
const _hoisted_2 = [
  _hoisted_1
];
const _hoisted_3 = ["element-loading-text"];
const _hoisted_4 = {
  key: 0,
  class: "drawer-header"
};
const _hoisted_5 = {
  key: 1,
  class: "drawer-body"
};
const _hoisted_6 = {
  key: 2,
  class: "drawer-footer"
};
const _hoisted_7 = { ref: "focus" };

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = resolveComponent("el-button");
  const _component_el_drawer = resolveComponent("el-drawer");

  return (openBlock(), createBlock(Teleport, { to: "body" }, [
    createVNode(_component_el_drawer, mergeProps({
      modelValue: _ctx.visible,
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => ((_ctx.visible) = $event))
    }, _ctx.initAttrs(), { size: _ctx.drawerWidth }), {
      default: withCtx(() => [
        createElementVNode("div", {
          class: "draw-bar",
          onMousedown: _cache[0] || (_cache[0] = (...args) => (_ctx.barMove && _ctx.barMove(...args)))
        }, _hoisted_2, 32 /* HYDRATE_EVENTS */),
        createVNode(_component_el_button, { class: "fix-drawer-focus" }),
        createElementVNode("div", {
          "element-loading-text": _ctx.loading,
          "element-loading-spinner": "Loading",
          "element-loading-background": "rgba(0, 0, 0, 0.6)",
          class: "drawer-wrapper"
        }, [
          (_ctx.$slots.header)
            ? (openBlock(), createElementBlock("div", _hoisted_4, [
                renderSlot(_ctx.$slots, "header")
              ]))
            : createCommentVNode("v-if", true),
          (_ctx.$slots.default)
            ? (openBlock(), createElementBlock("div", _hoisted_5, [
                renderSlot(_ctx.$slots, "default")
              ]))
            : createCommentVNode("v-if", true),
          (_ctx.$slots.footer)
            ? (openBlock(), createElementBlock("div", _hoisted_6, [
                renderSlot(_ctx.$slots, "footer")
              ]))
            : createCommentVNode("v-if", true)
        ], 8 /* PROPS */, _hoisted_3),
        createElementVNode("span", _hoisted_7, null, 512 /* NEED_PATCH */)
      ]),
      _: 3 /* FORWARDED */
    }, 16 /* FULL_PROPS */, ["modelValue", "size"])
  ]))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = ".fix-drawer-focus[data-v-435a0cfc]{border:none;height:0;margin:0;opacity:0;padding:0;position:absolute;width:0}.draw-bar[data-v-435a0cfc]{-ms-flex-align:center;align-items:center;cursor:col-resize;display:-ms-flexbox;display:flex;height:100vh;left:0;position:absolute;top:0;-webkit-transition-duration:.5s;-webkit-transition-property:background-color;-webkit-transition-timing-function:ease;width:5px;z-index:1500}.draw-bar div[data-v-435a0cfc]{color:#fff;line-height:10px}.draw-bar[data-v-435a0cfc]:hover{background:#1890ff}.draw-bar[data-v-435a0cfc]{background:#d4d4d4}.drawer-wrapper[data-v-435a0cfc]{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:100%}.drawer-wrapper .drawer-header[data-v-435a0cfc]{-ms-flex-align:center;align-items:center;border-bottom:1px solid #dcdfe6;box-sizing:border-box;display:-ms-flexbox;display:flex;font-size:18px;font-weight:500;-ms-flex-pack:justify;justify-content:space-between;min-height:65px;padding:15px 20px;width:100%}.drawer-wrapper .drawer-body[data-v-435a0cfc]{-ms-flex:1;flex:1;overflow-x:hidden;overflow-y:auto;padding:10px;width:100%}.drawer-wrapper .drawer-footer[data-v-435a0cfc]{-ms-flex-align:center;align-items:center;border-top:1px solid #dcdfe6;display:-ms-flexbox;display:flex;height:auto;-ms-flex-pack:center;justify-content:center;padding:15px 20px;width:100%}";
styleInject(css_248z$1);

script.render = render;
script.__scopeId = "data-v-435a0cfc";
script.__file = "packages/bb-drawer-move/src/index.vue";

// @ts-ignore
const install$1 = (app) => {
    app.component(script.name, script);
};

var css_248z = ".bbui-textEllipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none!important}input[type=number]{-moz-appearance:textfield}::-webkit-scrollbar{height:8px;width:6px}::-webkit-scrollbar-thumb{background:#d8d8d8;border-radius:5px;box-shadow:inset 0 0 5px rgba(0,0,0,.2)}::-webkit-scrollbar-track{background:hsla(0,0%,98%,.9);border-radius:6px;box-shadow:inset 0 0 5px rgba(0,0,0,.2)}.ml-1{margin-left:1px}.mr-1{margin-right:1px}.mt-1{margin-top:1px}.mb-1{margin-bottom:1px}.pl-1{padding-left:1px}.pr-1{padding-right:1px}.pt-1{padding-top:1px}.pb-1{padding-bottom:1px}.ml-2{margin-left:2px}.mr-2{margin-right:2px}.mt-2{margin-top:2px}.mb-2{margin-bottom:2px}.pl-2{padding-left:2px}.pr-2{padding-right:2px}.pt-2{padding-top:2px}.pb-2{padding-bottom:2px}.ml-5{margin-left:5px}.mr-5{margin-right:5px}.mt-5{margin-top:5px}.mb-5{margin-bottom:5px}.pl-5{padding-left:5px}.pr-5{padding-right:5px}.pt-5{padding-top:5px}.pb-5{padding-bottom:5px}.ml-8{margin-left:8px}.mr-8{margin-right:8px}.mt-8{margin-top:8px}.mb-8{margin-bottom:8px}.pl-8{padding-left:8px}.pr-8{padding-right:8px}.pt-8{padding-top:8px}.pb-8{padding-bottom:8px}.ml-10{margin-left:10px}.mr-10{margin-right:10px}.mt-10{margin-top:10px}.mb-10{margin-bottom:10px}.pl-10{padding-left:10px}.pr-10{padding-right:10px}.pt-10{padding-top:10px}.pb-10{padding-bottom:10px}.ml-15{margin-left:15px}.mr-15{margin-right:15px}.mt-15{margin-top:15px}.mb-15{margin-bottom:15px}.pl-15{padding-left:15px}.pr-15{padding-right:15px}.pt-15{padding-top:15px}.pb-15{padding-bottom:15px}.ml-20{margin-left:20px}.mr-20{margin-right:20px}.mt-20{margin-top:20px}.mb-20{margin-bottom:20px}.pl-20{padding-left:20px}.pr-20{padding-right:20px}.pt-20{padding-top:20px}.pb-20{padding-bottom:20px}*{box-sizing:border-box;margin:0;padding:0}#app,body,html{height:100%;width:100%}#app{padding:.1px}.rel{position:relative}.flex{display:-ms-flexbox;display:flex}.flex-1{-ms-flex:1;flex:1}.flex-auto{-ms-flex:auto;flex:auto}.flex-inline{display:-ms-inline-flexbox;display:inline-flex}.flex-center-between{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between}.flex-center-center{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.bps-form-for-line-format-style{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:start;justify-content:flex-start}.bps-form-for-line-format-style .el-form-item__content{display:-ms-flexbox;display:flex}.bps-form-for-line-format-style .form-inline-width-33{display:-ms-inline-flexbox;display:inline-flex;margin-right:1%;max-width:440px;width:32.33%}@media only screen and (max-width:1200px){.bps-form-for-line-format-style .form-inline-width-33{width:49%}}@media only screen and (max-width:830px){.bps-form-for-line-format-style .form-inline-width-33{width:45%}}@media only screen and (max-width:820px){.bps-form-for-line-format-style .form-inline-width-33{width:100%}}.order-radio-group-hidden-border .el-radio-button__inner{border-color:transparent!important;border:0;border-radius:4px}.cover-space-20{height:20px}.demo-block table{margin:auto}.demo-block td,.demo-block th{border:none;border-bottom:var(--el-table-border);border-right:var(--el-table-border)}.demo-block div[class*=language-].line-numbers-mode{padding-left:0}.el-date-picker tr{border-top:none}.el-date-picker td,.el-date-picker th{border:none}.el-date-picker td{width:42px}.el-date-picker tr:nth-child(2n){background-color:transparent}body a{color:#409eff;font-weight:500;text-decoration:none}.bbui-dialog .el-dialog__header{background:#f5f7fa;border-top-left-radius:4px;border-top-right-radius:4px;line-height:normal;padding-top:14px}.bbui-dialog .el-dialog__header .el-dialog__title{font-size:16px;font-weight:400}.bbui-dialog .el-dialog__body{padding:30px 40px}.bbui-dialog .el-dialog__footer{border-bottom-left-radius:4px;border-bottom-right-radius:4px;border-top:1px solid #eee;padding-bottom:6px;padding-top:6px;text-align:center}.bbui-dialog .el-dialog__footer .el-button+.el-button{margin-left:16px}.bbui-dialog .el-textarea__inner{border-radius:4px}.bbui-empty{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;padding:24px}.bbui-empty.center{bottom:0;left:0;position:absolute;right:0;top:0;z-index:1}.bbui-empty .bbui-empty-box{display:block;text-align:center}.bbui-empty .bbui-empty-img{display:block;margin:0 auto;width:90px}.bbui-empty .bbui-empty-text{color:rgba(0,0,0,.25);font-size:14px;margin-top:16px;text-align:center}";
styleInject(css_248z);

const components = {
    BBButton: install$2,
    BBDrawerMove: install$1,
};
const install = function (Vue) {
    if (install.installed)
        return;
    install.installed = true;
    Object.keys(components).forEach((key) => Vue.use(components[key]));
};
// Auto-install when vue is found (eg. in browser via <script> tag)
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

export { install$2 as BBButton, install$1 as BBDrawerMove, install as default };
