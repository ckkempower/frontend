import { useRef, useState } from "react";

// Library components
import { ReactMediaRecorder } from "react-media-recorder";
import * as yup from "yup";
import { toast } from "react-toastify";

// Library hooks
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// custom components
import Header from "../../components/Header";
import VideoPreview from "../../components/videoPreview";
import LoaderSpiner from "../../components/Loader";

// Custom Hooks
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";

// Redux
import { updateDetails } from "../../redux/sharedSlices/user";
import { startLoading, stopLoading } from "../../redux/sharedSlices/loader";

// Styles
import "./styles.scss";

// assets
import powerCoin from "../../assets/icons/power-coin.png";
import arrow from "../../assets/images/arrow.png";

export const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const Add = () => {
  const user = useSelector((state) => state.user.value);
  const videoRefSave = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnaiFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [recordingStarted, setRecordingStarted] = useState(null);
  const [availableCoin, setAvailableCoin] = useState(user.account.power);
  const [empowerCoin, setEmpowerCoin] = useState(0);
  const [assignedCoins, setAssignedCoins] = useState(1);
  const [assignedCoinsError, setAssignedCoinsError] = useState("");

  const isLoading = useSelector((state) => state.loader.isLoading);

  const validationResolver = useYupValidationResolver(schema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: validationResolver,
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmitForm = async (values) => {
    let videoToSend = videoFile;
    if (!videoToSend && videoRefSave.current) {
      let response = await fetch(videoRefSave.current);
      let data = await response.blob();
      let metadata = {
        type: "video/mp4",
      };
      videoToSend = new File([data], "test.mp4", metadata);
    }

    if (!videoToSend) {
      return toast("Either upload or record the video", {
        type: "error",
      });
    }
    // if (!thumbnaiFile) {
    //   return toast("Please upload the video thumbnail", {
    //     type: "error",
    //   });
    // }
    const { title, description, assignedCoins } = values;
    if (assignedCoins <= 0) {
      return toast("Please assign at least 1 coin", {
        type: "error",
      });
    }
    if (values.assignedCoins > 20) {
      return toast("Please assign coins less than 20", {
        type: "error",
      });
    }
    const formData = new FormData();
    formData.append("file", videoToSend);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("power", empowerCoin.toString());
    if (thumbnaiFile) {
      formData.append("thumbnail", JSON.stringify(thumbnaiFile));
    }

    dispatch(startLoading());

    // upload
    const resUpload = await fetch("http://localhost/api/video", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + user.token,
      },
      body: formData,
    });
    const response = await resUpload.json();
    dispatch(stopLoading());
    if (response.message) {
      toast(response.message, {
        type: "error",
      });
    } else {
      toast("Video added sccessfully", {
        type: "success",
      });
      dispatch(updateDetails(response.video.account));
      navigate("/");
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleThumbnailChange = (e) => {
    const files = e.target.files;
    if (files?.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = e?.target?.result;
        const extension = file.name.split(".").pop();
        if (!extension || !fileData) return;
        setThumbnailPreview(fileData);
        setThumbnailFile({
          file: fileData,
          extension,
        });
      };
      reader.readAsDataURL(file);
      setThumbnailFile(file);
    }
  };

  const onClickIncreaseDecrease = (condition = "") => {
    if (assignedCoins > availableCoin) {
      setAssignedCoinsError("");
    }
    if (condition === "available") {
      if (availableCoin >= 0 && availableCoin !== 0) {
        setAvailableCoin((prev) => {
          if (prev > 0 && prev >= parseInt(assignedCoins)) {
            return prev - parseInt(assignedCoins);
          } else {
            return prev;
          }
        });
        setEmpowerCoin((prev) => {
          if (prev >= 0 && availableCoin >= parseInt(assignedCoins)) {
            return prev + parseInt(assignedCoins);
          } else {
            return prev;
          }
        });
      }
    } else {
      if (empowerCoin >= 0 && empowerCoin !== 0) {
        setAvailableCoin((prev) => {
          if (prev >= 0 && empowerCoin >= parseInt(assignedCoins)) {
            return prev + parseInt(assignedCoins);
          } else {
            return prev;
          }
        });
        setEmpowerCoin((prev) => {
          if (prev > 0 && prev >= parseInt(assignedCoins)) {
            return prev - parseInt(assignedCoins);
          } else {
            return prev;
          }
        });
      }
    }
  };

  return (
    <>
      {isLoading && <LoaderSpiner />}
      <Header />
      <div className="upload_screen">
        <div className="heading">
          <h2>Upload </h2>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Title"
                {...register("title", { required: true })}
              />
              {errors?.title && (
                <span className="error-mesage">{errors.title?.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                rows="4"
                cols="50"
                {...register("description", { required: true })}
              ></textarea>
              {errors?.description && (
                <span className="error-mesage">
                  {errors.description?.message}
                </span>
              )}
            </div>
            <div className="form-group">
              <label>Upload Video</label>
              <div className="files">
                <input
                  type="file"
                  accept="video/mp4,video/x-m4v,video/*"
                  onChange={handleVideoChange}
                />
                <div className="ulpad_text">
                  <h4>Upload Video</h4>
                </div>
                {videoFile && (
                  <>
                    <p> Uploaded Video</p>
                    <video width="400" controls>
                      <source src={URL.createObjectURL(videoFile)} />
                    </video>
                  </>
                )}
              </div>
            </div>
            <p>OR</p>
            <div className="form-group">
              <label>Record Live Video</label>
              <div className="files">
                <ReactMediaRecorder
                  video
                  render={({
                    startRecording,
                    stopRecording,
                    mediaBlobUrl,
                    previewStream,
                  }) => {
                    videoRefSave.current = mediaBlobUrl;
                    return (
                      <div className="video_section">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRecordingStarted(true);
                            startRecording(e);
                          }}
                          disabled={recordingStarted}
                        >
                          Start Recording
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRecordingStarted(false);
                            stopRecording();
                          }}
                          disabled={!recordingStarted}
                        >
                          Stop Recording
                        </button>
                        {previewStream?.active && (
                          <VideoPreview stream={previewStream} />
                        )}
                        {mediaBlobUrl && (
                          <>
                            <p>Recoreded Video</p>
                            <video src={mediaBlobUrl} controls autoPlay loop />
                          </>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Upload Thumbnail</label>
              <div className="files">
                <input type="file" onChange={handleThumbnailChange} />
                <div className="ulpad_text">
                  <h4>Upload Thumbnail</h4>
                </div>
                {Boolean(thumbnailPreview) && (
                  <>
                    <p>Uploaded Thumbnail</p>
                    <img src={thumbnailPreview} alt="Thumbnail preview" />
                  </>
                )}
              </div>
            </div>
            <div className="form-group cust_cls">
              <div className="empower">
                <div className="total_coins">
                  <label>Available Coins</label>
                  <h3>
                    <em>
                      <img className="power-icon" src={powerCoin} />
                    </em>
                    {availableCoin}
                  </h3>
                </div>
                <div className="form-group">
                  <span onClick={() => onClickIncreaseDecrease("available")}>
                    <img src={arrow} />
                  </span>
                  <br />
                  <span onClick={() => onClickIncreaseDecrease()}>
                    <img src={arrow} className="bottom" />
                  </span>
                </div>
                <div className="total_coins right_imgs">
                  <label>Empower Coins</label>
                  <h3>
                    <em>
                      <img className="power-icon" src={powerCoin} />
                    </em>
                    {empowerCoin}
                  </h3>
                </div>
              </div>
              <div className="flex-column class_coininput">
                <label>
                  Coin to move
                  <input
                    type="number"
                    placeholder="Coin"
                    name="assignedCoins"
                    value={assignedCoins}
                    onChange={(e) => {
                      const { value } = e.target;
                      setAssignedCoins(value);
                      if (value > availableCoin) {
                        setAssignedCoinsError(
                          `Value should be = or < ${availableCoin}`
                        );
                      } else {
                        setAssignedCoinsError("");
                      }
                    }}
                  />
                </label>
                {assignedCoinsError && (
                  <span className="error-mesage">{assignedCoinsError}</span>
                )}
              </div>
            </div>

            <div className="form-group text-center">
              <button type="submit" className="btn-sub" disabled={isLoading}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;
