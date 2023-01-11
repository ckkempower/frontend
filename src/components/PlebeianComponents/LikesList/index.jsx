import empowerIcon from "../../../assets/icons/empowerers-a.png";

import ReactModal from "react-modal";
import Vimeo from "@u-wave/react-vimeo";
import React, { useState } from "react";

// styles
import "./styles.scss";

const LikesList = ({ likeVideos }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});

  const openModal = (video) => {
    setShowModal(true);
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo({});
  };
  return (
    <div className="videos">
      {likeVideos.map((video, index) => (
        <div className="video_box" key={index}>
          <div className="vid" onClick={() => openModal(video)}>
            {video.thumbnail ? (
              <img src={"http://localhost" + video.thumbnail} alt="thumbnail" />
            ) : (
              "Video"
            )}
          </div>
          <div className="img_text-video">
            <img src={empowerIcon} alt="" />
            <span>{video?.powerTranferred}</span>
          </div>
        </div>
      ))}

      <ReactModal isOpen={showModal}>
        <Vimeo
          video={selectedVideo?.url}
          className="vid_player vid-modal"
          autopause
          width={300}
          height={200}
        />
        <button onClick={handleCloseModal}>Close Modal</button>
      </ReactModal>
    </div>
  );
};

export default LikesList;
