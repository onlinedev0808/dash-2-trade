export interface ITwitterPost {
  cc_id: number;
  tweet_id: number;
  url: string;
  tweet_date: string;
  content: string;
  rendered_content: string;
  reply_count: number;
  retweet_count: number;
  like_count: number;
  quote_count: number;
  lang: string;
  author: {
    id: number;
    created: string;
    username: string;
    verified: false;
    image_url: string;
    description: string;
    displayname: string;
  };
  media: TwitterMedia[];
  outlinks: string;
  hashtags: string;
  cashtags: string;
  date_added: string;
}

type TwitterMedia = {
  fullUrl: string;
  previewUrl: string;
};

export interface IMediumPost {
  cc_id: number;
  title: string;
  link: string;
  tags: string[];
  author: string;
  date_created: string;
  date_updated: string;
  content: string;
}

export enum SocialsEnum {
  Twitter = "twitter",
  Medium = "medium",
}
