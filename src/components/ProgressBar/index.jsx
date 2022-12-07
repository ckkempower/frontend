import "./style.scss";

import PowerCoinUserwhite from "../../assets/icons/IconvideopowerC.png";

const ProgressBar = ({ bgcolor, progress, height }) => {
  return (
    <div style={{ height }} className="progress-parent">
      <div
        style={{ width: `${progress}%`, backgroundColor: bgcolor }}
        className="child"
      >
        <span className="text">
          {" "}
          <img src={PowerCoinUserwhite} alt="" className="power-icons" />{" "}
          {`${progress}`}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
