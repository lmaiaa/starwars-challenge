<template lang="pug">
    div.UIPagination
        span.btn(@click="$emit('previusPage')" v-show="page>1") {{'< '}}
        span {{` ${page} ${loadMore?`of ${totalPages !==1 ? '...': ''} ${totalPages} ... `:`of ${totalPages}`}`}}        
        span.btn(@click="$emit('nextPage')" v-show="moreInfo || page !== totalPages") {{' >'}}
</template>
<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    loadMore: {
      type: Boolean,
      default: false,
    },
    moreInfo: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="stylus" scoped>
.UIPagination
  color: var(--text-secondary-color)
.btn
  cursor: pointer
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
</style>
