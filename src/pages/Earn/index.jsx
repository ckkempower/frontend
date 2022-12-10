// styles
import "./styles.scss";

// images
import PowerCoinUser from "../../assets/icons/IconUser's&LocationpowerB.png";
import ProgressBar from "../../components/ProgressBar";
import PowerCoin from "../../assets/icons/power-coin.png";
import IconEmpowerersC from "../../assets/icons/IconPowerCoinF.png";
import HomeHeader from "../../components/HomeHeader";
import { posts } from "./data";

const Earn = () => {
  return (
    <>
      <HomeHeader />
      <div className="home_page">
        <p className="power_home">
          Your POWER Right Now Is
          <img src={PowerCoinUser} alt="" className="power-icon" />
          45
        </p>

        {posts.map((post, index) => {
          return (
            <div className="full" key={index}>
              <ProgressBar
                bgcolor="orange"
                coinsUsed={post.coinsUsed}
                coinsAssigned={post.coinsAssigned}
                height={30}
              />
              <div className="home_profile">
                <div className="home-img-text">
                  <div className="home-img">
                    <img
                      src={require(`../../assets/images/${post.profilePic}`)}
                      alt=""
                      className="power-icon"
                    />
                  </div>
                  <div className="home-head">
                    <h2>{post.name}</h2>
                    <div className="content_botom">
                      <img
                        src={require(`../../assets/icons/${post.levelIcon}`)}
                        alt="pro"
                      />
                      <span>{post.level} </span>
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
                <img
                  src={require(`../../assets/images/${post.postUrl}`)}
                  alt=""
                />
                <p className="power_p">{post.location}</p>
              </div>
              <div className="ul_div">
                <ul>
                  <li>
                    {" "}
                    <img src={IconEmpowerersC} alt="" />
                    <span>EMPOWER</span>
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
