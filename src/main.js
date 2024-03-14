import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'virtual:svg-icons-register'
import svgIcon from './components/SvgIcon/index.vue'
import 'normalize.css/normalize.css'
import '@/style/index.scss'
import '@/permission.js'
import permissionDirective from '@/directive/permission'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'

const app = createApp(App)

app.component('svg-icon', svgIcon)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.directive('permission', permissionDirective)

app.mount('#app')
