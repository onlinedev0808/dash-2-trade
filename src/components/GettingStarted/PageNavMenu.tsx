import { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

interface IProps {
  contentElRef: {
    current: HTMLDivElement | null;
  };
  topPosition?: number;
}

const getPageNavData = (contentEl) => {
  const arr = [];
  const h1ElsCollection = contentEl.getElementsByTagName("h1");
  const h2ElsCollection = contentEl.getElementsByTagName("h2");
  const collections = [...h1ElsCollection, ...h2ElsCollection];

  collections
    .filter((h) => h.id)
    .forEach((h) => {
      arr.push({
        link: `#${h.id}`,
        title: h.textContent,
        el: h,
      });
    });

  return arr;
};

const PageNavMenu: NextPage<IProps> = ({ contentElRef, topPosition = 100 }) => {
  const [pageNavData, setPageNavData] = useState([]);
  const [activeEl, setActiveEl] = useState(null);

  const handleScroll = useCallback(() => {
    let nearestToTop = null;

    pageNavData.forEach((item) => {
      const top = item.el.getBoundingClientRect().top;
      if (top < topPosition) {
        nearestToTop = item.el;
      }
    });

    if (nearestToTop) {
      setActiveEl(nearestToTop);
    }
  }, [pageNavData]);

  useEffect(() => {
    if (contentElRef.current) {
      setPageNavData(getPageNavData(contentElRef.current));
    }
  }, [contentElRef.current]);

  useEffect(() => {
    if (pageNavData.length && !activeEl) {
      setActiveEl(pageNavData[0].el);
    }
  }, [pageNavData]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [handleScroll]);

  return (
    <nav className="fixed right-0 flex gap-6 w-pageNavMenu min-w-pageNavMenu h-full lg:mr-16">
      <ul>
        {pageNavData.map((section) => (
          <li
            key={section.link + section.title}
            className={`leading-[120%] flex items-center py-3.5 pl-6 border-l-2 transition ease-in duration-100
                 ${
                   activeEl === section.el
                     ? "border-text-text-primary text-text-primary dark:border-text-text-primary-dark dark:text-text-primary-dark"
                     : "border-text-secondary text-text-secondary dark:text-text-secondary-dark"
                 }`}
          >
            <Link href={section.link} scroll={false}>
              <span id={section.link}>{section.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default PageNavMenu;
