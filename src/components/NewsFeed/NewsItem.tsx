import Link from "next/link";
import { IArticle } from "./types";
import { timeSince } from "../../utils";

const NewsItem = ({ article }: { article: IArticle }) => {
  // const urlParts = article.url.split("/");
  const url =
    article.kind === "media"
      ? `https://www.youtube.com/results?search_query=${
          article.title.replaceAll(" ", "+") // urlParts[urlParts.length - 1]
        }`
      : `https://${article.domain}`;

  return (
    <Link href={url} className="" passHref>
      <a target="_blank" className="text-left flex w-full ">
        <div
          className={`${
            article.metadata?.image ? "w-4/5" : "w-full"
          } flex flex-col grow justify-between`}
        >
          <div className="p-2 text-base text-text-primary dark:text-text-primary-dark">
            {article.title}
          </div>
          <div className="px-2 text-text-secondary dark:text-text-secondary-dark">
            <span className="mr-1.5 pr-3 text-xs inline-block border-r-solid border-r-1 border-r-border-primary">
              by {article.source.title}
            </span>
            <span>
              <span className="ml-1.5 text-xs">
                {timeSince(article.created_at)} ago
              </span>
            </span>
          </div>
        </div>

        <div
          className={`${
            article.metadata?.image
              ? "w-1/5 max-w-[120px] min-w-[100px] mr-3"
              : "w-0"
          }`}
        >
          {article.metadata?.image && (
            <img src={article.metadata?.image} alt="Article" />
          )}
        </div>
      </a>
    </Link>
  );
};

export default NewsItem;
