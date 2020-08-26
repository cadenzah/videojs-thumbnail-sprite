import sinon from 'sinon';
import videojs from 'video.js';
import TS from '../lib';
import {
  generatePreview,
  initializeThumbnailSprite,
} from '../lib/utils';

describe(`Integrated Test`, () => {
  describe(`# utils/generatePreview.ts`, () => {
    let videoElement: HTMLElement;
    let player: videojs.Player;
    let controls: TS.IIndexableComponent;
    let sprites: Array<TS.Sprite>;

    beforeEach(() => {
      videoElement = document.createElement('video');
      document.body.appendChild(videoElement);
      player = videojs(videoElement);
      controls = player.controlBar;
      sprites = [
        {
          url: 'https://test.url/video1.png',
          start: 0,
          duration: 10,
          width: 160,
          height: 90,
          interval: 2,
        },
        {
          url: 'https://test.url/video2.png',
          start: 10,
          duration: 10,
          width: 160,
          height: 90,
          interval: 2,
        },
      ];
    });

    afterEach(() => {
      player.dispose();
    });

    it(`Generates Preview and apply it successfully`, () => {
      // given

      // when
      generatePreview(player, controls, sprites);

      // then
      const timeTooltipElement: HTMLElement = document.getElementsByClassName(`vjs-time-tooltip`)[0] as HTMLElement;
      expect(timeTooltipElement.style.width).toBe(`160px`);
      expect(timeTooltipElement.style.height).toBe(`90px`);
    });

    it(`Prevents generating previews if required DOM elements do not exist`, () => {
      // given
      const progressControlElement = document.getElementsByClassName(`vjs-progress-control`)[0];
      const seekBarElement = document.getElementsByClassName(`vjs-progress-holder`)[0];
      const mouseTimeDisplayElement = document.getElementsByClassName(`vjs-mouse-display`)[0];
      let timeTooltipElement: Element | null;

      // ## Case #1
      // when
      timeTooltipElement = document.getElementsByClassName(`vjs-time-tooltip`)[0];
      mouseTimeDisplayElement.removeChild(timeTooltipElement);
      generatePreview(player, controls, sprites);

      // then
      timeTooltipElement = document.querySelector(`vjs-mouse-display vjs-time-tooltip`);
      expect(timeTooltipElement).toBe(null);

      // ## Case #2
      // when
      seekBarElement.removeChild(mouseTimeDisplayElement);
      generatePreview(player, controls, sprites);

      // then
      timeTooltipElement = document.querySelector(`vjs-progress-holder vjs-time-seekbar vjs-time-tooltip`);
      expect(timeTooltipElement).toBe(null);

      // ## Case #3
      // when
      progressControlElement.removeChild(seekBarElement);
      generatePreview(player, controls, sprites);

      // then
      timeTooltipElement = document.querySelector(`vjs-progress-control vjs-progress-holder vjs-time-seekbar vjs-time-tooltip`);
      expect(timeTooltipElement).toBe(null);
    });

    it(`Calculates proper position of current hover (\`hoverPoint\`)`, () => {
      // given
      const progressCtrl: TS.IIndexableComponent = controls.progressControl;
      const seekBar: TS.IIndexableComponent = progressCtrl.seekBar;
      const mouseTimeDisplayElement = document.getElementsByClassName(`vjs-mouse-display`)[0] as HTMLElement;
      
      // when
      player.duration(5); // current time of video
      seekBar.width(800); // length of seekbar element
      mouseTimeDisplayElement.style.left = `50px`;  // current position of hover
      generatePreview(player, controls, sprites);

      // then - error not occurred
    });
  });

  describe(`# utils/initializeThumbnailSprite.ts`, () => {
    let videoElement: HTMLElement;
    let player: videojs.Player;
    let sprites: Array<TS.Sprite>;

    beforeEach(() => {
      videoElement = document.createElement('video');
      document.body.appendChild(videoElement);
      player = videojs(videoElement);
      sprites = [
        {
          url: 'https://test.url/video1.png',
          start: 0,
          duration: 10,
          width: 160,
          height: 90,
          interval: 2,
        },
        {
          url: 'https://test.url/video2.png',
          start: 10,
          duration: 10,
          width: 160,
          height: 90,
          interval: 2,
        },
      ];
    });

    afterEach(() => {
      player.dispose();
    });

    it(`plugin is initialized well `, () => {
      // given
      const options: TS.Options = { sprites };

      // when
      initializeThumbnailSprite(player, options);

      // then
      expect(player.hasClass(`vjs-sprite-thumbnails`)).toBe(true);
    });

    it(`if sprites in option is empty, plugin does not initialize`, () => {
      // given
      const options: TS.Options = <TS.Options>{ };

      // when
      initializeThumbnailSprite(player, options);

      // then
      expect(player.hasClass(`vjs-sprite-thumbnails`)).toBe(false);
    });
  });

  describe(`# index.ts`, () => {
    let videoElement: HTMLElement;
    let player: videojs.Player;
    let sprites: Array<TS.Sprite>;

    beforeEach(() => {
      videoElement = document.createElement('video');
      document.body.appendChild(videoElement);
      player = videojs(videoElement);
      sprites = [
        {
          url: 'https://test.url/video1.png',
          start: 0,
          duration: 10,
          width: 160,
          height: 90,
          interval: 2,
        },
        {
          url: 'https://test.url/video2.png',
          start: 10,
          duration: 10,
          width: 160,
          height: 90,
          interval: 2,
        },
      ];
    });

    // afterEach(() => {
    //   player.dispose();
    // });

    it(`Registers the plugin on \`video.js\` properly`, () => {
      // given
      const spyConsole = sinon.stub(console, 'error'); // surpress for test purpose
      const spy = sinon.spy(player, 'ready');
      const clock = sinon.useFakeTimers();
      const options: TS.Options = { sprites };

      // when
      // player.thumbnailSprite(options);
      const TSPlugin = new TS(
        player,
        options
      );
      clock.tick(3000);

      // then
      expect(player.hasClass(`vjs-sprite-thumbnails`)).toBe(true);
      expect(spy.callCount).toBe(1);
      player.dispose();
      clock.restore();
      spyConsole.restore();
    });

    it(`Replace empty option with default one`, () => {

    })
  });
});
