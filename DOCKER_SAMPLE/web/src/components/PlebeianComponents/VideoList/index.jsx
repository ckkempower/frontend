import React from "react";
import ProgressBar from "../../ProgressBar";
// styles
import "./styles.scss";

const VideoList = ({ videos }) => {
  return (
    <div className="videos">
      {videos.map((video, index) => (
        <div className="video_box" key={index}>
          <div className="vid">Video</div>
          <ProgressBar
            bgcolor="orange"
            coinsAssigned={video.coinsAssigned}
            coinsUsed={video.coinsUsed}
            height={30}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoList;
