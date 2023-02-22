/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef, useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";

import axios from "axios";
import { NextPage } from "next";
import NewsItem from "./NewsItem";

import RadioGroup from "../MarketOverview/RadioGroup";

import { LatestNews } from "../CommonSvg";
import { IArticle } from "./types";

const kinds = [
  { value: "News", text: "News" },
  { value: "Media", text: "Media" },
];

interface INewsFeedProps {
  keyword?: string;
  newsCount?: number;
  hasMedia?: boolean;
  region?: string;
  hasImage?: boolean;
}

const NewsFeed: NextPage<INewsFeedProps> = ({
  keyword,
  newsCount,
  hasMedia,
  region,
  hasImage,
}) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [selectedKind, setSelectedKind] = useState(kinds[0]);

  const ref = useRef<HTMLDivElement>();
  const { events } = useDraggable(ref);

  const fetchNews = async (key: string, kind: string) => {
    try {
      const queryParameters: string[] = [];

      if (kind) {
        queryParameters.push(`kind=${kind}`);
      }

      if (region) {
        queryParameters.push(`region=${region}`);
      }

      let url = `/api/newsfeed/${key}`;

      if (queryParameters.length) {
        url += "?";

        const params = queryParameters.join("&");

        url += params;
      }

      const response = await axios.get(url);

      const { results } = response.data;

      setArticles(results?.slice(0, newsCount));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNews(keyword, selectedKind.value);
  }, [keyword, selectedKind]);

  return (
    <>
      {hasMedia && (
        <div>
          <RadioGroup
            options={kinds}
            selected={selectedKind}
            setSelected={setSelectedKind}
            color="secondary"
          />
        </div>
      )}

      {!hasMedia && !hasImage && (
        <h3 className="text-sm leading-7 text-text-secndary dark:text-text-secondary">
          Latest News
        </h3>
      )}

      {!hasMedia && hasImage && (
        <>
          <div className="flex text-button-primary gap-x-3 align-center">
            <div className="self-center">
              <LatestNews />
            </div>

            <h3 className="text-lg leading-7">Latest News</h3>
          </div>
          <hr className="my-4 border-border-primary" />
        </>
      )}

      {!articles?.length && (
        <p className="text-base text-text-secondary dark:text-text-secondary-dark text-center">
          No results
        </p>
      )}

      <div
        className="md:basis-0 md:grow md:max-h-full max-h-60 overflow-auto cursor-grab"
        {...events}
        ref={ref}
      >
        {articles?.map((article: IArticle, index) => (
          <div key={index}>
            {!!index && <hr className="my-4 border-border-primary" />}
            <NewsItem article={article} />
          </div>
        ))}
      </div>
    </>
  );
};

export default NewsFeed;
