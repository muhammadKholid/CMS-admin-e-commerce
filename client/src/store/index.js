import Vue from 'vue';
import Vuex from 'vuex';
import { url } from '../functions/url.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: [],
    oneProduct: '',
    isLoggedIn: false,
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_ISLOGGEDIN(state, payload) {
      const token = localStorage.getItem('token');
      if (token) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    SET_ONEPRODUCT(state, payload) {
      console.log('masuk');
      state.oneProduct = payload;
    },
  },
  actions: {
    getProducts({ commit }) {
      fetch(`${url}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((datas) => {
          commit('SET_PRODUCTS', datas.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export default store;
