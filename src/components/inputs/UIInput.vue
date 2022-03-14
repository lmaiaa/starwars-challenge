<template lang="pug">
    div.input
        span.input__icon(v-if="icon" :class="`mdi mdi-${icon}`")
        input.input__field(:placeholder="placeholder" type="text" @input="$emit('input', $event.target.value)" )
</template>
<script>
export default {
  name: "UIInput",
  props: {
    icon: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="stylus" scoped>
.input
    display: flex
    align-items: baseline
    &__icon
        position: relative
        left: 35px
        z-index: 1
        color: var(--color-secondary)
        font-size: 1.8rem;
    &__field
        border-radius: 10px;
        min-height: 30px;
        background: var(--color-primary)
        opacity: 0.8
        border: calc(var(--element-size) * 0.03) solid var(--accent-color);
        text-indent: 20px
        &:focus
            border: none
            outline-style: none
</style>
