import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import AntDesign from 'ant-design-vue';

import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(AntDesign)

app.mount('#app')
