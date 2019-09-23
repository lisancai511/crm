export default {
  namespaced: true,
  state: {
    active: 123123123132123
  },
  mutations: {
    toggle (state:any) {
      state.active = !state.active
    },
    set (state:any, active:any) {
      state.active = active
    }
  }
}
