import empowerIcon from "../../../assets/icons/empowerers-a.png";

// styles
import "./styles.scss";

const LikesList = ({ likeVideos }) => {
  return (
    <div className="videos">
      {likeVideos.map((video, index) => (
        <div className="video_box" key={index}>
          <div className="vid">Video</div>
          <div className="img_text-video">
            <img src={empowerIcon} alt="" />
            <span>{video.coins}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikesList;
