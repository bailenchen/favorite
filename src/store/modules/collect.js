export default {
  namespaced: true, // 开启命名空间模式
  state: {
    // 收藏的网址
    collects: null,
    // 添加模态框状态
    isShow_addUrl: false,
    // 修改模态框状态
    isShow_editUrl: false,
    // 当前编辑的收藏项
    currectItem: null,
    // 修改模态框状态
    isShow_editFloder: false,
    // 当前编辑的收藏夹
    curFloderItem: null,
    // 分类的原始数据
    floderTree: null,
    // 没有收藏数据
    have: false
  },

  mutations: {
    getCollects(state, collect) {
      state.collects = collect.result
    },
    set_addUrl(state) {
      state.isShow_addUrl = !state.isShow_addUrl
    },
    set_editUrl(state) {
      state.isShow_editUrl = !state.isShow_editUrl
    },
    set_editFloder(state) {
      state.isShow_editFloder = !state.isShow_editFloder
    },
    set_currectItem(state, item) {
      state.currectItem = item
    },
    curFloderItem(state, obj) {
      state.curFloderItem = obj.item
      state.floderTree = obj.floderTree
    },
    isHave(state, val) {
      state.have = val
    }
  },

  actions: {
    // 获取收藏的URL
    getCollects({ commit }, collect) {
      commit('getCollects', collect)
    },
    set_addUrl({ commit }) {
      commit('set_addUrl')
    },
    set_editUrl({ commit }) {
      commit('set_editUrl')
    },
    set_editFloder({ commit }) {
      commit('set_editFloder')
    },
    set_currectItem({ commit }, item) {
      commit('set_currectItem', item)
    },
    curFloderItem({ commit }, obj) {
      commit('curFloderItem', obj)
    },
    isHave({ commit }, val) {
      commit('isHave', val)
    }
  }
}
