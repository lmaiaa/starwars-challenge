<template lang="pug">
  div#app
    UILoadingBar.loading(v-show="loading")
    router-view
</template>
<script>
import UILoadingBar from "@/components/loadings/UILoadingBar.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: { UILoadingBar },
  computed: {
    ...mapState("loading", ["loading"]),
  },
};
</script>
<style lang="stylus">
:root
  font-size: 60%
  --background-color-primary: #ebebeb
  --background-color-secondary:#fafafa
  --accent-color: #cacaca
  --text-primary-color: #222
  --text-secondary-color: #ddd
  --element-size: 4rem
  --color-primary: #fffbf0
  --color-secondary:  #474843
  --background-color-card: #ffd41f
  &.dark
    --background-color-primary: #1e1e1e
    --background-color-secondary: #2d2d30
    --accent-color: #3f3f3f
    --text-primary-color: #ddd
    --text-secondary-color: #222
    --color-primary: #474843
    --color-secondary: #fffbf0
body
html
  background-color: var(--background-color-primary)
  font-family: 'Roboto', sans-serif;
  font: 500 1.6rem Roboto;
  color: var(--text-primary-color);
#app
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  overflow hidden
  .loading
    position: absolute
*
  margin: 0
  padding: 0
  box-sizing: border-box

::-webkit-scrollbar {
  width: 5px;
}
/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--color-primary);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--color-secondary);
}
::-webkit-scrollbar-track-piece {
  background: none;
}
</style>
