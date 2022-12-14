import "./style.scss";

import PowerCoinUserwhite from "../../assets/icons/IconvideopowerC.png";

const ProgressBar = ({ bgcolor, coinsAssigned, coinsUsed, height }) => {
  return (
    <div style={{ height }} className="progress-parent">
      <div
        style={{
          width: `${(coinsUsed * 100) / coinsAssigned}%`,
          backgroundColor: bgcolor,
        }}
        className="child"
      >
        <span className="text">
          {" "}
          <img src={PowerCoinUserwhite} alt="" className="power-icons" />{" "}
          {`${coinsUsed}/${coinsAssigned}`}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
