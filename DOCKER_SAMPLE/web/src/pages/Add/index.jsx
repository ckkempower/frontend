import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import { ReactMediaRecorder } from "react-media-recorder";
import "./styles.scss";
import { useRef, useState } from "react";
import VideoPreview from "../../components/videoPreview";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { toast } from "react-toastify";
import powerCoin from "../../assets/icons/power-coin.png";
import { useNavigate } from "react-router";
import { updateDetails } from "../../redux/sharedSlices/user";

export const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  assignedCoins: yup.string().required("Please assign some coins"),
});

const Add = () => {
  const videoRefSave = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnaiFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [recordingStarted, setRecordingStarted] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const user = useSelector((state) => state.user.value);
  console.log(user, "US")
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

    if (!thumbnaiFile) {
      return toast("Please upload the video thumbnail", {
        type: "error",
      });
    }
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
    formData.append("power", assignedCoins.toString());
    formData.append("thumbnail", JSON.stringify(thumbnaiFile));

    setIsLoading(true);

    // upload
    const resUpload = await fetch("http://localhost/api/video", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + user.token,
      },
      body: formData,
    });
    const response = await resUpload.json();
    console.log(response, "REss");
    setIsLoading(false);
    if (response.message) {
      toast(response.message, {
        type: "error",
      });
    } else {
      toast("Video added sccessfully", {
        type: "success",
      });
      dispatch(updateDetails(response.video.account))
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
      // setThumbnailFile(file);
    }
  };

  return (
    <>
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
                <input type="file" onChange={handleVideoChange} />
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
              <div className="total_coins">
                <label>Available Coins</label>
                <h3>
                  {user.account.power}
                  <img src={powerCoin} alt="" className="power-icon" />
                </h3>
              </div>

              <div className="flex-column">
                <input
                  type="number"
                  placeholder="Coin"
                  name="assignedCoins"
                  {...register("assignedCoins", { required: true })}
                />
                {errors?.assignedCoins && (
                  <span className="error-mesage">
                    {errors.assignedCoins?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group text-center">
              <button className="btn-sub" disabled={isLoading}>
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
