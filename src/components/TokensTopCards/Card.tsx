import { LineWave } from "react-loader-spinner";

function Card({ head, rows, titleFirst, isM, isLoading = false, error = "" }) {
  const result = error ? (
    <div className="flex h-full justify-center">{error}</div>
  ) : (
    <>
      {head}
      {rows}
    </>
  );

  const minW = isM ? "md:min-w-[27rem]" : "md:min-w-[30rem]";
  return (
    <div
      className={` ${minW} rounded-card lg:w-1/3
       p-5 mb-4 md:mb-0 bg-background-t-table dark:bg-foreground-highlight-dark 
       flex flex-col gap-3`}
    >
      <div className="flex justify-between">
        <div className="text-2xl mb-5">{titleFirst}</div>
      </div>
      <div>
        {isLoading ? (
          <LineWave
            color="#5367FE"
            ariaLabel="line-wave"
            wrapperStyle={{
              display: "flex",
              height: "100%",
              justifyContent: "center",
            }}
            wrapperClass=""
            visible
          />
        ) : (
          result
        )}
      </div>
    </div>
  );
}

export default Card;
