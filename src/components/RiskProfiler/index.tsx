import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface IData {
  paragraph1?: string;
  paragraph2?: string;
}

const RiskProfiler = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IData>({});

  const loadData = async () => {
    setLoading(true);

    try {
      const response = await axios.post(`/api/riskprofiler`);
      setData(response.data.result);
    } catch (error) {
      setData({});
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="w-full flex">
      <div className="mx-auto flex flex-col gap-10 w-full items-center">
        <div className="flex bg-foreground dark:bg-foreground-dark w-full p-[50px] pt-[100px] rounded md:flex-row flex-col">
          <div className="md:w-[50%]">
            <Image
              src="/risk_profiler.png"
              className="min-w-[90%]"
              alt="Risk Profiler"
              width={460}
              height={438}
            />
          </div>
          <div className="md:w-[50%] flex flex-col gap-10">
            <p className="text-lg leading-[38px] text-text-primary dark:text-text-primary-dark">
              Risk Profiler
            </p>
            <p className="text-base leading-[32px] text-text-primary dark:text-text-primary-dark">
              {loading ? "Loading..." : data.paragraph1}
            </p>
            <p className="text-base leading-[32px] text-text-primary dark:text-text-primary-dark">
              {loading ? "" : data.paragraph2}
            </p>
            <p className="text-base leading-[32px] text-text-secondary dark:text-text-secondary-dark">
              Become aware of market psychology by taking this questionnaire
              here:
            </p>
            <div>
              <button
                type="button"
                onClick={() => {}}
                className={`text-base leading-[24px] text-white bg-button-primary py-[12px] px-[20px] rounded-[8px] hover:bg-highlight-button-primary flex items-center justify-center gap-2 duration-300 `}
              >
                <FontAwesomeIcon icon={faCaretRight} />
                <p>Start Questionnaire</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskProfiler;
