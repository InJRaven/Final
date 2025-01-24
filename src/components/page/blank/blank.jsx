import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const Blank = () => {
  const { language } = useContext(AppContext);

  return (
    <div className="w-full grid grid-cols-6 gap-[2rem] xs:gap-[1rem] px-[3.2rem] xs:px-[1rem] py-[2rem]">
      <div className="w-full col-start-2 col-span-4 flex flex-col gap-[2rem]"></div>
    </div>
  );
};


export default Blank