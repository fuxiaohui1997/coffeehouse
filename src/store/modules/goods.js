const state = {
  goodsMsg: {}
};

const mutations = {
  CHANGE_SETTING: (state, data) => {
    const goodsMsg = JSON.parse(JSON.stringify(data));
    state.goodsMsg = goodsMsg.goods;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
