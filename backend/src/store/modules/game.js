import Cookies from 'js-cookie'

const game = {
  state: {
    type: [],
  },
  mutations: {
    INSERT_TYPE: (state,type) => {
      state.type = type;
    },
  },
  actions: {
    insertType({ commit } ,type ) {
      commit('INSERT_TYPE',type)
    },
  }
}

export default game
