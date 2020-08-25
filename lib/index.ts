import videojs from 'video.js';
import initializeThumbnailSprite from './utils/initializeThumbnailSprite';

const Plugin = videojs.getPlugin('plugin');

class ThumbnailSprite extends Plugin {
  private options: ThumbnailSprite.Options;

  constructor(player: videojs.Player, options?: ThumbnailSprite.Options) {
    super(player);
    const emptyOptions: ThumbnailSprite.Options = {
      sprites: [],
    }
    this.options = (options !== undefined) ? options : emptyOptions;
    

    // When player instance is ready, initialize the plugin
    this.player.ready(() => {
      initializeThumbnailSprite(
        this.player,
        this.options,
      );
    });
  }
}

videojs.registerPlugin('thumbnailSprite', ThumbnailSprite);

namespace ThumbnailSprite {
  // 옵션에 있어 글로벌 설정
    // 이후 스타일 추가 등으로 확장 가능성
  export interface Options {
    sprites: Array<Sprite>;
  }
  export interface Sprite {
    url: string;      // thumbnail sprite's url
    start: number;    // start timestamp of this sprite in video
    duration: number; // duration of this sprite in video
    width: number;    // width of each preview image
    height: number;   // height of each preview image
    interval: number; // interval of each preview images in sprite
  };

  export interface IIndexableComponent extends videojs.Component {
    [key: string]: any;
  }
}

export default ThumbnailSprite;
