<template lang="pug">
    div.UICard
        slot

</template>
<script>
export default {
  name: "UICard",
};
</script>

<style lang="stylus" scoped>
.UICard
    background-color: var(--background-color-card)
    color: #222
    border-radius: 8px
    padding: 5px
    max-height: 500px
    display: flex
    justify-content: center
</style>
