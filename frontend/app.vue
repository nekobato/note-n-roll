<script lang="ts" setup>
import Piano from "./components/app/Piano.vue";
import PianoRoll from "./components/app/PianoRoll.vue";
</script>

<template>
  <div class="piano-roll-container">
    <Piano class="piano" />
    <PianoRoll class="piano-roll" />
  </div>
</template>

<style lang="scss">
@import "~/assets/styles/index";
</style>

<style lang="scss" scoped>
.piano-roll-container {
  width: 320px;
  height: 320px;
  display: flex;
  flex-basis: 0 0 auto;
  overflow: scroll;
}
.piano {
  width: 120px;
}
.piano-roll {
}
</style>
