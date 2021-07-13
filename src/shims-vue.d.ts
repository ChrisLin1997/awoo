declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface NewsListRes {
  articles: Article[];
  status: string;
  totalResults: number;
}

interface Article {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  }
  title: string;
  url: string;
  urlToImage: string;
}

interface NewsForm {
  q: string;
  from?: string;
  to?: string;
  sortBy?: string;
  page?: number;
}

