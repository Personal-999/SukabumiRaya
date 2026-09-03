import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService, Article } from '../../services/news.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {

  article: Article | undefined;
  relatedArticles: Article[] = [];
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const artId = parseInt(params['artId'], 10);
      this.article = this.newsService.getById(artId);
      if (!this.article) {
        this.notFound = true;
        return;
      }
      // Related articles: same category, exclude current
      const all = this.newsService.getAll();
      this.relatedArticles = all
        .filter(a => a.id !== artId && a.category === this.article!.category)
        .slice(0, 4);
      if (this.relatedArticles.length < 2) {
        this.relatedArticles = all.filter(a => a.id !== artId).slice(0, 4);
      }
    });
  }

  getFlagUrl(code: string): string {
    return 'https://flagcdn.com/16x12/' + (code || 'xx').toLowerCase() + '.png';
  }

  goBack() { window.close(); }
}
