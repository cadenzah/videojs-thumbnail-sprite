import videojs from 'video.js';
import TS from '../index';

import sortSprites from './sortSprites';
import checkOverlap from './checkOverlap';
import generatePreview from './generatePreview';

// 옵션에 값 빠진 경우에 대한 필터링 조건절 필요
function initializeThumbnailSprite(player: videojs.Player, options: TS.Options): void {
  // If there is no option provided, no need to initialize the plugin
  if (options.sprites.length === 0)
    return ;
  const { sprites } = options;
  const controls: TS.IIndexableComponent = player.controlBar;
  const progressCtrl: TS.IIndexableComponent = controls['progressControl'];

  // # settings init
  // Assumes that the player has default player UIs
  // such as control bar, progress bar, etc.

  // 0. 옵션 정리 - 스프라이트 담당 구간 시간 순으로 정렬 - 뒤섞여 들어오는 입력 대비
  sortSprites(sprites);

  // 0. 썸네일 구간에 겹치는 것이 있는지 확인
  // 겹치면, 경고 발생
  // 겹치는 시간이 있는 시간을 알려준다 (최소시점, 최대시점)
  checkOverlap(sprites);

  progressCtrl.on('mousemove', () => generatePreview(player, controls, sprites));
  progressCtrl.on('touchmove', () => generatePreview(player, controls, sprites));
  player.addClass('vjs-sprite-thumbnails');
}

export default initializeThumbnailSprite;
