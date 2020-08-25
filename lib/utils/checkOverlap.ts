import TS from '../index';
import convertSecondToTimeString from './convertSecondToTimeString';
import displayWarning from './displayWarning';

function checkOverlap(sprites: Array<TS.Sprite>): void {
  // Check if the sprite thumbnails have overlapping section among them,
  // so that previews display their corresponding points of time correctly
  for (let i = 0 ; i < sprites.length - 1 ; i++) {
    const e1Start = sprites[i].start;
    const e1End = e1Start + sprites[i].duration;
    const e2Start = sprites[i + 1].start;
    const e2End = e2Start + sprites[i + 1].duration;

    if (e2Start < e1End) {
      const overlapStart = e1Start;
      const overlapEnd = Math.max(e1End, e2End);

      // If there is an overlap, generate warning on console
      displayWarning(`Provided thumbnail sprites have overlapping sections among them: [${convertSecondToTimeString(overlapStart)} ~ ${convertSecondToTimeString(overlapEnd)}] Preview images may not match the corresponding point of time correctly.`);
    }
  }
}

export default checkOverlap;
