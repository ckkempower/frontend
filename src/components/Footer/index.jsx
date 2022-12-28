// Library components
import { Link } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

// styles
import "./styles.scss";

const links = [
  {
    icon: "videos-power-d.png",
    route: "/spent",
    text: "Spent",
  },
  {
    icon: "create-d.png",
    route: "/add",
    text: "",
  },
  {
    icon: "ranks-d.png",
    route: "/ranks",
    text: "Ranks",
  },
  {
    icon: "profile-d.png",
    route: "/plebeian",
    text: "Plebeian",
  },
];

const Footer = () => {
  const { isAuthenticate, redirectToLogin } = useAuthentication();

  return (
    <div className="footer">
      <footer>
        <nav className="footer-nav">
          <Link to={"/"}>
            <img
              src={require(`../../assets/icons/users-locations-power-d.png`)}
              alt=""
              className={`footer-icon `}
            />
            <p>{"Earn"}</p>
          </Link>
          {links.map((link, index) => (
            <Link
              to={isAuthenticate ? link.route : redirectToLogin}
              key={index}
            >
              <img
                src={require(`../../assets/icons/${link.icon}`)}
                alt=""
                className={`footer-icon ${!link.text ? "midd-icon" : ""}`}
              />
              <p>{link.text}</p>
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
