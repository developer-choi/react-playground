import CHANNEL_URLS from '@util/url-preset/channel-url';
import FEED_URLS from '@util/url-preset/feed-url';
import {WATCH_URLS} from '@util/url-preset/watch-url';

const ROOT_URLS = {
  ...CHANNEL_URLS,
  ...FEED_URLS,
  ...WATCH_URLS
};

export default ROOT_URLS;
