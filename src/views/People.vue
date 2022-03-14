<template lang="pug">
    div.People
        div.btn-to-back(@click="$router.push('/'), clearInfoPeopleSelected()") {{'< Back to Home'}}
        UICard.card(v-if="selectedPeopleMovies.length ")
            h3.card__title {{ peopleSelected.name }}
            p.card__text 
                strong Height: 
                span {{ peopleSelected.height }}
            p.card__text 
                strong Mass: 
                span {{ peopleSelected.mass }}
            p.card__text 
                strong Hair: 
                span {{ peopleSelected.hair_color }}
            p.card__text 
                strong Gender: 
                span {{ peopleSelected.gender }}
            p.card__text 
                strong Eye Color: 
                span {{ peopleSelected.eye_color }}
            p.card__text 
                strong Skin Color: 
                span {{ peopleSelected.skin_color }}
            p.card__text 
                strong Birth Year: 
                span {{ peopleSelected.birth_year }}
            hr.card__divider
            h3.card__title Films 
            ol.card__films
                li.card__films__item(v-for="(film,index) in selectedPeopleMovies" :key="index")
                    h3.card__films__item__title {{ film.title }}
                    p.card__films__item__text Release Date: {{ film.release_date }}
                    p.card__films__item__text Episode: {{ film.episode_id }}
                    p.card__films__item__text Directed by: {{ film.director }}
</template>
<script>
import UICard from "@/components/cards/UICard.vue";

import { mapActions, mapState } from "vuex";

export default {
  name: "PeopleView",
  components: { UICard },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  async created() {
    await this.fetchPeopleById(this.$props.id);
    this.fetchFilmsByPeopleSelected();
  },
  methods: {
    ...mapActions("people", [
      "fetchPeopleById",
      "fetchFilmsByPeopleSelected",
      "clearInfoPeopleSelected",
    ]),
  },
  computed: {
    ...mapState("people", ["peopleSelected", "selectedPeopleMovies"]),
  },
};
</script>
<style lang="stylus" scoped>
.People
    display: flex
    justify-content: center
    align-items: center
    height: 100%
    .btn-to-back
        position absolute
        left: 5%
        top: 15%
        font-weight: 700;
        font-size: 1.5rem;
        cursor: pointer
        &:hover
            color: var(--color-secondary)
    .card
        overflow: auto;
        padding: 30px
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: flex-start
        width: 80%;
        max-width: 500px
        height: 80%;
        max-height: 600px;
        &__title
          margin: 20px;
        &__divider
            margin: 10px 0;
            border-top: 3px solid var(--accent-color)
            width: 100%
        &__films
            &__item
                display: flex;
                flex-direction: column
                justify-content: flex-start;
                align-items: center;
                padding: 10px 0;
                &:not(:last-child)
                    border-bottom: 1px solid var(--accent-color)
</style>
