import { createStore } from 'vuex'

export default createStore({
  state: {
    lists:{},
    year:'2021'
  },
  mutations: {
    CHANGE_YEAR(state,i){
      state.year = i
      console.log('state.year',state.year);
      
    }
  },
  actions: {
  },
  modules: {
  }
})
