import React, { useRef } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, ArrowRight } from "../CommonSvg";
import PageNavMenu from "./PageNavMenu";

const PaginationItem = ({ icon, title, text, link, className = "" }) => {
  const router = useRouter();
  const handleBtnClick = () => {
    router.push(link);
  };

  return (
    <div
      className={`flex flex-col md:flex-row gap-4 md:gap-7 md:items-center ${className}`}
    >
      <button
        className="w-[2.8rem] h-[2.8rem] bg-button-primary-highlight rounded-lg"
        onClick={handleBtnClick}
      >
        {icon}
      </button>
      <div className="grid">
        <span className="block text-button-primary-highlight text-xl">
          {title}
        </span>
        <span className="block">{text}</span>
      </div>
    </div>
  );
};

const GettingStartedLayout = ({
  children,
  prevPageTitle = "",
  prevPageLink = "",
  nextPageTitle = "",
  nextPageLink = "",
}) => {
  const pageContentEl = useRef<HTMLDivElement>(null);
  return (
    <div className="box-border pb-16">
      <div
        className="grid
       grid-cols-[1fr_0] md:grid-cols-[1fr_13rem] lg:grid-cols-guidePageWithNav
       gap-0 md:gap-8 lg:gap-16 xl:gap-24
       grow
       mx-4 md:mx-8 lg:mx-16
       "
      >
        <div className="flex flex-col gap-[5.3rem]" ref={pageContentEl}>
          {children}
          <nav className="flex justify-between">
            <PaginationItem
              icon={<ArrowLeft />}
              title={prevPageTitle}
              link={prevPageLink}
              text="Previous"
            />
            <PaginationItem
              icon={<ArrowRight />}
              title={nextPageTitle}
              link={nextPageLink}
              text="Next"
              className="flex-row-reverse items-end"
            />
          </nav>
        </div>
        <div className="hidden md:block">
          <PageNavMenu contentElRef={pageContentEl} />
        </div>
      </div>
    </div>
  );
};
export default GettingStartedLayout;
