
// Finds the nearest valid clip in a given track.
// First attempts position, if not found, tries previous positions.

export function findValidClip(track: number, position: number) {
  let attemptPosition = position;
  let clip = document.getElementById(`clip-${track}-${attemptPosition}`);

  while (!clip && attemptPosition > 0) {
    attemptPosition--;
    clip = document.getElementById(`clip-${track}-${attemptPosition}`);
  }

  return { clip, attemptPosition };
}
