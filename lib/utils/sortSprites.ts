import TS from '../index';

function sortSprites(sprites: Array<TS.Sprite>): void{
  sprites.sort((e1, e2): number => {
    if (e1.start < e2.start)
      return -1;
    else if (e1.start === e2.start)
      return 0;
    else
      return 1;
  });
}

export default sortSprites;
