<script setup lang="ts">
import { ref } from "vue";
import { useAudio } from "~/composables/useAudio";
import { keys, octaves } from "~/utils/statics";

const revercedOctaves = octaves.toReversed();
const revercedKeys = keys.toReversed();
const whiteKeys = revercedKeys.filter((key) => !key.includes("b"));
const blackKeys = revercedKeys.filter((key) => key.includes("b"));

const { playNote } = useAudio();
</script>

<template>
  <div class="piano">
    <div class="octave" v-for="octave in revercedOctaves">
      <div
        class="key-white"
        v-for="key in whiteKeys"
        :class="[octave, key]"
        @mousedown="playNote(key.toUpperCase() + octave)"
      >
        <span class="key-name">{{ key }}{{ octave }}</span>
      </div>
      <div
        class="key-black"
        v-for="key in blackKeys"
        :class="[octave, key]"
        @mousedown="playNote(key.toUpperCase() + 'b' + octave)"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.piano {
  width: 100%;
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

.key-white {
  position: relative;
  flex: 0 0 auto;
  height: 24px;
  width: 100%;
  background: #fff;
  border: 1px solid #000;
  display: inline-flex;
  align-items: center;
  .key-name {
    position: absolute;
    right: 4px;
    color: #7c7c7c;
    font-size: 10px;
    text-transform: uppercase;
  }
}

.key-black {
  flex: 0 0 auto;
  position: absolute;
  height: 15px;
  width: 60%;
  background: #000;
  border: 1px solid #000;
  &.Db {
    bottom: 14px;
  }
  &.Eb {
    bottom: 43px;
  }
  &.Gb {
    bottom: 85px;
  }
  &.Ab {
    bottom: 112px;
  }
  &.Bb {
    bottom: 139px;
  }
}
</style>
