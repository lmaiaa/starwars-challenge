<template lang="pug">
    div.UIToggle
        input.switch-checkbox#checkbox(type="checkbox" @change=" $emit('change', $event.target.checked)"  :checked="checked" )
        label.switch-label(for="checkbox")
            span {{textLeft}}
            span {{textRight}}
            div.switch-toggle(:class="{'switch-toggle-checked': checked}")

</template>
<script>
export default {
  name: "UIToggle",
  model: {
    event: "change",
    checked: "checked",
  },
  props: {
    textLeft: {
      type: String,
      default: "🌙",
    },
    textRight: {
      type: String,
      default: "☀️",
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="stylus" scoped>
.switch-checkbox
    display: none
.switch-label
    width: var(--element-size)
    border-radius: var(--element-size)
    border: calc(var(--element-size) * 0.03) solid var(--accent-color);
    padding: calc(var(--element-size) * 0.2);
    font-size: calc(var(--element-size) * 0.5);
    height: calc(var(--element-size) * 0.35);
    align-items: center;
    background: var(--text-secondary-color);
    cursor: pointer;
    position: relative;
    transition: background 0.5s ease;
    z-index: 1;
.switch-toggle
    position: absolute;
    background-color: var(--background-color-primary);
    border-radius: 50%;
    top: calc(var(--element-size) * 0.15);
    left: calc(var(--element-size) * 0.2);
    height: calc(var(--element-size) * 0.6);
    width: calc(var(--element-size) * 0.6);
    transform: translateX(0);
    transition: transform 0.3s ease, background-color 0.5s ease;
    &-checked
        transform: translateX(calc(var(--element-size) * 0.8));
</style>
