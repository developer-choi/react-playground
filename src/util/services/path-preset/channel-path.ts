import {urlStringify} from '@util/extend/browser/query-string';

const upperPath = '/channel';

const CHANNEL_PATH = {
  channelId: {
    // /channel/UCPddv7POJAl7oaZOLdLUlnA
    index: (channelId: string) => upperPath + `/${channelId}`,

    /**
     * /channel/UCPddv7POJAl7oaZOLdLUlnA/featured
     * /channel/UCPddv7POJAl7oaZOLdLUlnA/playlists
     * /channel/UCPddv7POJAl7oaZOLdLUlnA/channels
     * /channel/UCPddv7POJAl7oaZOLdLUlnA/about
     */
    featured: (channelId: string) => upperPath + `/${channelId}/featured`,
    playlists: (channelId: string) => upperPath + `/${channelId}/playlists`,
    channels: (channelId: string) => upperPath + `/${channelId}/channels`,
    about: (channelId: string) => upperPath + `/${channelId}/about`,

    /**
     * /channel/UCPddv7POJAl7oaZOLdLUlnA/videos
     * /channel/UCPddv7POJAl7oaZOLdLUlnA/videos?view=0&sort=da&flow=grid
     */
    videos: (channelId: string, query?: VideosQuery) => upperPath + `/${channelId}/videos${urlStringify(query)}`
  },
};

type VideosQuery = {
  sort?: 'da' | 'dd'; //da = asc, dd = desc (Youtube)
}

export default CHANNEL_PATH;
