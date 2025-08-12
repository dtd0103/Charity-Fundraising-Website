import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { QueryClient } from '@tanstack/vue-query';
import 'font-awesome/css/font-awesome.css';

const queryClient = new QueryClient();

const app = createApp(App);

app.use(VueQueryPlugin, { queryClient });
app.use(router);
app.mount('#app');
