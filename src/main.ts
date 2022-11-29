import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store, { key } from './store';
import ElementPlus from 'element-plus';
import axios from 'axios';
import 'element-plus/dist/index.css';
// import bbui from 'bb-ui-vue3';
import './test';
// import bbui from '@/outputFile/lib/index.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import lwjui from './my-lib-es.js';

// !<el-icon><plus :size="80" /></el-icon> //icon组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Lego from 'lwj-lego-components';

const app = createApp(App);
app.use(store, key).use(router);
app.use(ElementPlus).use(Lego as any);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.config.globalProperties.$http = axios;
app.mount('#app');

// type Foo = {111
//   a: number;
//   b?: string;
//   c: boolean;
// }
// type Beautify<T> = {
//   [P in keyof T]: T[P]
// }
// type SetOptional<T, K extends keyof T> =
//   Beautify<Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>>
// type ABOptional = SetOptional<Foo, 'a' | 'b'>; // !实现指定某个联合类型可选
// const obj: ABOptional = {
//   c: true,
// };
// console.log(obj);
// // type ABOptional = {
// //   a?: number; // 该属性已变成可选的
// //   b?: string; // 保持不变
// //   c: boolean;
// // }
// /*
//   !SetOptional的实现方式
//   !1.Partial<Pick<T, K>，把需要可选的对象类型搞出来
//   !2.Pick<T, Exclude<keyof T, K>> 把剩下的对象类型搞出来,其实就是Omit<T, K>
//   !3.通过&连结起来，这样就得到答案的
//   ?4.展示效果不漂亮，再通过Beautify美化显示效果
// */

// interface Example {
//   a: string;
//   e: number;
//   b: string | number;
//   c: () => void;
//   d: Record<string, unknown>; // !相当于是对象的意思
//   f: string | number | boolean;
// }
// type ConditionalPick<V, T> = {
//   [K in keyof V as V[K] extends T ? K : never]: V[K]; // !这里V[K] extends T,要是V[K]完全符合T，才返回K，否则never
// };
// type StringKeysOnly = ConditionalPick<Example, string | Record<string, unknown> | (() => void)>; // !(() => void)  函数的意思

// type Getters<T> = {
//   [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
// };
// interface Person {
//   name: string;
//   age: number;
//   location: string;
// }
// type LazyPerson = Getters<Person>;

// type RemoveKindField<T> = {
//   [K in keyof T as Exclude<K, 'kind'>]: T[K]
// };

// interface Circle {
//   kind: 'circle';
//   radius: number;
// }

// type KindlessCircle = RemoveKindField<Circle>;

// type MY<T, U> = T extends U ? T : U;
// type A = MY<string | number, string | Record<string, unknown> | (() => void)>

// type Color = 'red' | 'blue';
// type Quantity = 'one' | 'two';
// type SeussFish = `${Quantity | Color} fish`; // !模板字符串类型（Template Literal Types）。
// // !type SeussFish = "one fish" | "two fish" | "red fish" | "blue fish"

// function getValueByPath<T extends Record<string, any>, K extends keyof T>(object: T, prop: string): T[K] {
//   prop = prop || '';
//   const paths = prop.split('.');
//   let current = object;
//   let result = null;
//   for (let i = 0, j = paths.length; i < j; i++) {
//     const path = paths[i];
//     if (!current) break;

//     if (i === j - 1) {
//       result = current[path];
//       break;
//     }
//     current = current[path];
//   }
//   return result;
// }

// // 调用例子
// getValueByPath({ a: 1, b: 'b' }, 'a');

// let a: unknown;
// interface Model{
//   name: string;
//   [key: string]: any;
// }
// const valueIsModel = (val: any): val is Model => {
//   return typeof val === 'object' && 'name' in val;
// };
// if (valueIsModel(a)) {
//   console.log(a.name);
// }
