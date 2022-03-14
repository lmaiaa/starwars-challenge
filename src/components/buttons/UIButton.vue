<template lang="pug">
    button.UIButton(
        @click="$emit('click')"
    )
        span.UIButton__text {{ text }}
</template>
<script>
export default {
  name: "UIButton",
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="stylus" scoped>
.UIButton
    min-height: 30px
    min-width: 100px
    border-radius: 10px
    color: var(--color-primary)
    background: var(--color-secondary)
    font-weight: 700;
    font-size: 1.5rem;
    cursor: pointer
    &:hover
        background: var(--color-primary)
        color: var(--color-secondary)
    &:focus
        outline-style: none
</style>
