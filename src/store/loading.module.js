export const state = {
  loading: false,
};
export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
};
export const actions = {
  showLoading({ commit }, loading) {
    commit("SET_LOADING", loading);
  },
};
export const getters = {};
