import videojs from 'video.js';
import TS from '../lib';
import sinon, { expectation } from 'sinon';

import {
  applyStyle,
  checkOptions,
  checkOverlap,
  convertSecondToTimeString,
  displayWarning,
  generatePreview,
  sortSprites,
} from '../lib/utils';

describe(`Unit Test`, () => {
  describe(`# applyStyle.ts`, () => {
    let dom: videojs.Dom;
    beforeEach(() => {
      document.body.innerHTML = 
        '<div id="element">' + 
          'Video.js Thumbnail Sprite'
        '</div>';
    });

    it(`Applies style properly`, () => {
      // given
      const style: object = {
        width: `100px`,
        height: `200px`,
      }
      const element = <HTMLElement> document.getElementById(`element`);
      
      // when
      applyStyle(element, style);

      // then
      expect(element.style.width).toBe(`100px`);
      expect(element.style.height).toBe(`200px`);
    });

    it(`Remove style which has empty value in passed style object`, () => {
      // given
      const style: object = {
        width: ``,
      }
      const element = <HTMLElement> document.getElementById(`element`);
      element.style.setProperty(`width`, `100px`);

      // when
      applyStyle(element, style);

      // then
      expect(element.style.height).toBe(``);
    });
  });

  describe(`# checkOptions.ts`, () => {
  // 오류 발생 여부를 트래킹한다 - console.warn 실행되었는지 확인
    it(`Warns if \`start\` is a negative value`, () => {
      // given
      const spy = sinon.stub(console, 'warn');
      const sprites: Array<TS.Sprite> = [
        {
          url: 'https://test.url/video.png',
          start: -1,
          duration: 10,
          width: 160,
          height: 90,
          interval: 2,
        },
      ];

      // when
      checkOptions(sprites);

      // then
      expect(spy.called).toBe(true);
      spy.restore();
    });

    it(`Warns if \`width\` or \`height\` is not passed`, () => {
      // given
      const spy = sinon.stub(console, 'warn');
      const sprites: Array<TS.Sprite> = [
        {
          url: 'https://test.url/video.png',
          start: 0,
          duration: 10,
          width: <number><unknown>undefined,
          height: <number><unknown>undefined,
          interval: 2,
        },
      ];

      // when
      checkOptions(sprites);

      // then
      expect(spy.called).toBe(true);
      spy.restore();
    });
    
    it(`Warns if \`duration\` is not multiple of \`interval\``, () => {
      // given
      const spy = sinon.stub(console, 'warn');
      const sprites: Array<TS.Sprite> = [
        {
          url: 'https://test.url/video.png',
          start: -1,
          duration: 11,
          width: 160,
          height: 90,
          interval: 2,
        },
      ];

      // when
      checkOptions(sprites);

      // then
      expect(spy.calledTwice).toBe(true);
      spy.restore();
    });
    
  });

  describe(`# checkOverlap.ts`, () => {
    it(`Do nothing if there is no overlap`, () => {
      // given
      const spy = sinon.stub(console, 'warn');
      const sprites: Array<TS.Sprite> = [
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
      // when
      checkOverlap(sprites);

      // then
      expect(spy.called).toBe(false);
      spy.restore();
    });
    
    it(`Warns if there is at least one overlap`, () => {
      // given
      const spy = sinon.stub(console, 'warn');
      const sprites: Array<TS.Sprite> = [
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
          start: 5,
          duration: 10,
          width: 160,
          height: 90,
          interval: 2,
        },
      ];
      // when
      checkOverlap(sprites);

      // then
      expect(spy.called).toBe(true);
      spy.restore();
    });
  });

  describe(`# convertSecondToTimeString.ts`, () => {
    it(`Generates \'00:00:00\' if input is less than or the same as 0`, () => {
      // given
      const second1 = -5;
      const second2 = 0;

      // when
      const result1 = convertSecondToTimeString(second1);
      const result2 = convertSecondToTimeString(second2);

      // then
      expect(result1).toBe(`00:00:00`);
      expect(result2).toBe(`00:00:00`);
    });

    it(`Converts properly`, () => {
      // given
      const second0 = 5;
      const second1 = 48;
      const second2 = 65;
      const second3 = 2123;
      const second4 = 8267 - 640;
      const second5 = 150318;

      // when
      const result0 = convertSecondToTimeString(second0);
      const result1 = convertSecondToTimeString(second1);
      const result2 = convertSecondToTimeString(second2);
      const result3 = convertSecondToTimeString(second3);
      const result4 = convertSecondToTimeString(second4);
      const result5 = convertSecondToTimeString(second5);

      // then
      expect(result0).toBe(`00:00:05`);
      expect(result1).toBe(`00:00:48`);
      expect(result2).toBe(`00:01:05`);
      expect(result3).toBe(`00:35:23`);
      expect(result4).toBe(`02:07:07`);
      expect(result5).toBe(`41:45:18`);
    });
  });

  describe(`# displayWarning.ts`, () => {
    it(`Warning message has prefixing word \'[videojs-thumbnail-sprite]\'`, () => {
      // given
      const spy = sinon.stub(console, 'warn');
      const sentence = `It\'s a dark and bright night`;
      
      // when
      displayWarning(sentence);

      // then
      expect(spy.calledWith(
        `[videojs-thumbnail-sprite] It\'s a dark and bright night`
      )).toBe(true);
      spy.restore();
    });
  });

  describe(`# sortSprites.ts`, () => {
    it(`Sorts array of sprites ordered by \`start\` ascending`, () => {
      // given
      const sprites: Array<TS.Sprite> = [
        {
          url: 'https://test.url/video2.png',
          start: 5,
          duration: 10,
          width: 160,
          height: 90,
          interval: 2,
        },
        {
          url: 'https://test.url/video2.png',
          start: 3,
          duration: 10,
          width: 160,
          height: 90,
          interval: 2,
        },
        {
          url: 'https://test.url/video1.png',
          start: 0,
          duration: 10,
          width: 160,
          height: 90,
          interval: 2,
        },
        {
          url: 'https://test.url/video1.png',
          start: 3,
          duration: 10,
          width: 160,
          height: 90,
          interval: 2,
        },
      ];

      // when
      sortSprites(sprites);

      // then
      expect(sprites[0].start).toBe(0);
      expect(sprites[2].start).toBe(3);
      expect(sprites[3].start).toBe(5);
    });
  });
});
