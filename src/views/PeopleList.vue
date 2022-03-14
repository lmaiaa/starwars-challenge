<template lang="pug">
.PeopleList 
  h2.title People List
  UIInput(placeholder="Search by name...", v-model="search")
  div.container
    div.container__cards(v-show="!loading && paginatedAndFilteredPeopleList.length ")
      UICard.container__cards__card(
        v-for="person in paginatedAndFilteredPeopleList",
        :key="person.id"
      )
        h3.container__cards__card__title {{ person.name }}
        p.container__cards__card_text Height: {{ person.height }}
        p.container__cards__card_text Mass: {{ person.mass }}
        p.container__cards__card_text Hair: {{ person.hair_color }}
        p.container__cards__card_text Gender: {{ person.gender }}
        UIButton.container__cards__card__action(text="More Info")
    div.container__cards--no-results(v-show="!loading && !paginatedAndFilteredPeopleList.length") No results
    UIPagination.container__pagination(
      :loadMore="loadMore",
      :moreInfo="moreInfo",
      :page="page",
      :totalPages="totalPages",
      @previusPage="previusPage()",
      @nextPage="nextPage()",
      v-show="!loading && !search.length"
    )
</template>
<script>
import debounce from "lodash.debounce";

import UIInput from "@/components/inputs/UIInput.vue";
import UICard from "@/components/cards/UICard.vue";
import UIPagination from "@/components/buttons/UIPagination.vue";
import UIButton from "@/components/buttons/UIButton.vue";
import UILoadingBar from "@/components/loadings/UILoadingBar.vue";

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "PeopleList",
  components: { UIInput, UICard, UIPagination, UIButton, UILoadingBar },
  async created() {
    await this.fetchPeopleListByPage();
  },
  data: function () {
    return {
      search: "",
    };
  },
  methods: {
    ...mapActions("people", ["fetchPeopleListByPage", "fetchPeopleListByName"]),
    ...mapMutations("people", ["SET_PAGE", "SET_FILTERED_NAME"]),
    previusPage: async function () {
      this.SET_PAGE(this.page - 1);
    },
    nextPage: async function () {
      if (this.page >= this.maxPage)
        await this.fetchPeopleListByPage(this.page + 1);
      else this.SET_PAGE(this.page + 1);
    },
    wrapperSearchByName: async function () {
      this.SET_FILTERED_NAME(this.search);
      console.log(this.moreInfo);
      if (this.moreInfo && this.search !== "")
        await this.fetchPeopleListByName(this.search);
    },
  },
  computed: {
    ...mapState("people", [
      "peopleList",
      "numberOfPeoples",
      "page",
      "maxPage",
      "filteredName",
    ]),
    ...mapState("loading", ["loading"]),
    ...mapGetters("people", [
      "paginatedAndFilteredPeopleList",
      "loadMore",
      "moreInfo",
      "totalPages",
    ]),
  },
  watch: {
    search: debounce(function () {
      this.wrapperSearchByName();
    }, 500),
  },
};
</script>
<style lang="stylus" scoped>
.PeopleList
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .title
    margin: 10px;
    color: var(--text-secondary-color)


  .container
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    &__cards
      height: 80%;
      padding: 20px;
      margin: 10px;
      overflow: auto;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;
      &--no-results
        font-size: 1.5em;
        color: var(--text-secondary-color)

      &__card
        margin: 5px;
        display: flex;
        flex-flow: column;
        align-items: center;
        width: 300px;
        height: 200px;

        &__title
          margin: 10px;


        &__action
          margin: 10px;


    &__pagination
      padding: 10px;
</style>
