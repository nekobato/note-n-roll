<script setup lang="ts">
const octaves = [2, 3, 4];
const keys = [
  "c",
  "cis",
  "d",
  "dis",
  "e",
  "f",
  "fis",
  "g",
  "gis",
  "a",
  "ais",
  "b",
];
const whiteKeys = keys.filter((key) => !key.includes("is"));
const blackKeys = keys.filter((key) => key.includes("is"));
</script>

<template>
  <div class="piano">
    <div class="octave" v-for="octave in octaves">
      <div class="key" v-for="key in keys" :key="key">
        <div
          class="key"
          :class="{
            white: whiteKeys.includes(key),
            black: blackKeys.includes(key),
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.piano {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  flex-basis: 0 0 auto;
}
.octave {
  position: relative;
  display: flex;
  flex-basis: 0 0 auto;
  flex-direction: column-reverse;
}
.key {
  height: 14px;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  &:first-of-type {
    border-top: 0.5px solid rgba(0, 0, 0, 0.32);
  }
  &:last-of-type {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.32);
  }
  &.white {
    background: rgba(0, 0, 0, 0.08);
  }
  &.black {
    background: rgba(0, 0, 0, 0.16);
  }
}
</style>
