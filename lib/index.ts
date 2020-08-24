import videojs from 'video.js';
import initializeThumbnailSprite from './utils/initializeThumbnailSprite';

const Plugin = videojs.getPlugin('plugin');

class ThumbnailSprite extends Plugin {
  private options: ThumbnailSprite.Options;

  constructor(player: videojs.Player, options: ThumbnailSprite.Options) {
    super(player);
    this.options = options;

    // When player instance is ready, initialize the plugin
    this.player.ready(() => {
      initializeThumbnailSprite(
        this.player,
        this.options,
      )
    })
  }
}

videojs.registerPlugin('thumbnailSprite', ThumbnailSprite);

namespace ThumbnailSprite {
  export interface Options {
    [key: string]: any;
  }
}

export default ThumbnailSprite;
