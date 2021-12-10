import { CgArrowLeftO } from "react-icons/cg";
import { useHistory } from "react-router-dom";

const BackHeader = ({ title, children }) => {
  const history = useHistory();
  return (
    <div className="relative">
      <div className="flex justify-between align-middle py-5 text-xl px-1 pb-3 pt-2 sticky top-0 bg-background z-10">
        <button
          onClick={history.goBack}
          className="font-bold text-accent pr-5 z-20"
        >
          <CgArrowLeftO />
        </button>
        <div className="font-semibold text-xl text-title text-center absolute left-0 top-1 flex justify-center w-full">
          {title}
        </div>
        <div className="grid place-items-center z-20">{children}</div>
      </div>
    </div>
  );
};

export default BackHeader;
