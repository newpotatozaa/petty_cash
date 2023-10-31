import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tooltip } from "bootstrap";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";
// import VueRouter from 'vue-router'
// import { createRouter, createWebHistory } from 'vue-router';

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import { initKtIcon } from "@/core/plugins/keenthemes";
// import { vMaska } from "maska"
import "@/core/plugins/prismjs";

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [
//     // Define your routes here
//   ],
// });

const app = createApp(App);
// app.use(VueRouter)
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initKtIcon(app);
initVeeValidate();

app.use(i18n);
// app.use(vMaska);
app.directive("tooltip", (el) => {
  new Tooltip(el);
});

app.mount("#app");
