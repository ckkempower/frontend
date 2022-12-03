// styles
import "./styles.scss";

// data
import { profile, statusArray, empowerers } from "./data";

// images
import PowerCoin from "../../assets/icons/power-coin.png";
import video from "../../assets/icons/videos-f.png";
import power from "../../assets/icons/videos-power-a.png";
import profileG from "../../assets/icons/profile-f.png";
import ProfileSection from "../../components/PlebeianComponents/ProfileSection";
import StatusSection from "../../components/PlebeianComponents/StatusSection";
import EmpowerList from "../../components/PlebeianComponents/EmpowerList";

const Plebeian = () => {
  return (
    <div className="plebeain_page">
      <ProfileSection profile={profile} />
      <StatusSection statusArray={statusArray} />
      <div className="icons_section">
        <div className="icons_img">
          <img src={video} alt="video" />
          <img src={power} alt="power" />
          <img src={profileG} alt="" />
        </div>
      </div>
      <div className="empowers">
        <div className="empowers_text">
          <h4>
            <strong>{empowerers.length} EMPOWERERS</strong>
          </h4>
          <h4>11 EMPOWERING</h4>
        </div>
      </div>
      <div className="searchs">
        <input type="text" placeholder="Name Search" />
      </div>
      <p className="power_p">
        Your EMPOWERERS Provide You 1.1{" "}
        <img src={PowerCoin} alt="" className="power-icon" />
        Today
      </p>

      <EmpowerList empowerers={empowerers} />
    </div>
  );
};

export default Plebeian;
