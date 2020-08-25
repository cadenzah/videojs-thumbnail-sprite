import videojs from 'video.js';
import sinon from 'sinon';
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
    it(`Applies style properly`, () => {
      // 스타일을 적용하면, 이것이 잘 적용되는가?
      // given

      // when

      // then
    });

    it(`Remove style which is not included in passed style object`, () => {
      // 스타일을 적용했을 때, 스타일 객체에 없는 스타일은 제거하는가?
      // given

      // when

      // then
    });
  });

  describe(`# checkOptions.ts`, () => {
  // 오류 발생 여부를 트래킹한다 - console.warn 실행되었는지 확인
    it(`Warns if \`start\` is a negative value`, () => {
      // start가 음수일 때 경고 출력하는가?
      // given

      // when

      // then
    });
    
    it(`Warns if \`width\` or \`height\` is undefined`, () => {
      // width 와 height가 undefined일 때 경고 출력하는가?
      // given

      // when

      // then
    });
    
    it(`Warns if \`duration\` is not multiple of \`interval\``, () => {
      // duration이 interval의 배수가 아니면 경고 출력하는가?
      // given
      
      // when

      // then
    });
    
  });

  describe(`# checkOverlap.ts`, () => {
    it(`Do nothing if there is no overlap`, () => {
      // 오버랩이 없다면 경고를 출력하지 않는가?
      // given

      // when

      // then
    });
    
    it(`Warns if there is at least one overlap`, () => {
      // 오버랩이 하나라도 존재하면 경고를 출력하는가?
      // given

      // when

      // then
    });
  });

  describe(`# convertSecondToTimeString.ts`, () => {
    it(`Generates \'00:00:00\' if input is less than or the same as 0`, () => {
      // given

      // when

      // then
    });

    it(`Converts properly`, () => {

    });
  });

  describe(`# displayWarning.ts`, () => {
    it(`Warning message has prefixing word \'[videojs-thumbnail-sprite]\'`, () => {
      // given

      // when

      // then
    });
  });

  describe(`# sortSprites.ts`, () => {
    it(`Sorts array of sprites ordered by \`start\` ascending`, () => {
      // given

      // when

      // then
    });
  });

  
});
