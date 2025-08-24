import {range} from '@forworkchoe/core/utils';

// https://github.com/developer-choi/resources/tree/master/heavy
export const RESOURCE = {
  heavy: {
    images: range(1, 36).map(value => `https://github.com/developer-choi/resources/blob/master/heavy/images/${value}.jpg?raw=true`),
    videos: [2, 4, 5, 6, 7, 8].map(value => `https://github.com/developer-choi/resources/blob/master/heavy/videos/${value}.mp4?raw=true`),
  }
};