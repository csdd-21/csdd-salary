import { createStore } from 'vuex'

export default createStore({
  state: {
    lists:{},
    year:'2020'
  },
  mutations: {
    CHANGE_YEAR(state,i){
      state.year = i
      },
    SET_LISTS(state,payload){
      state.lists[payload.year] = payload['lists']
      console.log('state.year',state.lists);
    }
  },
  actions: {
  },
  modules: {
  }
})
