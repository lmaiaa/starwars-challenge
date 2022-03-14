import { getAllPeoplesApi } from "@/services/people.service";

export const state = {
  peopleList: [],
  page: 1,
  numberOfPeoples: 0,
  maxPage: 1,
  itemsPerPage: 10,
  filteredName: "",
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
  SET_FILTERED_NAME(state, filteredName) {
    state.filteredName = filteredName;
  },
};
export const actions = {
  async fetchPeopleListByPage({ commit, dispatch }, page = 1) {
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
  async fetchPeopleListByName({ commit, dispatch }, name) {
    try {
      dispatch("loading/showLoading", true, { root: true });
      console.log(name);
      const response = await getAllPeoplesApi(1, name);
      dispatch("loading/showLoading", false, { root: true });
      response.results.length
        ? response.results.forEach((result) =>
            state.peopleList.some((people) => people.name === result.name)
              ? null
              : commit("ADD_PEOPLE_ON_LIST", result)
          )
        : null;
    } catch (err) {
      console.log(err);
      dispatch("loading/showLoading", false);
    }
  },
};
export const getters = {
  paginatedAndFilteredPeopleList: (state) => {
    let peopleList = state.peopleList;
    state.filteredName !== ""
      ? (peopleList = peopleList.filter((people) =>
          people.name.toLowerCase().includes(state.filteredName.toLowerCase())
        ))
      : null;
    const page = state.page;
    return peopleList.length > state.itemsPerPage
      ? peopleList.slice(
          (page - 1) * state.itemsPerPage,
          page * state.itemsPerPage
        )
      : peopleList;
  },
  loadMore: (state) => {
    return state.numberOfPeoples > state.peopleList.length;
  },
  moreInfo: (state) => {
    return state.numberOfPeoples > state.peopleList.length;
  },
  totalPages: (state) => {
    return Math.ceil(state.peopleList.length / state.itemsPerPage);
  },
};
