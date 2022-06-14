/* eslint-disable*/
import { defineComponent, ref, reactive, toRefs, openBlock, createElementBlock, toDisplayString } from 'vue';

var script = defineComponent({
    name: 'hello',
    props: {
        province: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        area: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const msg = ref('hello');
        const state = reactive({
            provinceVal: props.province,
            cityVal: props.city,
            areaVal: props.area,
            provinceList: [],
            cityList: [],
            areaList: [],
            totalData: []
        });
        return Object.assign(Object.assign({}, toRefs(state)), { msg });
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("div", null, toDisplayString(_ctx.msg), 1 /* TEXT */))
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

var css_248z$2 = "body{color:red;display:-ms-flexbox;display:flex}";
styleInject(css_248z$2);

script.render = render;
script.__file = "src/packages/hello/index.vue";

var css_248z$1 = "body{-ms-flex-pack:center;justify-content:center}";
styleInject(css_248z$1);

// @ts-ignore
function install$2(app) {
    app.component(script.name, script);
}

var Test = defineComponent({
    name: 'test',
    setup() {
        const msg = ref('test');
        // return () => h('div', [msg.value]);
        return () => (<div>{msg.value}</div>);
    }
});

var css_248z = "body{-ms-flex-align:center;align-items:center}";
styleInject(css_248z);

// @ts-ignore
function install$1(app) {
    app.component(Test.name, Test);
}

// const str = 'lwj';
// console.log(str);
function install(app) {
    app.use(install$2);
    app.use(install$1);
}

export { install$2 as Hello, install$1 as Test, install as default };
