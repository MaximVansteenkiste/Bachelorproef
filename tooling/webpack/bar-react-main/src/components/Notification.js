import { useContext } from "react";
import Fade from "react-reveal/Fade";
import { MainContext } from "../App";

const Notification = ({ notification: { duration = 3000, message, type } }) => {
  const { setNotification } = useContext(MainContext);

  return (
    <div className="fixed top-5 z-50 flex justify-center w-full">
      <Fade
        top
        when={!!message}
        collapse
        duration={300}
        onReveal={() => setTimeout(() => setNotification(), duration)}
      >
        <div
          className={`text-black px-3 py-1 rounded mx-2 ${
            type === "success" ? "bg-green" : "bg-red-500"
          }`}
          onClick={() => setNotification()}
        >
          {message}
        </div>
      </Fade>
    </div>
  );
};

export default Notification;
