// styles
import "./styles.scss";

// images
import PowerCoinUser from "../../assets/icons/IconUser's&LocationpowerB.png";
import ProgressBar from "../../components/ProgressBar";
import PowerCoin from "../../assets/icons/power-coin.png";
import IconEmpowerersC from "../../assets/icons/IconPowerCoinF.png";
import HomeHeader from "../../components/HomeHeader";
import { posts } from "./data";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Earn = () => {
  const user = useSelector((state) => state.user.value);
  const [allPost, setAllPost] = useState([]);


  useEffect(() => {
    const getData = async () => {
      const resUpload = await fetch("http://localhost/api/video", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });
      const json = await resUpload.json();
      console.log("JSON", json);
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
    // const post = updatePost[index];
    if(!user?.token) {
      return toast("You have to login to empower")
    }
    const response = await fetch("http://localhost/api/video/addPowerToVideo", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
      method: "POST",
      body: JSON.stringify({
        power: 1,
        videoId: post.id,
      }),
    });
    const json = await response.json();
    let updatePost = [...allPost];
    updatePost[index]["empower"] = post?.empower + 1;
    updatePost[index]["power"] = json.video.power;
    setAllPost(updatePost);
  };

  return (
    <>
      <HomeHeader />
      <div className="home_page">
        <p className="power_home">
          Your POWER Right Now Is
          <img src={PowerCoinUser} alt="" className="power-icon" />
          {user?.account?.power}
        </p>

        {allPost?.map((post, index) => {
          const vimeoID = post.url.split("/").pop();
          return (
            <div className="full" key={index}>
              <ProgressBar
                bgcolor="orange"
                coinsUsed={1}
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
                    Earn 1 <img src={PowerCoin} alt="" className="power-icon" />
                    By Watching This Video
                  </p>
                </div>
              </div>

              <div className="full-img">
                {/* <img
                  src={require(`../../assets/images/${post.postUrl}`)}
                  alt=""
                /> */}
                <iframe
                  src={"https://player.vimeo.com/video/" + vimeoID}
                  width="320"
                  height="240"
                  webkitallowfullscreen
                  mozallowfullscreen
                  allowfullscreen
                ></iframe>
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
    </>
  );
};

export default Earn;
