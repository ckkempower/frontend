import Header from "../../components/Header";
// styles
import "./styles.scss";

// data
import { profile, statusArray, empowerers, empowering } from "./data";

// images
import PowerCoin from "../../assets/icons/power-coin.png";
import video from "../../assets/icons/videos-f.png";
import power from "../../assets/icons/videos-power-a.png";
import profileG from "../../assets/icons/profile-f.png";
import ProfileSection from "../../components/PlebeianComponents/ProfileSection";
import StatusSection from "../../components/PlebeianComponents/StatusSection";
import EmpowerList from "../../components/PlebeianComponents/EmpowerList";
import { useState } from "react";

const Plebeian = () => {
  const [showEmpowerersTab, setShowEmpowerersTab] = useState(true);

  const showEmpowerers = () => setShowEmpowerersTab(true);
  const showEmpowering = () => setShowEmpowerersTab(false);

  return (
    <>
      <Header />
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
            <h4
              onClick={showEmpowerers}
              style={{ fontWeight: showEmpowerersTab ? "900" : "700" }}
            >
              {empowerers.length} EMPOWERERS
            </h4>
            <h4
              onClick={showEmpowering}
              style={{ fontWeight: showEmpowerersTab ? "700" : "900" }}
            >
              {empowering.length} EMPOWERING
            </h4>
          </div>
        </div>
        <div className="searchs">
          <input type="text" placeholder="Name Search" />
        </div>
        <p className="power_p">
          {showEmpowerersTab ? (
            <>
              Your EMPOWERERS Provide You{" "}
              {parseFloat(empowerers.length * 0.1).toFixed(1)}
              <img src={PowerCoin} alt="" className="power-icon" />
              Today
            </>
          ) : (
            <>
              You are providing your empowerers with a sum of{" "}
              {empowering.length * 0.1}
              <img src={PowerCoin} alt="" className="power-icon" /> daily
            </>
          )}
        </p>

        {showEmpowerersTab ? (
          <EmpowerList empowerers={empowerers} />
        ) : (
          <EmpowerList empowerers={empowering} />
        )}
      </div>
    </>
  );
};

export default Plebeian;
