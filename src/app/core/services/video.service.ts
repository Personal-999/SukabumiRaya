import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Video, VideoCategory } from '../models/video.model';

@Injectable({ providedIn: 'root' })
export class VideoService {
  // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
  private mockCategories: VideoCategory[] = [
    { categoryId: 'cat1', categoryName: 'All Videos', slug: 'all_videos' },
    { categoryId: 'cat2', categoryName: 'Top Videos', slug: 'top_videos' },
    { categoryId: 'cat3', categoryName: 'Highlights', slug: '2022' },
  ];

  private mockVideos: Video[] = [
    { videoId: 'v001', title: 'Fan Zhendong vs Ma Long - WTT Grand Smash Final Highlights', thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', category: 'Highlights', categorySlug: '2022', isLive: false },
    { videoId: 'v002', title: 'WTT Singapore Smash 2023 - Best Rallies', thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', category: 'Top Videos', categorySlug: 'top_videos', isLive: false },
    { videoId: 'v003', title: 'Chen Meng Training Session', thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', category: 'All Videos', categorySlug: 'all_videos', isLive: false },
  ];

  // Mengikuti pola endpoint: cms/GetWttvideocategories
  getVideoCategories(): Observable<VideoCategory[]> {
    return of(this.mockCategories);
  }

  // Mengikuti pola endpoint: cms/GetWTTVideosListByCategory
  getVideosByCategory(categorySlug: string): Observable<Video[]> {
    return of(this.mockVideos.filter(v => v.categorySlug === categorySlug || categorySlug === 'all_videos'));
  }

  // Mengikuti pola endpoint: cms/GetWTTVideosListByDefaultCategory
  getDefaultVideos(): Observable<Video[]> {
    return of(this.mockVideos);
  }
}
