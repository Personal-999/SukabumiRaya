import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { News } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class NewsService {
  // MOCK DATA — fiktif untuk demo UI, bukan data nyata.
  private mockNews: News[] = [
    { articleId: 'n001', title: 'Fan Zhendong Claims WTT Grand Smash Title', summary: 'China top seed dominates final against Ma Long in epic 7-game battle.', imageUrl: 'https://wttnewtest.blob.core.windows.net/websitefiles/images/general/signup_banner.png', publishedDate: '2023-03-15', category: 'Results', isFeatured: true },
    { articleId: 'n002', title: 'Singapore Smash 2023: Full Draw Released', summary: 'All brackets announced for the prestigious Grand Smash event in Singapore.', imageUrl: 'https://wttnewtest.blob.core.windows.net/websitefiles/images/general/signup_banner.png', publishedDate: '2023-03-01', category: 'Events', isFeatured: true },
    { articleId: 'n003', title: 'Chen Meng Defends World Ranking Title', summary: 'Women\'s top seed extends unbeaten streak at WTT Champions Frankfurt.', imageUrl: 'https://wttnewtest.blob.core.windows.net/websitefiles/images/general/signup_banner.png', publishedDate: '2023-07-22', category: 'Rankings', isFeatured: false },
    { articleId: 'n004', title: 'Hugo Calderano Makes History for Brazil', summary: 'First Brazilian to reach WTT Grand Smash semifinal stage.', imageUrl: 'https://wttnewtest.blob.core.windows.net/websitefiles/images/general/signup_banner.png', publishedDate: '2023-03-14', category: 'Players', isFeatured: false },
  ];

  // Mengikuti pola endpoint: cms/GetLatestArticle
  getLatestArticles(): Observable<News[]> {
    return of(this.mockNews);
  }

  // Mengikuti pola endpoint: cms/GetLatestArticlesIsFeatured
  getFeaturedArticles(): Observable<News[]> {
    return of(this.mockNews.filter(n => n.isFeatured));
  }

  // Mengikuti pola endpoint: cms/GetArticleDetailsByID
  getArticleById(articleId: string): Observable<News> {
    return of(this.mockNews[0]);
  }

  // Mengikuti pola endpoint: cms/GetArticleDetailsBy_categories
  getArticlesByCategory(category: string): Observable<News[]> {
    return of(this.mockNews.filter(n => n.category === category));
  }

  // Mengikuti pola endpoint: cms/GetTopStoriesArticles
  getTopStories(): Observable<News[]> {
    return of(this.mockNews.slice(0, 3));
  }
}
