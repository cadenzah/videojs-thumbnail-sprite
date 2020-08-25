import videojs from 'video.js';
import TS from '../index';

import applyStyle from './applyStyle';

function generatePreview(
  player: videojs.Player,
  controls: TS.IIndexableComponent,
  sprites: Array<TS.Sprite>
): void {
  const dom = videojs.dom;
  let sprite: TS.Sprite;
  // 3-dimension approach
  let hoverPoint: number = -1;  // which point of time currently hovering
  let optionIndex: number = -1; // which sprite image to use
  let spriteIndex: number = -1; // which one inside a sprite image to use

  // The case that Progress Control UI does not exist have already been filtered before this function is called
  const progressCtrl: TS.IIndexableComponent = controls['progressControl'];

  // If there is no Seek Bar UI or Mouse Time Display UI,
  // No Need to initialize the plugin
  if (progressCtrl['seekBar'] === undefined)
    return ;
  
  const seekBar: TS.IIndexableComponent = progressCtrl['seekBar'];
  if (seekBar['mouseTimeDisplay'] === undefined)
    return ;

  const mouseTimeDisplay: TS.IIndexableComponent = seekBar['mouseTimeDisplay'];
  if (mouseTimeDisplay['timeTooltip'] === undefined)
    return ;

  const timeTooltip: TS.IIndexableComponent = mouseTimeDisplay['timeTooltip'];
  
  // The components used to calculate the current point of time
  const mouseTimeDisplayEl: HTMLElement = mouseTimeDisplay.el() as HTMLElement;
  // The component to apply preview image on
  const timeTooltipEl: HTMLElement = timeTooltip.el() as HTMLElement;

  // from mouse pointer's location, get the point of time
  hoverPoint = parseFloat(mouseTimeDisplayEl.style.left);
  hoverPoint = player.duration() * (hoverPoint / seekBar.currentWidth());

  // from point of time currently hovering, get the corresponding preview image
  if (!isNaN(hoverPoint)) {
    // determine where the `hoverPoint` belongs
    for (let i = 0 ; i < sprites.length ; i++) {
      const sprite: TS.Sprite = sprites[i];
      if (hoverPoint < sprite.start + sprite.duration) {
        optionIndex = i;
        break;
      }
    }
  } else {
    // if `hoverPoint` has a strange value, assign default value as 0
    hoverPoint = 0;
  }

  // if `optionIndex` is -1, it means corresponding thumbnail sprite does not exist
  // so just use the first sprite

  // calculate which image inside the sprite to use
  spriteIndex = (optionIndex !== -1) ? (hoverPoint - sprites[optionIndex].start) / sprites[optionIndex].interval : hoverPoint;
  sprite = (optionIndex !== -1) ? sprites[optionIndex] : sprites[0];
  
  // create temporary `img` element to get the size of sprite thumbnail
  const image = dom.createEl('img', { src: sprite.url });
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;

  // get the coordinate to extract preview image from sprite thumbnail
  const columns = imageWidth / sprite.width;
  const columnTop = Math.floor(spriteIndex / columns) * -sprite.height;
  const columnLeft = Math.floor(spriteIndex % columns) * -sprite.width;

  // get the position to display preview image
  const controlsTop = dom.getBoundingClientRect(controls.el()).top;
  const seekBarTop = dom.getBoundingClientRect(controls.el()).top;
  const topOffset = -sprite.height - Math.max(0, seekBarTop - controlsTop);
    
  // apply image preview
  applyStyle(timeTooltipEl, {
    width: `${sprite.width}px`,
    height: `${sprite.height}px`,
    'background-image': `url(${sprite.url})`,
    'background-repeat': `no-repeat`,
    'background-position': `${columnLeft}px ${columnTop}px`,
    'background-size': `${imageWidth}px ${imageHeight}px;`,
    top: `${topOffset}px`,
    color: `#ffffff`,
    'text-shadow': `1px 1px #000000`,
    border: `1px 1px #000000`,
    margin: `0 1px`
  });
  // TODO
  // apply global style from `options` parameter
}

export default generatePreview;
