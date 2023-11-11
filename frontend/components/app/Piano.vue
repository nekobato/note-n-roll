<script setup lang="ts">
import { ref } from "vue";

const octaves = [2, 3, 4];
const whiteKeys = ["c", "d", "e", "f", "g", "a", "b"];
const blackKeys = ["cis", "dis", "fis", "gis", "ais"];
</script>

<template>
  <div class="piano">
    <div class="octave" v-for="octave in octaves">
      <div
        class="key-white"
        v-for="key in whiteKeys"
        :class="[octave, key]"
      ></div>
      <div
        class="key-black"
        v-for="key in blackKeys"
        :class="[octave, key]"
      ></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.piano {
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
}
.octave {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column-reverse;
}

.key-white {
  flex: 0 0 auto;
  height: 24px;
  width: 100%;
  background: #fff;
  border: 1px solid #000;
}

.key-black {
  flex: 0 0 auto;
  position: absolute;
  height: 15px;
  width: 60%;
  background: #000;
  border: 1px solid #000;
  &.cis {
    bottom: 13px;
  }
  &.dis {
    bottom: 40px;
  }
  &.fis {
    bottom: 79.5px;
  }
  &.gis {
    bottom: 105.5px;
  }
  &.ais {
    bottom: 131.5px;
  }
}
</style>
