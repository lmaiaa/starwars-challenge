import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as people from "./people.module";
import * as loading from "./loading.module";
import * as theme from "./theme.module";

export default new Vuex.Store({
  modules: {
    people: {
      namespaced: true,
      ...people,
    },
    loading: {
      namespaced: true,
      ...loading,
    },
    theme: {
      namespaced: true,
      ...theme,
    },
  },
});
