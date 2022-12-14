import profileF from "../../../assets/icons/profile-f.png";
import userP from "../../../assets/icons/users-locations-power-a.png";
import sover from "../../../assets/icons/sovereigns-a.png";

const ProfileSection = ({ profile }) => {
  return (
    <div className="profile_section">
      <div className="pro_img">
        <img
          src={require(`../../../assets/images/${profile.profilePic}`)}
          alt="pro"
        />
      </div>
      <div className="pro_content">
        <h3>{profile.name}</h3>
        <div className="pro_sides">
          <div className="content_botom">
            <img src={sover} alt="pro" />
            <span>{profile.title} </span>
          </div>
          <div className="content_botom">
            <img src={profileF} alt="pro" />
            <span>{profile.earning} </span>
          </div>
          <div className="content_botom width_60">
            <img src={sover} alt="pro" />
            <span>{profile.address} </span>
          </div>
          <div className="content_botom width_40">
            <img src={userP} alt="pro" />
            <span>{profile.plebeianScore} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
