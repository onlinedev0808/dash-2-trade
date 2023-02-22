import { QuantfinityLogo } from "../CommonSvg";

const ComingSoonModal = ({ isOpen }) => (
  <div
    className={`fixed top-0 left-0 w-[100%] h-[100%] z-10 bg-black/50 backdrop-blur-sm ${
      isOpen ? "flex" : "hidden"
    }`}
  >
    <div className="bg-background dark:bg-background-dark rounded-xl my-auto mx-auto text-text-primary dark:text-text-primary-dark flex flex-col border-1 border-border-primary dark:border-white border-opacity-10 items-center">
      <div className="h-16 w-48 mx-24">
        <QuantfinityLogo />
      </div>

      <div className="flex flex-row w-64 justify-center items-center mx-auto m-7 text-text-primary dark:text-text-primary-dark">
        <hr className="w-full border-border-primary border-1 dark:border-white border-opacity-10" />
        <div className="mx-2 text-lg shrink-0">Coming Soon...</div>
        <hr className="w-full border-border-primary dark:border-white border-1 border-opacity-10" />
      </div>
      {/* <div className='flex m-4 justify-center'> */}
      {/*    <Link href="/"> */}
      {/*        <span className="flex align-middle hover:cursor-pointer hover:bg-slate-700 rounded-lg"> */}
      {/*            <span className="m-3 text-lg text-[#40D329]">Go Home</span> */}
      {/*        </span> */}
      {/*    </Link> */}
      {/* </div> */}
    </div>
  </div>
);

export default ComingSoonModal;
