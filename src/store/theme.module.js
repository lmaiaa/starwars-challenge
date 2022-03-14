const hasAThemeDefinition = window.localStorage.key("theme");

export const state = {
  theme: hasAThemeDefinition ? window.localStorage.getItem("theme") : "dark",
};
export const getters = {};
export const mutations = {
  SET_THEME(state, theme) {
    state.theme = theme;
    window.localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  },
};
export const actions = {
  changeTheme({ commit }, theme) {
    commit("SET_THEME", theme);
  },
};
