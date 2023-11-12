<script setup lang="ts">
import { defineEmits } from "vue";
import { keys, octaves } from "~/utils/statics";
const beats = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const whiteKeys = keys.filter((key) => !key.includes("b"));
const blackKeys = keys.filter((key) => key.includes("b"));

const revercedOctaves = octaves.toReversed();
const revercedKeys = keys.toReversed();

defineEmits(["createNote"]);
</script>

<template>
  <div class="piano-roll">
    <div class="beats">
      <div class="beat" v-for="beat in beats">
        <div class="octave" v-for="octave in revercedOctaves">
          <div
            class="key"
            v-for="key in revercedKeys"
            :key="key"
            :class="[
              {
                white: whiteKeys.includes(key),
                black: blackKeys.includes(key),
              },
              key,
            ]"
            :data-key="key + octave"
            @click="
              $emit('createNote', { key, octave, start: beat, end: beat + 1 })
            "
          ></div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.piano-roll {
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  flex: 0 0 auto;
  position: relative;
}
.beats {
  width: 80px;
  position: relative;
  display: flex;
  flex: 0 0 auto;
}
.beat {
  width: 80px;
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
}
.octave {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
}
.key {
  height: 14px;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  &:first-of-type {
    border-top: 0.5px solid rgba(0, 0, 0, 0.16);
  }
  &:last-of-type {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.16);
  }
  &.white {
    background: rgba(0, 0, 0, 0.08);
  }
  &.black {
    background: rgba(0, 0, 0, 0.16);
  }
}
</style>
