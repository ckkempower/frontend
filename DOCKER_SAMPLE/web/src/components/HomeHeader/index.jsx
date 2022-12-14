// styles
import "./styles.scss";

const HomeHeader = () => {
  return (
    <header className="home-header">
      <nav>
        <img
          src={require(`../../assets/icons/locations-b.png`)}
          alt=""
          className="header-icon"
        />
        <p>Watch videos and earn power to promote your content</p>
        <img
          src={require(`../../assets/icons/sovereigns-b.png`)}
          alt=""
          className="header-icon"
        />
      </nav>
    </header>
  );
};

export default HomeHeader;
