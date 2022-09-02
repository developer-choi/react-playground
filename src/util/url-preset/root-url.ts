import CHANNEL_URLS from '@util/url-preset/channel-url';
import FEED_URLS from '@util/url-preset/feed-url';
import BOARD_URLS from '@util/url-preset/board-url';

const ROOT_URLS = {
  channel: CHANNEL_URLS,
  feed: FEED_URLS,
  board: BOARD_URLS
};

export type DynamicRouteType = string | number;

export default ROOT_URLS;
