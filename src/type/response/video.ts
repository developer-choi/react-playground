// GET /video
export interface VideoResponse {
  video: Video;
}

// GET /videos
export interface VideosResponse {
  videos: Video[];
}

export interface Video {
  pk: number;
  url: string;
  thumbnail: string;
}
