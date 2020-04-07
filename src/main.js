import Vue from "vue";
import Cookies from "js-cookie";

import Element from "element-ui";

import App from "./App";
import store from "./store";

import "./icons"; // icon
import "./permission"; // permission control
import "./utils/error-log"; // error log

import * as filters from "./filters"; // global filters

Vue.use(Element, {
  size: Cookies.get("size") || "medium", // set element-ui default size
});

import router from "./router";

import "@/styles/index.scss"; // global css
import "normalize.css/normalize.css"; // a modern alternative to CSS resets
import "@/styles/element-variables.scss";

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
