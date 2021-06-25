import { createStore } from 'vuex'

export default createStore({
  state: {
    year: ''
  },
  mutations: {
    CHANGE_YEAR(state, i) {
      state.year = i
    },
  },
  actions: {
  },
  modules: {
  }
})
