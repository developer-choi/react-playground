import {urlStringify} from '@util/extend/query-string';

const CHANNEL_URLS = {

  channel: {
    id: {
      // https://www.youtube.com/channel/UCPddv7POJAl7oaZOLdLUlnA
      index: channelHome,

      /**
       * https://www.youtube.com/channel/UCPddv7POJAl7oaZOLdLUlnA/featured
       * https://www.youtube.com/channel/UCPddv7POJAl7oaZOLdLUlnA/playlists
       * https://www.youtube.com/channel/UCPddv7POJAl7oaZOLdLUlnA/channels
       * https://www.youtube.com/channel/UCPddv7POJAl7oaZOLdLUlnA/about
       */
      featured: channelSub('featured'),
      playlists: channelSub('playlists'),
      channels: channelSub('channels'),
      about: channelSub('about'),

      /**
       * https://www.youtube.com/channel/UCPddv7POJAl7oaZOLdLUlnA/videos
       * https://www.youtube.com/channel/UCPddv7POJAl7oaZOLdLUlnA/videos?view=0&sort=da&flow=grid
       */
      videos: function (channelId: string, query?: VideosQuery) {
        return `/channel/${channelId}/videos${urlStringify(query)}`;
      }
    },
  }
};

function channelHome(channelId: string) {
  return `/channel/${channelId}`;
}

function channelSub(subPath: 'featured' | 'playlists' | 'channels' | 'about') {

  return function (channelId: string) {
    return `/channel/${channelId}/${subPath}`;
  };
}

type VideosQuery = {
  sort?: 'da' | 'dd'; //da = asc, dd = desc (Youtube)
}

export default CHANNEL_URLS;
