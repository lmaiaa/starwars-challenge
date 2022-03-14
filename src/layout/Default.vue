<template lang="pug">
    div.LayoutDefault
        div.header
            img.header__logo(:src='startWarsLogo' alt="Star Wars Logo")
           
            UIToggle.header__toggle(v-model="isDarkMode" textLeft="🌙" textRight="☀️" :checked="isDarkMode")
        div.content
            router-view
        div.footer
            h3.footer__title Feito com ❤️ por Luccas Maia
</template>

<script>
import startWarsLogo from "../assets/images/star-wars-logo.png";
import UIToggle from "@/components/buttons/UIToggle.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "LayoutDefault",
  components: {
    UIToggle,
  },
  data() {
    return {
      startWarsLogo,
      isDarkMode: false,
    };
  },
  mounted() {
    document.documentElement.className = this.theme;
    this.isDarkMode = this.theme === "dark" ? true : false;
  },
  methods: {
    ...mapActions("theme", ["changeTheme"]),
  },
  watch: {
    isDarkMode(val) {
      const theme = val ? "dark" : "light";
      this.changeTheme(theme);
    },
  },
  computed: {
    ...mapState("theme", {
      theme: (state) => state.theme,
    }),
  },
};
</script>
<style lang="stylus" scoped>
.LayoutDefault
    height: 100%
    .header
      display: flex
      align-items: center
      justify-content: space-between
      width: 100vw
      height: 10%
      padding: 0 4rem
      background: var(--color-primary)
      &__logo
        width: auto
        height: 60px
  .content
    height: 85%
    width: 100vw
  .footer
    display: flex
    align-items: center
    justify-content: center
    height: 5%
    background: var(--color-primary)
    &__title
        font-size: 1.6rem
        color: var(--text-secondary-color)
        font-weight: bold
        margin: 0
        padding: 0
        text-align: center
</style>
