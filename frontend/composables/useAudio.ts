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

export const useAudio = () => {
  const sampler = new Tone.Sampler({
    urls: noteNames.reduce((acc, noteName, i) => {
      acc[noteName] = noteFiles[i] + ".mp3";
      return acc;
    }, {} as { [key: string]: string }),
    release: 1,
    baseUrl: pianoMp3Dir,
  }).toDestination();
  const playNote = (note: string) => {
    console.log(note);
    sampler.triggerAttackRelease(note, "8n");
  };

  const playNotes = (notes: Note[]) => {
    notes.forEach((note) => {
      sampler.triggerAttackRelease(note.key, note.end - note.start, note.start);
    });
  };

  return { playNote, playNotes };
};
