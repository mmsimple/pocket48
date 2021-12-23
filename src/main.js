/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import Nim from "./utils/NIM_Web_SDK_v8.3.5";
import axios from "axios"

const app = createApp(App);
app.config.globalProperties.$axios = axios
app.config.globalProperties.Nim = Nim;
app.use(store).use(router).use(ElementPlus).mount("#app");
