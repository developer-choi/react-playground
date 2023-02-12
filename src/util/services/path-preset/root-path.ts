import CHANNEL_PATH from '@util/services/path-preset/channel-path';
import FEED_PATH from '@util/services/path-preset/feed-path';
import BOARD_PATH from '@util/services/path-preset/board-path';

const ROOT_PATH = {
  channel: CHANNEL_PATH,
  feed: FEED_PATH,
  board: BOARD_PATH
};

export type DynamicRouteParamType = string | number;

export default ROOT_PATH;
