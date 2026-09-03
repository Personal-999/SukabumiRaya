import { Component, OnInit } from "@angular/core";
import { NewsService, Article } from "../../services/news.service";

@Component({ selector: "app-news", templateUrl: "./news.component.html", styleUrls: ["./news.component.scss"] })
export class NewsComponent implements OnInit {

  searchQuery = "";
  allArticles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.allArticles = this.newsService.getAll();
  }

  get articles(): Article[] {
    let list = this.allArticles;
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getArticleUrl(id: number): string { return '/description?artId=' + id; }
  getFlagUrl(code: string) { return "https://flagcdn.com/16x12/" + (code || "xx").toLowerCase() + ".png"; }
}
