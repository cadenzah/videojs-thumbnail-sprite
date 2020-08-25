import TS from '../index';
import convertSecondToTimeString from './convertSecondToTimeString';
import displayWarning from './displayWarning';

function checkOptions(sprites: Array<TS.Sprite>): void {
  // Check if the sprite thumbnails have all required options properly,
  // so that generating each previews executes correctly
  for (let i = 0 ; i < sprites.length ; i++) {
    const {
      start, duration, interval, width, height, url,
    } = sprites[i];

    // # `start` should be zero or positive value
    if (start < 0) {
      displayWarning(`\`start\` should be zero or positive value: [${convertSecondToTimeString(start)} ~ ${convertSecondToTimeString(start + duration - 1)}] Preview images may not show as expected`);
    }

    // # `width` and `height` should not be undefined
    if (width === undefined || height === undefined) {
      displayWarning(`\`width\` and \`height\` should be provided: [${convertSecondToTimeString(start)} ~ ${convertSecondToTimeString(start + duration - 1)}] Preview images may not show as expected`);
    }

    // # `interval` should be able to fully cover entire duration
    if (duration % interval !== 0) {
      displayWarning(`\`duration\` should be multiple of \`interval\` so that it can fully cover entire duration: [${convertSecondToTimeString(start)} ~ ${convertSecondToTimeString(start + duration - 1)}] Preview images may not show as expected`);
    }
  }
}

export default checkOptions;
