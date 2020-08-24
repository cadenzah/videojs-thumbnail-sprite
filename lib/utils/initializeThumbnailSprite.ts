import videojs from 'video.js';
import TS from '../index';

// 옵션에 값 빠진 경우에 대한 필터링 조건절 필요
function initializeThumbnailSprite(player: videojs.Player, options: TS.Options): void {
  // If there is no option provided, no need to initialize the plugin
  if (options.sprites.length === 0)
    return ;
  const { sprites } = options;
  // # settings init
  // Assumes that the player has default player UIs
  // such as control bar, progress bar, etc.

  const controls: IIndexableComponent = player.controlBar;
  const progressCtrl: IIndexableComponent = controls['progressControl'];
  const seekBar:IIndexableComponent = progressCtrl['seekBar'];
  const mouseTimeDisplay: IIndexableComponent = seekBar['mouseTimeDisplay'];


  // 0. 옵션 정리 - 스프라이트 담당 구간 시간 순으로 정렬
  sprites.sort((e1, e2): number => {
    if (e1.start < e2.start)
      return -1;
    else if (e1.start === e2.start)
      return 0;
    else
      return 1;
  });

  progressCtrl.on('mousemove', () => generatePreview(player, controls, sprites));
  progressCtrl.on('touchmove', () => generatePreview(player, controls, sprites));
  player.addClass('vjs-sprite-thumbnails');
}

function generatePreview(
  player: videojs.Player,
  controls: IIndexableComponent,
  sprites: Array<TS.Sprite>
): void {
  const dom = videojs.dom;
  let sprite: TS.Sprite;
  let optionIndex: number = -1; // 여러 이미지 중 어떤 것
  let spriteIndex: number = -1; // 현재 스프라이트 내에서 몇번째

  const progressCtrl: IIndexableComponent = controls['progressControl'];
  const seekBar: IIndexableComponent = progressCtrl['seekBar'];
  const mouseTimeDisplay: IIndexableComponent = seekBar['mouseTimeDisplay'];
  const timeTooltip: IIndexableComponent = mouseTimeDisplay['timeTooltip'];
  
  const mouseTimeDisplayEl: HTMLElement = mouseTimeDisplay.el() as HTMLElement;
  const timeTooltipEl: HTMLElement = timeTooltip.el() as HTMLElement;

  // 호버링이 발생하면
  // 1. 호버링된 시간을 식별한다 (event listener 등록)
  let hoverPoint = parseFloat(mouseTimeDisplayEl.style.left);
  hoverPoint = player.duration() * (hoverPoint / seekBar.currentWidth()); // 현재 재생 시점 구하기

  // 2. 해당 시점에 대응하는 스프라이트, 스프라이트 내 인덱스를 찾는다
    // mouseTimeDisplay의 left 속성을 통하여 간접적으로 확인
    // 49번 ~ 51번 라인 주의
    // 각각을 값으로 유지한다
  if (!isNaN(hoverPoint)) {
    
    // hoverPoint가 몇번째 스프라이트에 속하는지 계산
      // 
    for (let i = 0 ; i < sprites.length ; i++) {
      const sprite: TS.Sprite = sprites[i];
      if (hoverPoint < sprite.start + sprite.duration) {
        optionIndex = i;
        break;
      }
    }
    // 배열이 길이가 0이거나 (이건 불가능 ; 처음에 원천 차단)
    // 현재 hoverPoint에 해당하는 스프라이트가 없을 경우 - 검은 화면
    
    // 확인 결과, `background-position`은 해당하는 top/left에 맞는 영역이 바깥이면, 그냥 검은 화면됨
    // 그래서, 그냥 무작정 spriteIndex가 늘어나게 만들더라도
    // 코드가 오류나지는 않을듯
    // 즉, 아래에서 spriteIndex = (hoverPoint) 로 해도 될듯?
  } else {
    // 현재 재생 시점을 계산했더니 말도 안되는 값이 나오면, 그냥 0으로 채운다
    hoverPoint = 0;
  }

  spriteIndex = (optionIndex !== -1) ? (hoverPoint - sprites[optionIndex].start) / sprites[optionIndex].interval : hoverPoint; // 현재 스프라이트에서 몇번쨰 이미지인지 인덱스 계산
  sprite = (optionIndex !== -1) ? sprites[optionIndex] : sprites[0];

  // 3. mouseTimeDisplay 위치에 스타일 덮어씌우기 한다
    // 해당 구간에 해당하는 스프라이트만을 초기화 (비동기)
    // (1) 몇번째 스프라이트, 인덱스에 맞추어 위치 계산
  
  // 스타일에서 크기 계산을 위하여, 이미지를 임시로 만든다
  const image = dom.createEl('img', { src: sprite.url });
  const imageWidth = image.naturalWidth;
  const imageHeight = image.naturalHeight;

  const columns = imageWidth / sprite.width;
  const columnTop = Math.floor(spriteIndex / columns) * -sprite.height;
  const columnLeft = Math.floor(spriteIndex % columns) * -sprite.width;

  const controlsTop = dom.getBoundingClientRect(controls.el()).top;
  const seekBarTop = dom.getBoundingClientRect(controls.el()).top;
  // seekBar의 top이 기준 위치
  const topOffset = -sprite.height - Math.max(0, seekBarTop - controlsTop);
    
    // (2) 실제 스타일에 맞추어 적용
  applyStyle(timeTooltipEl, {
    'width': `${sprite.width}px`,
    'height': `${sprite.height}px`,
    'background-image': `url(${sprite.url})`,
    'background-repeat': `no-repeat`,
    'background-position': `${columnLeft}px ${columnTop}px`,
    'background-size': `${imageWidth}px ${imageHeight}px;`,
    'top': `${topOffset}px`,

    'color': `#ffffff`,
    'text-shadow': `1px 1px #000000`,
    'border': `1px 1px #000000`,
    'margin': `0 1px`
  });
  // 기본적인 스타일 커스터마이징 지원 가능할듯
}

function applyStyle(parent: HTMLElement, obj: any) {
  const keys = Object.keys(obj);
  keys.map((key) => {
    const value = obj[key];
    const tooltipStyle = parent.style;

    if (value !== '')
      tooltipStyle.setProperty(key, value);
    else
      tooltipStyle.removeProperty(key);
  })
}

interface IIndexableComponent extends videojs.Component {
  [key: string]: any;
}

export default initializeThumbnailSprite;

// 옵션에 있어 글로벌 설정 - 필요 없을듯
  
// 한 썸네일 스프라이트에 대하여
  // url: 썸네일 스프라이트의 위치
  // start: 해당 스프라이트가 담당하는 구간의 시작점 - second?
  // duration: 해당 스프라이트가 담당하는 구간의 크기 - second? 몇분?
  // width / height: 해당 스프라이트에서 개별 프리뷰의 크기
  // interval: 각 프리뷰 간의 시간 간격 - second
    // 이에 따라 
  // 
// 현재 호버링된 시간(timestamp)을 토대로 - 예를 들어 1분 30초라고 하자
// 현재 호버링 시간이 interval 기준으로 몇번째 인덱스에 속하는지 (여러 스프라이트 존재)
  // - start를 기준으로 게산
// 그리고 현재 호버링 시간이 해당 인덱스번째 스프라이트 내에서 몇번째 인지
  // - (timestamp - start) / interval가 duration에서 몇번째인지
// 이차원 배열 느낌임

// 혹시 모르니, 옵션에 들어온 배열에 대하여 start 순으로 정렬 필요 (시간순)
