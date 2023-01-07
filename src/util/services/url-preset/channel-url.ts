import {urlStringify} from '@util/extend/browser/query-string';

const CHANNEL_URLS = {
  id: {
    // /channel/UCPddv7POJAl7oaZOLdLUlnA
    index: (channelId: string) => `/channel/${channelId}`,

    /**
     * /channel/UCPddv7POJAl7oaZOLdLUlnA/featured
     * /channel/UCPddv7POJAl7oaZOLdLUlnA/playlists
     * /channel/UCPddv7POJAl7oaZOLdLUlnA/channels
     * /channel/UCPddv7POJAl7oaZOLdLUlnA/about
     */
    featured: (channelId: string) => `/channel/${channelId}/featured`,
    playlists: (channelId: string) => `/channel/${channelId}/playlists`,
    channels: (channelId: string) => `/channel/${channelId}/channels`,
    about: (channelId: string) => `/channel/${channelId}/about`,

    /**
     * /channel/UCPddv7POJAl7oaZOLdLUlnA/videos
     * /channel/UCPddv7POJAl7oaZOLdLUlnA/videos?view=0&sort=da&flow=grid
     */
    videos: (channelId: string, query?: VideosQuery) => `/channel/${channelId}/videos${urlStringify(query)}`
  },
};

type VideosQuery = {
  sort?: 'da' | 'dd'; //da = asc, dd = desc (Youtube)
}

export default CHANNEL_URLS;
