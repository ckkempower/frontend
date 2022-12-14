import Header from "../../components/Header";
// styles
import "./styles.scss";

const Login = () => {
  return (
    <>
      <Header />
      <div className="login">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter Your Email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="Password" placeholder="Password" />
          </div>
          <div className="form-group">
            <button className="submin_btn">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
