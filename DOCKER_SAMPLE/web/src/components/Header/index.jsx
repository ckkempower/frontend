// styles
import "./styles.scss";

const navLinks = [
  {
    icon: "locations-b.png",
  },
  {
    icon: "interest-group-b.png",
  },
  {
    icon: "messages-d.png",
  },
  {
    icon: "settings-d.png",
  },
  {
    icon: "sovereigns-d.png",
  },
];

const Header = () => {
  return (
    <header>
      <nav>
        {navLinks.map((link, index) => (
          <img
            src={require(`../../assets/icons/${link.icon}`)}
            alt=""
            className="header-icon"
            key={index}
          />
        ))}
      </nav>
    </header>
  );
};

export default Header;
