// MOCK DATA — fiktif untuk demo UI, bukan data nyata.
export interface News {
  articleId: string;             // field tambahan wajar
  title: string;                 // ditemukan: .news_title_holder h1
  summary?: string;
  content?: string;              // ditemukan: .news_description_holder
  imageUrl?: string;             // ditemukan: .front_carousel_image
  publishedDate: string;
  category?: string;             // ditemukan: GetArticleDetailsBy_categories
  isFeatured?: boolean;          // ditemukan: GetLatestArticlesIsFeatured
  relatedPlayers?: string[];     // ditemukan: GetPlayersArticles, GetNonFeaturedArticlePlayers
}
