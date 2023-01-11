import { ReactComponent as ProfileDark } from "../../../assets/icons/profile-dark.svg";
import { ReactComponent as ProfileLight } from "../../../assets/icons/profile-light.svg";
import { ReactComponent as EarnLight } from "../../../assets/icons/earn-light.svg";
import { ReactComponent as LocationsLight } from "../../../assets/icons/locations-light.svg";
import { ReactComponent as SovreignsLight } from "../../../assets/icons/sovreigns-light.svg";
import { addDetails } from "../../../redux/sharedSlices/user";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ProfileSection = ({ profile, onFollow = () => {} }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const onClickLogout = async () => {
    dispatch(addDetails({}));
    navigate("/");
  };

  return (
    <>
      <div className="logout_container form-group">
        <button className="submin_btn" onClick={() => onClickLogout()}>
          Logout
        </button>
      </div>
      <div className="profile_section">
        <div className="pro_img">
          <img src={`${profile?.account?.pfp}`} alt="pro" />
        </div>
        <div className="pro_content">
          <h3>{`${profile?.account?.firstName} ${profile?.account?.lastName}`}</h3>
          <div className="pro_sides">
            <div className="content_botom">
              <SovreignsLight />
              <span>Legionary </span>
            </div>
            <div className="content_botom width_40">
              <EarnLight />
              <span>{parseInt(profile?.account?.power)} </span>
            </div>
            <div className="content_botom width_60">
              <LocationsLight />
              <span>
                {`${profile?.account?.city}, ${profile?.account?.country}, ${profile?.account?.state}, ${profile?.account?.country}`}{" "}
              </span>
            </div>
            <div
              className={
                profile?.youFollowing
                  ? "is_follow content_botom"
                  : "content_botom"
              }
              onClick={() => onFollow()}
            >
              {profile?.youFollowing ? <ProfileDark /> : <ProfileLight />}
              <span>{profile?.account?.followerCount} </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
