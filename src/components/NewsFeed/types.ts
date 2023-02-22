export interface IArticle {
  title: string;
  created_at: Date;
  kind: "media" | "news";
  urlToImage: string;
  url: string;
  content: string;
  author: string;
  source: IArticleSource;
  id: string;
  metadata: {
    image?: string;
  };
  domain?: string;
}

interface IArticleSource {
  title: string;
}
