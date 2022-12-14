// Library components
import { Link } from "react-router-dom";

// styles
import "./styles.scss";

const links = [
  {
    icon: "users-locations-power-d.png",
    route: "/earn",
    text: "Earn",
  },
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
    route: "/",
    text: "Plebeian",
  },
];

const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <nav className="footer-nav">
          {links.map((link, index) => (
            <Link to={link.route} key={index}>
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
