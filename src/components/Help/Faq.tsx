import { useEffect, useState } from "react";
import axios from "axios";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import Accordion from "./Accordion";
import {
  ThumbUpSvg,
  AccordianDownTriangle,
  AccordianUpTriangle,
  SearchSvg,
} from "../CommonSvg";

const FAQ = () => {
  const [cmsData, setCmsData] = useState<any>();
  const fetchData = async () => {
    const res = await axios.get("/api/cms/faq");
    setCmsData(res.data);
  };
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="lg:w-9/12 lg:mt-24 mt-12 lg:ml-20 mx-3">
      <div className="text-2xl lg:mb-16 mb-8">Frequently Asked Questions</div>
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none text-gray-500 dark:text-grey-light">
          <SearchSvg />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full bg-background-secondary-dark p-4 pl-14 text-base text-gray-900 border  rounded-lg  dark:bg-background-secondary-dark dark:border-none dark:text-white dark:placeholder-grey-light focus:outline-none"
          placeholder="Search help articles by key work/phrase..."
        />
      </div>
      {cmsData &&
        cmsData?.faqPageCollection?.items[0]?.faqSectionsCollection?.items?.map(
          (x, xIn) => (
            <Accordion
              key={xIn}
              title={x.title}
              titleClasses="text-lg font-semibold"
              childrenClasses="px-8 rounded-2xl bg-background-secondary-dark flex flex-col"
              icon={[
                <div className="w-6 h-6 rounded-full border-button-primary text-button-primary border-1 flex justify-center items-center">
                  +
                </div>,
                <div className="w-6 h-6 rounded-full border-button-primary bg-button-primary text-white border-1 flex justify-center items-center">
                  -
                </div>,
              ]}
              classes="py-5 border-b-1 border-b-cookie-consent-b"
            >
              {x?.faqItemsCollection?.items.map((y: any, yIn: number) => (
                <Accordion
                  key={yIn}
                  title={y.question}
                  titleClasses="text-larger"
                  childrenClasses="my-2 text-grey-light flex flex-col"
                  icon={[<AccordianDownTriangle />, <AccordianUpTriangle />]}
                  classes=""
                >
                  <div className="mb-8 text-grey-light text-base pr-4">
                    {documentToReactComponents(y.answer.json)}
                  </div>
                  <div className="flex gap-1 justify-start text-sm text-white">
                    <button className="border border-button-primary bg-button-primary p-3.5 rounded-md lg:w-1/3">
                      <span className="px-2 ">
                        <ThumbUpSvg />
                      </span>
                      Thanks, it was helpful
                    </button>
                    <button className="border border-button-primary p-4 rounded-md lg:w-1/3">
                      Still confused? Contact us
                    </button>
                  </div>
                </Accordion>
              ))}
            </Accordion>
          )
        )}

      <div className="my-12 w-full bg-background-secondary-dark p-12 text-center rounded-2xl">
        <div className="mb-8">
          <div className="text-xl mb-4">
            {cmsData?.faqPageCollection?.items[0]?.faqCouldntAnswer?.title}
          </div>
          <div className="text-sm text-grey-light mx-auto lg:w-1/3">
            {cmsData?.faqPageCollection?.items[0]?.faqCouldntAnswer?.body}
          </div>
        </div>
        <div className="flex gap-6 justify-center text-xs">
          <button className="border border-button-primary bg-button-primary p-4  rounded-md lg:w-1/5 w-1/2">
            Contact us
          </button>
          <button className="border border-button-primary p-4 rounded-md lg:w-1/5 w-1/2">
            Report on issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
