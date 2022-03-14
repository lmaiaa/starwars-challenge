import { getAllPeoplesApi } from "@/services/people.service";

export const state = {
  peopleList: [],
  page: 1,
  numberOfPeoples: 0,
  maxPage: 1,
  itemsPerPage: 10,
};
export const mutations = {
  SET_PEOPLE_LIST(state, peopleList) {
    state.peopleList.push(...peopleList);
  },
  ADD_PEOPLE_ON_LIST(state, people) {
    state.peopleList.push(people);
  },
  SET_PAGE(state, page) {
    state.page = page;
  },
  SET_NUMBER_OF_PEOPLES(state, numberOfPeoples) {
    state.numberOfPeoples = numberOfPeoples;
  },
  SET_MAX_PAGE(state, maxPage) {
    state.maxPage = maxPage;
  },
};
export const actions = {
  async fetchPeopleList({ commit, dispatch }, page = 1) {
    try {
      dispatch("loading/showLoading", true, { root: true });
      const response = await getAllPeoplesApi(page);
      dispatch("loading/showLoading", false, { root: true });
      commit("SET_PEOPLE_LIST", response.results);
      state.maxPage < page ? commit("SET_MAX_PAGE", page) : null;
      commit("SET_PAGE", page);
      commit("SET_NUMBER_OF_PEOPLES", response.count);
    } catch (err) {
      console.log(err);
      dispatch("loading/showLoading", false);
    }
  },
};
export const getters = {
  paginetedPeopleList: (state) => {
    const page = state.page;
    return state.peopleList.slice(
      (page - 1) * state.itemsPerPage,
      page * state.itemsPerPage
    );
  },
  loadMore: (state) => {
    return state.numberOfPeoples > state.peopleList.length;
  },
  moreInfo: (state) => {
    return state.numberOfPeoples !== state.peopleList.length;
  },
  totalPages: (state) => {
    return Math.ceil(state.peopleList.length / state.itemsPerPage);
  },
};
