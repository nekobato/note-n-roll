import * as Tone from "tone";

export type Note = {
  key: string;
  octave: number;
  start: number;
  end: number;
};

const pianoMp3Dir = "./piano-mp3/";
// generate A0 - G7
const noteFiles = [0, 1, 2, 3, 4, 5, 6, 7]
  .map((octave) => {
    return [
      "C",
      "Db",
      "D",
      "Eb",
      "E",
      "F",
      "Gb",
      "G",
      "Ab",
      "A",
      "Bb",
      "B",
    ].map((note) => {
      return `${note}${octave}`;
    });
  })
  .flat();

const noteNames = [0, 1, 2, 3, 4, 5, 6, 7]
  .map((octave) => {
    return [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ].map((note) => {
      return `${note}${octave}`;
    });
  })
  .flat();

const sampler = new Tone.Sampler({
  urls: noteNames.reduce((acc, noteName, i) => {
    acc[noteName] = noteFiles[i] + ".mp3";
    return acc;
  }, {} as { [key: string]: string }),
  release: 1,
  baseUrl: pianoMp3Dir,
}).toDestination();

export const useAudio = () => {
  const playNote = (note: string) => {
    sampler.triggerAttackRelease(note, 1);
  };

  const playNotes = (notes: Note[]) => {
    notes.forEach((note) => {
      console.log(note.key, note.end - note.start, note.start);
      sampler.triggerAttackRelease(
        note.key + note.octave,
        note.end - note.start,
        Tone.now() + note.start,
      );
    });
  };

  return { playNote, playNotes };
};
