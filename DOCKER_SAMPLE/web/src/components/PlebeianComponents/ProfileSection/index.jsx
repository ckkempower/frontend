import profileF from "../../../assets/icons/profile-f.png";
import userP from "../../../assets/icons/users-locations-power-a.png";
import sover from "../../../assets/icons/sovereigns-a.png";

const ProfileSection = ({ profile, onFollow=()=>{} }) => {
  return (
    <div className="profile_section">
      <div className="pro_img">
        <img
          src={`${profile?.account?.pfp}`}
          alt="pro"
        />
      </div>
      <div className="pro_content">
        <h3>{`${profile?.account?.firstName} ${profile?.account?.lastName}`}</h3>
        <div className="pro_sides">
          <div className="content_botom">
            <img src={sover} alt="pro" />
            <span>Legionary </span>
          </div>
          <div className="content_botom">
            <img onClick={()=>onFollow()} src={profileF} alt="pro" />
            <span>{profile?.account?.followerCount} </span>
          </div>
          <div className="content_botom width_60">
            <img src={sover} alt="pro" />
            <span>{`${profile?.account?.city}, ${profile?.account?.country}, ${profile?.account?.state}, ${profile?.account?.country}`} </span>
          </div>
          <div className="content_botom width_40">
            <img src={userP} alt="pro" />
            <span>{profile?.account?.power} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
