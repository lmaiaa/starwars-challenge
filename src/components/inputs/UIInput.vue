<template lang="pug">
    div.input
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
