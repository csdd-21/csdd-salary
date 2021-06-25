import { createStore } from 'vuex'

export default createStore({
  state: {
    year: '2020'
  },
  mutations: {
    CHANGE_YEAR(state, i) {
      state.year = i
      console.log("this.year", state.year);
    },
  },
  actions: {
  },
  modules: {
  }
})
