import Link from "next/link";
import { NextPage } from "next";
import { timeSince } from "../../utils";
import { ITwitterPost } from "./types";

interface IProps {
  post: ITwitterPost;
}

const TwitterItem: NextPage<IProps> = ({ post }) => (
  <Link href={post.url || ""} passHref>
    <a target="_blank" className="text-left flex w-full ">
      <div className="w-full flex flex-col grow justify-between">
        <div className="p-2 text-base text-text-primary dark:text-text-primary-dark">
          {post.content}
        </div>
        <div className="px-2 text-text-secondary dark:text-text-secondary-dark">
          <span className="mr-1.5 pr-3 text-xs inline-block border-r-solid border-r-1 border-r-border-primary">
            by {post.author.displayname}
          </span>
          <span>
            <span className="ml-1.5 text-xs">
              {timeSince(post.date_added)} ago
            </span>
          </span>
        </div>
      </div>
      {post.media?.[0].previewUrl && (
        <div className="w-1/5 max-w-[120px] min-w-[100px] mr-3">
          <img src={post.media[0].previewUrl} alt="Article" />
        </div>
      )}
    </a>
  </Link>
);

export default TwitterItem;
