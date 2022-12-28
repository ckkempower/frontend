import { useEffect, useState } from "react";

// Library components
import { toast } from "react-toastify";
import Vimeo from "@u-wave/react-vimeo";

// Custom components
import ProgressBar from "../../components/ProgressBar";
import HomeHeader from "../../components/HomeHeader";
import LoaderSpiner from "../../components/Loader";

// Redux
import { startLoading, stopLoading } from "../../redux/sharedSlices/loader";

// library hooks
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// styles
import "./styles.scss";

// images
import PowerCoinUser from "../../assets/icons/IconUser's&LocationpowerB.png";
import PowerCoin from "../../assets/icons/power-coin.png";
import IconEmpowerersC from "../../assets/icons/IconPowerCoinF.png";
import { updateDetails } from "../../redux/sharedSlices/user";

const Earn = () => {
  const user = useSelector((state) => state.user.value);
  const isLoading = useSelector((state) => state.loader.isLoading);
  const [allPost, setAllPost] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      dispatch(startLoading());
      const resUpload = await fetch("http://localhost/api/video", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });
      const json = await resUpload.json();

      dispatch(stopLoading());
      let updatePost = [...json.videos];
      updatePost = updatePost.map((item) => {
        return { ...item, empower: 0 };
      });
      setAllPost(updatePost);
      setAllPost(updatePost);
    };
    getData();
  }, []);

  const onClickEmpower = async (post, index) => {
    if (!user?.token) {
      navigate("/login");
      return toast("You have to login to empower");
    }
    try {
      const response = await fetch(
        "http://localhost/api/video/addPowerToVideo",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
          method: "POST",
          body: JSON.stringify({
            power: 1,
            videoId: post.id,
          }),
        }
      );
      const json = await response.json();
      let updatePost = [...allPost];
      updatePost[index]["empower"] = post?.empower + 1;
      updatePost[index]["power"] = json.video.power;
      dispatch(updateDetails({ power: json.video.account.power }));
      setAllPost(updatePost);
    } catch (err) {
      console.log(err.message, "MESSAGE");
      toast("Something went wrong");
    }
  };

  const handleFullWatch = async (post, index) => {
    if (user?.token) {
      console.log("SDF", post);
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
            videoId: post.id,
          }),
        }
      );

      const json = await response.json();

      console.log(json, "REsponse");
      if (response.status === 200) {
        const newPosts = [...allPost];
        newPosts[index].powerTransferred += 1;
        setAllPost(newPosts);
        dispatch(updateDetails({ power: json.account.power }));
      }
    }
  };

  return (
    <>
      {isLoading && <LoaderSpiner />}
      <HomeHeader />
      <div className="home_page">
        {!!user?.account && (
          <p className="power_home">
            Your POWER Right Now Is
            <img src={PowerCoinUser} alt="" className="power-icon" />
            {user?.account?.power}
          </p>
        )}
        <div style={{ marginTop: !user.account ? "1rem" : "0" }}>
          {allPost?.map((post, index) => {
            return (
              <div className="full" key={index}>
                <ProgressBar
                  bgcolor="orange"
                  coinsUsed={post.powerTransferred}
                  coinsAssigned={post.power}
                  height={30}
                />
                <div className="home_profile">
                  <div className="home-img-text">
                    <div className="home-img">
                      <img
                        src={"http://localhost" + post.account.pfp}
                        alt=""
                        className="power-icon"
                      />
                    </div>
                    <div className="home-head">
                      <h2>
                        {post.account.firstName + " " + post.account.lastName}
                      </h2>
                      <div className="content_botom">
                        <img
                          src={require(`../../assets/icons/sovereigns-b.png`)}
                          alt="pro"
                        />
                        <span>Plebeian </span>
                      </div>
                    </div>
                  </div>
                  <div className="home-right">
                    <p className="power_p">
                      Earn 1{" "}
                      <img src={PowerCoin} alt="" className="power-icon" />
                      By Watching This Video
                    </p>
                  </div>
                </div>

                <div className="full-img">
                  <Vimeo
                    video={post.url}
                    className="vid_player"
                    autopause
                    onEnd={() => {
                      handleFullWatch(post, index);
                    }}
                  />
                  {/* <iframe
                      src={"https://player.vimeo.com/video/" + vimeoID}
                      width="320"
                      height="240"
                      webkitallowfullscreen
                      mozallowfullscreen
                      allowfullscreen
                    ></iframe> */}
                  <p className="power_p">{post.location}</p>
                </div>
                <div className="ul_div">
                  <ul onClick={() => onClickEmpower(post, index)}>
                    <li>
                      {" "}
                      <img src={IconEmpowerersC} alt="" />
                      <span>EMPOWER{`(${post.empower})`}</span>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Earn;
