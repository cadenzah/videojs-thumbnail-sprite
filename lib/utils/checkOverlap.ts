import TS from '../index';
import convertSecondToTimeString from './convertSecondToTimeString';

function checkOverlap(sprites: Array<TS.Sprite>): void {
  // 0. 썸네일 구간에 겹치는 것이 있는지 확인
  // 겹치면, 경고 발생
  // 겹치는 시간이 있는 시간을 알려준다 (최소시점, 최대시점)
  for (let i = 0 ; i < sprites.length - 1 ; i++) {
    const e1Start = sprites[i].start;
    const e1End = e1Start + sprites[i].duration;
    const e2Start = sprites[i + 1].start;
    const e2End = e2Start + sprites[i + 1].duration;

    if (e2Start < e1End) {
      const overlapStart = e1Start;
      const overlapEnd = Math.max(e1End, e2End);
      console.warn(`Provided thumbnail sprites have overlapping sections among them: [${convertSecondToTimeString(overlapStart)} ~ ${convertSecondToTimeString(overlapEnd)}] Preview images may not match the corresponding point of time correctly.`);
    }
  }
}

export default checkOverlap;
