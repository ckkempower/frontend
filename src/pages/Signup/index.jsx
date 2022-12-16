import Header from "../../components/Header";
import Select from "react-select";
import makeAnimated from "react-select/animated";
// styles
import { useForm, Controller } from "react-hook-form";
import "./style.scss";
import { errorMessages, schema } from "../../common/utils";
import { useState } from "react";
import { toast } from "react-toastify";
import { cities, counties, countries, states } from "./data";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDetails } from "../../redux/sharedSlices/user";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";

const Signup = () => {
  const [pfp, setPfp] = useState({
    file: "",
    extension: "",
  });

  const [profilePicErr, setProfilePicErr] = useState("");

  const dispatch = useDispatch();

  const animatedComponents = makeAnimated();

  const validationResolver = useYupValidationResolver(schema);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: validationResolver,
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (!pfp.file) {
      return setProfilePicErr("Thumbnail is required");
    }

    const response = await fetch("http://localhost/api/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        pfp,
      }),
    });
    const responseData = await response.json();

    if (responseData.message) {
      toast(responseData.message, {
        type: "error",
      });
    } else {
      toast("Sign up successfull", {
        type: "success",
      });

      dispatch(addDetails(responseData));
      navigate("/");
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files?.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const extension = file.name.split(".").pop();
        const fileData = e?.target?.result;
        if (!extension || !fileData) return;
        setPfp({
          file: fileData,
          extension,
        });
        setProfilePicErr("");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />
      <div className="signUp">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter Your First Name"
              {...register("firstName", { required: true })}
            />
            {errors?.firstName && (
              <span className="error-mesage">{errorMessages.firstName}</span>
            )}
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter Your Last Name"
              {...register("lastName", { required: true })}
            />
            {errors?.lastName && (
              <span className="error-mesage">{errorMessages.lastName}</span>
            )}
          </div>
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              placeholder="Enter Your User Name"
              {...register("userName", { required: true })}
            />
            {errors?.userName && (
              <span className="error-mesage">{errorMessages.userName}</span>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              {...register("email", { required: true })}
            />
            {errors?.email && (
              <span className="error-mesage">{errors?.email?.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              {...register("password", { required: true })}
            />
            {errors?.password && (
              <span className="error-mesage">{errors?.password?.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Country</label>
            <Controller
              name="country"
              control={control}
              placeholder="Enter Your Password"
              render={({ field }) => (
                <Select
                  {...field}
                  options={countries}
                  components={animatedComponents}
                  closeMenuOnSelect={false}
                />
              )}
            />
            {errors?.country && (
              <span className="error-mesage">{errors?.country?.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>State</label>
            <Controller
              name="state"
              control={control}
              placeholder="Enter Your Password"
              render={({ field }) => (
                <Select
                  {...field}
                  options={states}
                  components={animatedComponents}
                  closeMenuOnSelect={false}
                />
              )}
            />
            {errors?.state && (
              <span className="error-mesage">{errors?.state?.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>County</label>
            <Controller
              name="county"
              control={control}
              placeholder="Enter Your County"
              render={({ field }) => (
                <Select
                  {...field}
                  options={counties}
                  components={animatedComponents}
                  closeMenuOnSelect={false}
                />
              )}
            />
            {errors?.county && (
              <span className="error-mesage">{errors?.county?.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>City</label>
            <Controller
              name="city"
              control={control}
              placeholder="Enter Your Password"
              render={({ field }) => (
                <Select
                  {...field}
                  options={cities}
                  components={animatedComponents}
                  closeMenuOnSelect={false}
                />
              )}
            />
            {errors?.city && (
              <span className="error-mesage">{errors?.city?.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Upload Profile Pic</label>
            <div className="files">
              <input type="file" onChange={handleFileInput} />
              <div className="ulpad_text">
                <h4>Upload Profile Pic</h4>
              </div>
              {profilePicErr && (
                <span className="error-mesage">{profilePicErr}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <button className="submin_btn" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
