import { getFilmsApi } from "@/services/films.service";
import { getPeoplesApi } from "@/services/people.service";

export const state = {
  peopleList: [],
  page: 1,
  numberOfPeoples: 0,
  maxPage: 1,
  itemsPerPage: 10,
  filteredName: "",
  peopleSelected: null,
  selectedPeopleMovies: [],
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
  SET_PEOPLE_SELECTED(state, peopleSelected) {
    state.peopleSelected = peopleSelected;
  },
  ADD_SELECTED_PEOPLE_MOVIES(state, selectedPeopleMovies) {
    state.selectedPeopleMovies.push(selectedPeopleMovies);
  },
  SET_SELECTED_PEOPLE_MOVIES(state, selectedPeopleMovies) {
    state.selectedPeopleMovies = selectedPeopleMovies;
  },
};
export const actions = {
  async fetchPeopleListByPage({ commit, dispatch }, page = 1) {
    try {
      dispatch("loading/showLoading", true, { root: true });
      const response = await getPeoplesApi(page);
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
      const response = await getPeoplesApi(1, name);
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
  async fetchPeopleById({ commit, dispatch }, id) {
    try {
      dispatch("loading/showLoading", true, { root: true });
      const response = await getPeoplesApi(1, "", id);
      dispatch("loading/showLoading", false, { root: true });
      commit("SET_PEOPLE_SELECTED", response);
    } catch (err) {
      console.log(err);
      dispatch("loading/showLoading", false);
    }
  },
  async fetchFilmsById({ commit, dispatch }, id) {
    try {
      dispatch("loading/showLoading", true, { root: true });
      const response = await getFilmsApi("", id);
      dispatch("loading/showLoading", false, { root: true });
      commit("ADD_SELECTED_PEOPLE_MOVIES", response);
    } catch (err) {
      console.log(err);
      dispatch("loading/showLoading", false);
    }
  },
  fetchFilmsByPeopleSelected({ dispatch }) {
    try {
      state.peopleSelected
        ? Promise.all(
            state.peopleSelected.films.map((film) => {
              dispatch("fetchFilmsById", film.split("/")[5]);
            })
          )
        : null;
    } catch (err) {
      console.log(err);
      dispatch("loading/showLoading", false);
    }
  },
  clearInfoPeopleSelected({ commit }) {
    commit("SET_PEOPLE_SELECTED", null);
    commit("SET_SELECTED_PEOPLE_MOVIES", []);
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
