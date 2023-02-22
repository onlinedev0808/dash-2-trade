import Link from "next/link";
import { NextPage } from "next";
import { timeSince } from "../../utils";
import { IMediumPost } from "./types";

interface IProps {
  post: IMediumPost;
}

const MediumItem: NextPage<IProps> = ({ post }) => (
  <Link href={post.link || ""} passHref>
    <a target="_blank" className="text-left flex w-full ">
      <div className="w-full flex flex-col grow justify-between">
        <div className="p-2 text-base text-text-primary dark:text-text-primary-dark">
          {post.title}
        </div>
        <div className="px-2 text-text-secondary dark:text-text-secondary-dark">
          <span className="mr-1.5 pr-3 text-xs inline-block border-r-solid border-r-1 border-r-border-primary">
            by {post.author}
          </span>
          <span>
            <span className="ml-1.5 text-xs">
              {timeSince(post.date_updated)} ago
            </span>
          </span>
        </div>
      </div>
    </a>
  </Link>
);

export default MediumItem;
