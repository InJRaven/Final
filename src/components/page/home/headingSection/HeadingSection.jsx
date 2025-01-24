import { Number8BiaIcon } from "../../../ui/Icon/Icon";

const HeadingSection = ({ title }) => {
  return (
    <div className="w-full px-[16rem] xs:px-[5rem] py-[1rem] flex flex-col items-stretch gap-[0.5rem] bg-gray-300">
      <h3 className="w-full text-dark text-md xs:text-sm font-semibold text-center">
        DARIUS PHAN
      </h3>
      <h1 className="text-display-sm xs:text-display-xs text-dark text-center font-bold uppercase">
        {title}
      </h1>
      <div className="w-full flex items-center justify-center gap-[0.8rem]">
        <span className="w-full h-[0.5px] bg-dark flex-1"></span>
        <span className="">
          <Number8BiaIcon className={'xs:h-[2rem] w-[2rem]'} />
        </span>
        <span className="w-full h-[0.5px] bg-dark flex-1"></span>
      </div>
    </div>
  );
};

export default HeadingSection;
