import Header from "../../components/Header";
// import { useForm } from "react-hook-form";
import { ReactMediaRecorder } from "react-media-recorder";
import "./styles.scss";
import { useRef, useState } from "react";
import VideoPreview from "../../components/videoPreview";

const Add = () => {
  const [recodeVideo, setRecodeVideo] = useState(false);
  const videoRefSave = useRef(null);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    let response = await fetch(videoRefSave.current);
    let data = await response.blob();
    let metadata = {
      type: "video/mp4",
    };
    let file = new File([data], "test.mp4", metadata);
  };

  return (
    <>
      <Header />
      <div className="upload_screen">
        <div className="heading">
          <h2>Upload </h2>
        </div>
        <div className="form">
          <form onSubmit={(e) => onSubmitForm(e)}>
            <div className="form-group">
              <label>Title</label>
              <input type="text" placeholder="Title" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                id="w3review"
                name="w3review"
                rows="4"
                cols="50"
              ></textarea>
            </div>
            <div className="form-group">
              <label>Upload Video</label>
              <div className="files">
                <input type="file" />
                <div className="ulpad_text">
                  <h4>Upload Video</h4>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Live Video</label>
              {recodeVideo ? (
                <div className="files">
                  <ReactMediaRecorder
                    video
                    render={({
                      status,
                      startRecording,
                      stopRecording,
                      mediaBlobUrl,
                      previewStream,
                    }) => {
                      console.log(previewStream, "previewStream", mediaBlobUrl);
                      videoRefSave.current = mediaBlobUrl;
                      return (
                        <div>
                          <p>{status}</p>
                          <button onClick={startRecording}>
                            Start Recording
                          </button>
                          <button onClick={stopRecording}>
                            Stop Recording
                          </button>
                          {previewStream?.active && (
                            <VideoPreview stream={previewStream} />
                          )}
                          {mediaBlobUrl && (
                            <video src={mediaBlobUrl} controls autoPlay loop />
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
              ) : (
                <div onClick={() => setRecodeVideo(true)} className="files">
                  <div className="ulpad_text">
                    <h4>Live Video</h4>
                  </div>
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Upload Thumbnail</label>
              <div className="files">
                <input type="file" />
                <div className="ulpad_text">
                  <h4>Upload Thumbnail</h4>
                </div>
              </div>
            </div>
            <div className="form-group cust_cls">
              <div className="total_coins">
                <label>Available Coins</label>
                <h3>$40</h3>
              </div>

              <input type="number" placeholder="Coin" />
              {/* <div className="total_coins">
                <label>Share Coin</label>
                <h3>$40</h3>
              </div> */}
            </div>

            <div className="form-group text-center">
              <button className="btn-sub">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;
