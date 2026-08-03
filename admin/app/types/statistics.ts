export interface HomeStatistics {
  articles: ArticleStatistics;
  columns: number;
  friends: number;
}

interface ArticleStatistics {
  readonly publish: number;
  readonly total: number;
}
