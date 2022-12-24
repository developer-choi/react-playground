// GET /video
export interface VideoResponse {
  video: Video;
}

// GET /video/list
export interface VideoListResponse {
  list: Video[];
}

export interface Video {
  pk: number;
  url: string;
  thumbnail: string;
}
