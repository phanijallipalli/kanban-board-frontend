import { createStore } from 'vuex'

export default createStore({
  state: {
    userData : []
  },
  getters: {
    getUserData : function(state){
      return `${state.userData}`
    }
  },
  mutations: {
    UPDATE_USER_DATA(state,payload){
      state.userData = payload
    }
  },
  actions: {
    updateUserData(context,payload){
      const userData = payload
      context.commit("UPDATE_USER_DATA",userData)
    }
  },
})
