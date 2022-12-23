import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSchema } from "../../common/utils";
import Header from "../../components/Header";
import { useYupValidationResolver } from "../../hooks/useYupValidationResolver";
import { addDetails } from "../../redux/sharedSlices/user";
// styles
import "./styles.scss";

const Login = () => {
  const validationResolver = useYupValidationResolver(loginSchema);
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: validationResolver,
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await fetch("/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });
    const responseData = await response.json();

    if (responseData.message) {
      toast(responseData.message, {
        type: "error",
      });
    } else {
      dispatch(addDetails(responseData))
      toast("Sign up successfull", {
        type: "success",
      });
      navigate("/");
    }
    // if (data.message) {
    //     errorMessage = data.message;
    // }
    // if (data.token) {
    //     localStorage.setItem('token', data.token);
    // }
  };
  return (
    <>
      <Header />
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              {...register("email", { required: true })}
            />
            {errors?.email && (
              <span className="error-mesage">{errors?.email.message}</span>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="Password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {errors?.password && (
              <span className="error-mesage">{errors?.password.message}</span>
            )}
          </div>
          <div className="form-group">
            <button className="submin_btn" type="submit">
              Login
            </button>
          </div>
        </form>
        <span onClick={()=>navigate("/signup")} className="sign_up">Sign up</span>
      </div>
    </>
  );
};

export default Login;
