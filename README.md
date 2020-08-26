# videojs-thumbnail-sprite

[![https://nodei.co/npm/videojs-thumbnail-sprite.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/videojs-thumbnail-sprite.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/videojs-thumbnail-sprite)

[![Build Status](https://travis-ci.com/cadenzah/videojs-thumbnail-sprite.svg?branch=master)](https://travis-ci.com/cadenzah/videojs-thumbnail-sprite)
[![codecov](https://codecov.io/gh/cadenzah/videojs-thumbnail-sprite/branch/master/graph/badge.svg)](https://codecov.io/gh/cadenzah/videojs-thumbnail-sprite)

Video.js plugin to display preview image of a video at the point of time when hovering on progress bar

## Table of Contents
- Features
- Install
  - Prerequisite
- Usage
  - `<script>`
  - ES6 Module
  - Options
  - Rules to follow
- Contribution
- License

## Features
- Easy to use
  - From a sprite image extract multiple preview thumbnails and simply display them
- Easy to configure
- Typescript support
- Support using multiple sprite images for each sections of video

## Install
```bash
# using npm
npm install --save videojs-thumbnail-sprite
# using yarn
yarn add videojs-thumbnail-sprite
```

### Prerequisite
`videojs-thumbnail-sprite` uses Video.js as peer dependencies. To use this module, you should manually install those dependencies in your project.

## Usage

### `<script>`
Just load the module as you want, but **you should load `video.js` module first**, so that the plugin can access previously instantiated global `videojs` module reference.

```html
<script src="//path/to/video.js"></script>
<script src="//path/to/videojs-thumbnail-sprite.js"></script>
<script>
  var player = videojs('video-id');

  player.thumbnailSprite({
    sprites: [
      {
        url: 'https://example.com/video.png',
        start: 0,
        duration: 10,
        interval: 2,
        width: 160,
        height: 90,
      },
    ],
  });
</script>
```

### ES6 Module
Simple as previous usage. Just import the module as you want, but **you should load `video.js` module first**, so that the plugin can access previously instantiated global `videojs` module reference. Also, **you should import `video.js` module as a name of `videojs`, as the plugin will assume the name of imported `video.js` module as `videojs`.

```js
import videojs from 'video.js';
import 'videojs-thumbnail-sprite';

const player = videojs('video-id');
player.thumbnailSprite({
  sprites: [
    {
      url: 'https://example.com/video.png',
      start: 0,
      duration: 10,
      interval: 2,
      width: 160,
      height: 90,
    },
  ],
});
```

### Options
There is only single property provided currently: `sprites`

```js
const options = {
  sprites: [
    {
      url: 'https://example.com/video-1.png',
      start: 0,
      duration: 10,
      interval: 2,
      width: 160,
      height: 90,
    },
    {
      url: 'https://example.com/video-2.png',
      start: 10,
      duration: 20,
      interval: 2,
      width: 160,
      height: 90,
    },
  ]
}
```

|Option name|Datatype|Default value|Description|
|--------|------------|----|----|
|`url`|`string`|`''`|URL of thumbnail sprite image
|`start`|`number`|`0`|Start point of time of the video section that this sprite image is covering
|`duration`|`number`|`0`|Duration of the video section that this sprite image is covering
|`width`|`number`|`0`|Width of preview thumbnail (`px`)
|`height`|`number`|`0`|Height of preview thumbnail (`px`)
|`interval`|`number`|`0`|Interval between each preview thumbnails of the video section that this sprite image is covering

You can use multiple sprite images in case that preview thumbnails for entire video is divided into several chunks. Just pass them as array of sprites, and the module will handle it on behalf of you.

### Rules to follow
To make things happen preperly, there are some rules to follow:

1. **Each `duration` of video sections should not overlap each other.** For example, if your first sprite image covers [0:00 ~ 10:00] and your second sprite image covers [5:00 ~ 15:00], then there is an overlap between them([5:00 ~ 10:00]). The module will emit warning on browser console if it catches any overlaps.
2. **`width` and `height` should be provided for each sprites.** If not, even if the images are loaded those will not be displayed as expected.
3. **`duration` should be multiple of `interval`.** From `start` point of time, at every `interval` seconds, the preview thumbnail will be displayed, so to display corresponding preview with hovering time correctly, follow this rule.

## Contribution
Fork the repository, make changes, commit your work, and make Pull Request.

## License
[MIT Lisence](https://github.com/cadenzah/videojs-thumbnail-sprite/blob/master/LICENSE)
