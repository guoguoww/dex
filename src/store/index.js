import Vue from 'vue';
import Vuex from 'vuex';
import axios from "../axios";
import {
  Toast
} from "vant";

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    currency: [],
  },
  mutations: {
    getsms(state, payload) { //获取短信
      axios.post('api/sms/validate_code', {
        type: payload.type,
        mobile: payload.mobile
      }).then(res => {
        if (res.data.errorCode == 0) {
          Toast('已发送')
        }
        if (payload.callback) {
          payload.callback(res.data)
        }
      })

    },

    getCur(state,params) {
      state.currency = params;
    },

  },
  actions: {
    setMutation (context) {
      axios.post('/api/trade/currency_list').then(res => {

        context.commit('getCur', {params: res.data.data})

      })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {

  },
  getters: {
    currency(state) {
      return state.currency;
    }
  },
});
