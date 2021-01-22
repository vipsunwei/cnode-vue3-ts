export interface Tab {
  label: string;
  value: string;
}

export interface TopicsParams {
  tab: string;
  page: number;
  limit: number;
  mdrender?: string;
}

export interface Author {
  loginname: string;
  avatar_url: string;
}

export interface TopicsItem {
  id: string;
  title: string;
  content: string;
  good: boolean;
  top: boolean;
  tab: string;
  author_id: string;
  author: Author;
  last_reply_at: string;
  lastReplyAt?: string;
  create_at: string;
  createAt?: string;
  reply_count: number;
  visit_count: number;
}
