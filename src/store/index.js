import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: true }
    ]
  },
  mutations: {
    increment(state) {
      // 变更状态
      state.count++
    }
  },
  getters: {
    coment: start=>{
        return start.todos.filter(todu => todu.done)
    },
    // comentpake:(start , getters)=>{
    //     return  getters.coment.length
    // }
  }
})
export default store;