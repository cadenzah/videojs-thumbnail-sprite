import videojs from 'video.js';
import TS from '../index';

import sortSprites from './sortSprites';
import checkOverlap from './checkOverlap';
import checkOptions from './checkOptions';
import generatePreview from './generatePreview';

function initializeThumbnailSprite(player: videojs.Player, options: TS.Options): void {
  // If there is no option provided,
  // No need to initialize the plugin
  if (options.sprites === undefined)
    return ;
  const { sprites } = options;

  // If there is no Control Bar UI or no Progress Control UI,
  // No need to initialize the plugin
  if (player.controlBar === undefined)
    return ;
  
  const controls: TS.IIndexableComponent = player.controlBar;
  if (controls['progressControl'] === undefined)
    return ;
  
  const progressCtrl: TS.IIndexableComponent = controls['progressControl'];

  // Sort sprite images to prevent inappropriate order
  sortSprites(sprites);

  // Check if the sprite thumbnails have overlapping section among them,
  // so that previews display their corresponding points of time correctly
  checkOverlap(sprites);

  // Check if the sprite thumbnails have all required options properly,
  // so that generating each previews executes correctly
  checkOptions(sprites);

  // Register event listener for hovering on progress control
  progressCtrl.on(`mousemove`, () => generatePreview(player, controls, sprites));
  progressCtrl.on(`touchmove`, () => generatePreview(player, controls, sprites));
  // Add class to enable 
  player.addClass(`vjs-sprite-thumbnails`);
}

export default initializeThumbnailSprite;
