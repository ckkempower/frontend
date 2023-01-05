import PowerCoin from "../../../assets/icons/power-coin.png";

const EmpowerList = ({ empowerers }) => {
  return (
    <div className="empower_mains">
      {empowerers?.map((empowering, index) => (
        <div className="empower_list" key={index}>
          <div className="list_left">
            <div className="list_img">
              <img
                src={`${empowering?.pfp}`}
                alt="pro"
              />
            </div>
            <div className="list_content">
              <h6>{`${empowering?.firstName} ${empowering?.lastName}`}</h6>
              <div className="content_botom">
                <img
                  src={require(`../../../assets/icons/interest-group-b.png`)}
                  alt="pro"
                />
                <span>{"MONARCH"}</span>
              </div>
            </div>
          </div>
          <span className="line"></span>
          <div className="list_right">
            <div className="content_botom">
              <span>{"0.1"}</span>
              <img src={PowerCoin} alt="pro" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmpowerList;
