import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoService, Video, VIDEO_CATEGORIES } from '../../services/video.service';

@Component({ selector: 'app-videos', templateUrl: './videos.component.html', styleUrls: ['./videos.component.scss'] })
export class VideosComponent implements OnInit {

  searchQuery = '';
  viewMode: 'all' | 'category' = 'all';
  categoryId = 0;
  categoryName = '';

  allVideos: Video[] = [];
  categories = VIDEO_CATEGORIES;

  // Modal state
  modalOpen = false;
  activeVideo: Video | null = null;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    this.allVideos = this.videoService.getAll();
    // Detect mode from URL
    const url = this.router.url;
    const match = url.match(/videosbycategory\/(\d+)/);
    if (match) {
      this.viewMode = 'category';
      this.categoryId = parseInt(match[1], 10);
      const cat = VIDEO_CATEGORIES.find(c => c.id === this.categoryId);
      this.categoryName = cat ? cat.name : 'VIDEOS';
    }
  }

  // ===== CATEGORY VIEW =====
  get categoryVideos(): Video[] {
    let list = this.videoService.getByCategory(this.categoryId);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(v => v.title.toLowerCase().includes(q));
    }
    return list;
  }

  getCategoryUrl(categoryId: number): string {
    return '/videosbycategory/' + categoryId;
  }

  // ===== ALL VIEW (headervideo) =====
  getVideosByCategory(categoryId: number): Video[] {
    let list = this.allVideos.filter(v => v.categoryId === categoryId);
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(v => v.title.toLowerCase().includes(q));
    }
    return list;
  }

  get compilations()     { return this.getVideosByCategory(22); }
  get matchHighlights()  { return this.getVideosByCategory(23); }
  get playerFeatures()   { return this.getVideosByCategory(24); }

  get hasAnyResults() {
    return this.compilations.length > 0 || this.matchHighlights.length > 0 || this.playerFeatures.length > 0;
  }

  scrollRow(id: string, dir: number) {
    const el = document.getElementById('row-' + id);
    if (el) { el.scrollBy({ left: dir * 381, behavior: 'smooth' }); }
  }

  // ===== YOUTUBE MODAL =====
  openVideo(video: Video) {
    this.activeVideo = video;
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modalOpen = false;
    this.activeVideo = null;
    document.body.style.overflow = '';
  }

  getEmbedUrl(): SafeResourceUrl {
    if (!this.activeVideo || !this.activeVideo.youtubeId) { return ''; }
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + this.activeVideo.youtubeId + '?autoplay=1&rel=0'
    );
  }

  getThumb(video: Video): string {
    if (video.thumb) { return video.thumb; }
    if (video.youtubeId) { return 'https://img.youtube.com/vi/' + video.youtubeId + '/hqdefault.jpg'; }
    return 'assets/images/STT V1.png';
  }
}
