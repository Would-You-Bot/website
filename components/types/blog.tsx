export default interface FrontMatter {
    title: string;
    description: string;
    date: string;
    seoDate: string;
    thumbnail?: {
      large?: string;
      banner?: string;
      alt?: string;
    };
    author: {
      name: string;
      avatar: string;
    };
    tags: string[];
    pinned?: boolean;
    toc?: string[];
  }
  