import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Swal from 'sweetalert2';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import store from './store/index';

Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
