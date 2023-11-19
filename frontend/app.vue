<script lang="ts" setup>
import Piano from "./components/app/Piano.vue";
import PianoRoll from "./components/app/PianoRoll.vue";
import { keys, octaves } from "~/utils/statics";
import type { Note } from "~/composables/useAudio";
import * as Tone from "tone";

const notes = ref<
  {
    key: string;
    octave: number;
    start: number;
    end: number;
  }[]
>([]);

const { playNotes } = useAudio();

const progress = ref<number>(0);

const onCreateNote = (note: Note) => {
  notes.value.push(note);
};

const noteStyle = (note: Note) => {
  const { key, octave, start, end } = note;
  const keyIndex = keys.indexOf(key);
  const octaveIndex = octaves.indexOf(octave);
  const left = `${start * 80}px`;
  const bottom = `${octaveIndex * 12 * 14 + keyIndex * 14}px`;
  const width = "80px";
  return {
    left,
    bottom,
    width,
  };
};

const progressBarStyle = computed(() => ({
  transform: `translateX(${progress.value}px)`,
}));

const play = () => {
  setInterval(() => {
    progress.value = Tone.now() * 80;
  }, 30);
  playNotes(notes.value);

  // set progress bar position from Tone.now()
};
</script>

<template>
  <NuxtLayout>
    <div class="piano-roll-scroller">
      <div class="piano-roll-container">
        <Piano class="piano" />
        <PianoRoll class="piano-roll" @createNote="onCreateNote">
          <div class="notes">
            <div
              class="note"
              v-for="note in notes"
              :style="noteStyle(note)"
              :data-note="note.key + note.octave"
            ></div>
          </div>
          <div class="progress-bar" :style="progressBarStyle"></div>
        </PianoRoll>
      </div>
    </div>
    <button @click="play">Play</button>
    <span>{{ progress }}</span>
  </NuxtLayout>
</template>

<style lang="scss">
@import "~/assets/styles/index";
</style>

<style lang="scss" scoped>
.piano-roll-scroller {
  width: 640px;
  height: 480px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.piano-roll-container {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
}

.piano {
  width: 120px;
}
.piano-roll {
}
.notes {
  width: 0px;
  height: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
}
.note {
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.16);
  background: rgb(172 210 255);
  height: 14px;
  border-radius: 4px;
}
.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background: rgba(0, 0, 0, 0.16);
  translate: transformZ(0);
}
</style>
