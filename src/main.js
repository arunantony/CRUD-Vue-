import Vue from 'vue'
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import App from './App.vue'

import Create from './components/create.vue';
import Edit from './components/Edit.vue';
import Index from './components/Index.vue';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate, {fieldsBagName: 'formFields'})
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;
const routes = [
  {
    name: 'Create',
    path: '/create',
    component: Create
  },
  {
    name: 'Edit',
    path: '/edit',
    component: Edit
  },
  {
    name: 'Index',
    path: '/index',
    component: Index
  },
];

const router = new VueRouter({ mode: 'history', routes: routes });
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
