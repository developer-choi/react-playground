import {range} from '@/utils/extend/data-type/number';

// https://github.com/developer-choi/resources/tree/master/heavy
export const RESOURCE = {
  heavy: {
    images: range(1, 36).map(value => `https://github.com/developer-choi/resources/blob/master/heavy/images/${value}.jpg?raw=true`),
    videos: range(1, 8).map(value => `https://github.com/developer-choi/resources/blob/master/heavy/videos/${value}.mp4?raw=true`),
  }
};