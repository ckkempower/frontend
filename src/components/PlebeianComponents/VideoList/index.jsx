import ReactModal from "react-modal";
import Vimeo from "@u-wave/react-vimeo";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoaderSpiner from "../../Loader";
import ProgressBar from "../../ProgressBar";
// styles
import "./styles.scss";

const VideoList = ({ videos, handleFullWatch = () => {} }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});
  const isLoading = useSelector((state) => state.loader.isLoading);

  const openModal = (video) => {
    setShowModal(true);
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo({});
  };

  return (
    <>
      {isLoading && <LoaderSpiner />}
      <div className="videos">
        {videos.map((video, index) => (
          <div className="video_box" key={index}>
            <div className="vid" onClick={() => openModal(video)}>
              {video.thumbnail ? (
                <img
                  src={"http://localhost" + video.thumbnail}
                  alt="thumbnail"
                />
              ) : (
                "Video"
              )}
            </div>
            {/* <video src={video?.url} /> */}
            {/* <Vimeo
            video={video?.url}
            className="vid_player"
            autopause
            width={300}
            height={200}
          /> */}
            <ProgressBar
              bgcolor="orange"
              coinsAssigned={video.power}
              coinsUsed={video.powerTransferred}
              height={30}
            />
          </div>
        ))}
      </div>
      <ReactModal isOpen={showModal}>
        <Vimeo
          video={selectedVideo?.url}
          className="vid_player vid-modal"
          autopause
          onEnd={() => {
            handleFullWatch(selectedVideo);
          }}
          width={300}
          height={200}
        />
        <button onClick={handleCloseModal}>Close</button>
      </ReactModal>
    </>
  );
};

export default VideoList;
