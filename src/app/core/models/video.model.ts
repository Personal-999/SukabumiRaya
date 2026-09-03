// MOCK DATA — fiktif untuk demo UI, bukan data nyata.
export interface Video {
  videoId: string;               // field tambahan wajar
  title: string;
  thumbnailUrl: string;          // ditemukan: videos/maxresdefault_*, videos/1080p_app_promo
  videoUrl?: string;
  category: string;              // ditemukan: GetWttvideocategories, GetWTTVideosListByCategory
  categorySlug?: string;         // ditemukan: videos/all_videos, videos/top_videos
  duration?: string;             // field tambahan wajar
  publishedDate?: string;
  isLive?: boolean;              // ditemukan: app-live, app-stream, app-hls
}

export interface VideoCategory {
  categoryId: string;
  categoryName: string;
  slug: string;                  // ditemukan: videos/all_videos, videos/top_videos, dll
}
