import Header from "../../components/Header";
// styles
import "./styles.scss";

// data
import { profile, likeVideos, videos, empowerers, empowering } from "./data";

// images
import PowerCoin from "../../assets/icons/power-coin.png";
import video from "../../assets/icons/videos-f.png";
import power from "../../assets/icons/videos-power-a.png";
import profileG from "../../assets/icons/profile-f.png";

import ProfileSection from "../../components/PlebeianComponents/ProfileSection";
// import StatusSection from "../../components/PlebeianComponents/StatusSection";
import EmpowerList from "../../components/PlebeianComponents/EmpowerList";
import { useEffect, useState } from "react";
import VideoList from "../../components/PlebeianComponents/VideoList";
import LikesList from "../../components/PlebeianComponents/LikesList";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../redux/sharedSlices/loader";
import LoaderSpiner from "../../components/Loader";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [showEmpowerersTab, setShowEmpowerersTab] = useState(true);

  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState({});
  const [userEmpower, setUserEmpower] = useState([]);
  const [userEmpowering, setUserEmpowerings] = useState([]);
  const [allLikedVideos, setAllLikedVideos] = useState([]);

  const [userAllVideos, setUserAllVideos] = useState([]);
  const user = useSelector((state) => state.user.value);
  const isLoading = useSelector((state) => state.loader.isLoading);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const showEmpowerers = () => setShowEmpowerersTab(true);
  const showEmpowering = () => setShowEmpowerersTab(false);

  const handleVideoClick = () => {
    getUserAllVideo();
    setActiveTab("video");
  };
  const handleLikesClick = () => {
    setActiveTab("likes");
    getAllLikedVideos();
  };
  const handleProfileClick = () => setActiveTab("profile");

  useEffect(() => {
    if (userId) {
      getUserProfile();
      getEmpowerers();
      getEmpowerings();
    }
  }, [userId]);

  const getEmpowerers = async () => {
    dispatch(startLoading());
    const resUpload = await fetch(
      `http://localhost/api/account/${userId}/followers`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      }
    );
    const json = await resUpload.json();
    setUserEmpower(json?.followers);
    dispatch(stopLoading());
  };

  const getEmpowerings = async () => {
    dispatch(startLoading());
    const resUpload = await fetch(
      `http://localhost/api/account/${userId}/followings`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      }
    );
    const json = await resUpload.json();
    setUserEmpowerings(json?.followings);
    dispatch(stopLoading());
  };

  const getUserProfile = async () => {
    dispatch(startLoading());
    const resUpload = await fetch(`http://localhost/api/account/${userId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + user?.token,
      },
    });
    const json = await resUpload.json();
    setUserProfile(json);
    dispatch(stopLoading());
  };

  const getUserAllVideo = async () => {
    dispatch(startLoading());
    const resUpload = await fetch(`http://localhost/api/video/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + user?.token,
      },
    });
    const json = await resUpload.json();
    if (json.videos) {
      setUserAllVideos(json?.videos);
    }
    dispatch(stopLoading());
  };

  const getAllLikedVideos = async () => {
    dispatch(startLoading());
    const resUpload = await fetch(
      `http://localhost/api/video/${userId}/empower`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      }
    );
    const json = await resUpload.json();
    if (json.videos) {
      setAllLikedVideos(json?.videos);
    }
    dispatch(stopLoading());
  };

  const follow = () => {
    if (userProfile?.youFollowing) {
      onUnFollow();
    } else {
      onFollow();
    }
  };

  const onFollow = async () => {
    dispatch(startLoading());
    const resUpload = await fetch(`http://localhost/api/account/follow`, {
      headers: {
        Authorization: "Bearer " + user.token,
      },
      method: "POST",
      body: JSON.stringify({
        id: userId,
      }),
    });
    const json = await resUpload.json();
    if (json?.success) {
      getUserProfile();
      getEmpowerers();
      toast(json.message, {
        type: "success",
      });
    } else {
      toast(json.message, {
        type: "error",
      });
    }
    dispatch(stopLoading());
  };

  const onUnFollow = async () => {
    dispatch(startLoading());
    const resUpload = await fetch(`http://localhost/api/account/follow`, {
      headers: {
        Authorization: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        id: userId,
      }),
    });
    const json = await resUpload.json();
    if (json?.success) {
      getUserProfile();
      getEmpowerers();
      toast(json.message, {
        type: "success",
      });
    } else {
      toast(json.message, {
        type: "error",
      });
    }
    dispatch(stopLoading());
  };

  const handleFullWatch = async (post) => {
    console.log(post, "POST");
    if (user?.token && post?.power > post?.powerTransferred) {
      const response = await fetch(
        "http://localhost/api/video/addPowerToAccount",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
          method: "POST",
          body: JSON.stringify({
            power: 1,
            videoId: post?.id,
          }),
        }
      );

      if (response.status === 200) {
        getUserAllVideo();
      }
    }
  };

  const renderTabContent = () => {
    if (activeTab === "likes") {
      return (
        <LikesList
          likeVideos={allLikedVideos}
          handleFullWatch={handleFullWatch}
        />
      );
    } else if (activeTab === "video") {
      return (
        <VideoList videos={userAllVideos} handleFullWatch={handleFullWatch} />
      );
    } else {
      return (
        <>
          <div className="empowers">
            <div className="empowers_text">
              <h4
                onClick={showEmpowerers}
                style={{ fontWeight: showEmpowerersTab ? "900" : "700" }}
              >
                {userEmpower.length} EMPOWERERS
              </h4>
              <h4
                onClick={showEmpowering}
                style={{ fontWeight: showEmpowerersTab ? "700" : "900" }}
              >
                {userEmpowering.length} EMPOWERING
              </h4>
            </div>
          </div>
          {/* <div className="searchs">
            <input type="text" placeholder="Name Search" />
          </div> */}
          <p className="power_p">
            {showEmpowerersTab ? (
              <>
                Your EMPOWERERS Provide You{" "}
                {parseFloat(userEmpower.length * 0.1).toFixed(1)}
                <img src={PowerCoin} alt="" className="power-icon" />
                Today
              </>
            ) : (
              <>
                You are providing your empowerers with a sum of{" "}
                {userEmpowering.length * 0.1}
                <img src={PowerCoin} alt="" className="power-icon" /> daily
              </>
            )}
          </p>
          {showEmpowerersTab ? (
            <EmpowerList empowerers={userEmpower} />
          ) : (
            <EmpowerList empowerers={userEmpowering} />
          )}
        </>
      );
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <LoaderSpiner />
      ) : (
        <div className="plebeain_page">
          <ProfileSection profile={userProfile} onFollow={follow} />
          {/* <StatusSection statusArray={statusArray} /> */}
          <div className="icons_section">
            <div className="icons_img">
              <img src={video} alt="video" onClick={handleVideoClick} />
              <img src={power} alt="power" onClick={handleLikesClick} />
              <img src={profileG} alt="" onClick={handleProfileClick} />
            </div>
          </div>
          {renderTabContent()}
        </div>
      )}
    </>
  );
};

export default UserProfile;
