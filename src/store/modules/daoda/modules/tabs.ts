export default {
  namespaced: true,
  state: {
    AutoNumber: 'one',
    CheckBox: 'one',
    Date1: 'one',
    DateTime: 'one',
    Email: 'one',
    LangText: 'one',
    MoreOptionList: 'one',
    Number1: 'one',
    OptionList: 'one',
    Phone: 'one',
    Search: 'one',
    SearchMore: 'one',
    SingleLine: 'one',
    WebSite: 'one'
  },
  mutations: {
    changeTab (state:any, tabStap:any) {
      // state = { ...state, ...tabStap }
      state[tabStap] = 'two'
    },
    toOne (state:any) {
      for (let key in state) {
        state[key] = 'one'
      }
    }
  }
}
