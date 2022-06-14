import BBButton from "./bb-button";
import BBDrawerMove from "./bb-drawer-move";
import './theme-chalk/src/index.css';
var components = {
    BBButton: BBButton,
    BBDrawerMove: BBDrawerMove,
};
var install = function (Vue) {
    if (install.installed)
        return;
    install.installed = true;
    Object.keys(components).forEach(function (key) { return Vue.use(components[key]); });
};
// Auto-install when vue is found (eg. in browser via <script> tag)
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}
export { BBButton, BBDrawerMove, };
export default install;
