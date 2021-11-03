import { createApp } from 'vue'
import App from './App.vue'
import '../static/iconfont.css'
import 'styles/index.scss'
import router from './router/index'
import {api} from './api/index'
import dayjs from 'dayjs'
import VMdPreview from './plugins/VMdPreview'
import AntDesign from './plugins/AntDesign'
// import NaiveUI from './plugins/NaiveUI'

const app = createApp(App)
app.use(router)
app.use(VMdPreview);
// app.use(NaiveUI);
AntDesign(app);
app.config.globalProperties.$api = api;
app.config.globalProperties.$dayjs = dayjs;

app.mount('#app');