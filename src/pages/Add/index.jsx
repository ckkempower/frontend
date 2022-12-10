import Header from "../../components/Header";
// import { useForm } from "react-hook-form";
import "./styles.scss";

const Add = () => {
  return (
    <>
      <Header />
      <div className="upload_screen">
        <div className="heading">
          <h2>Upload </h2>
        </div>
        <div className="form">
          <form>
            <div className="form-group">
              <label>Title</label>
              <input type="text" placeholder="Title" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                id="w3review"
                name="w3review"
                rows="4"
                cols="50"
              ></textarea>
            </div>
            <div className="form-group">
              <label>Upload Video</label>
              <div className="files">
                <input type="file" />
                <div className="ulpad_text">
                  <h4>Upload Video</h4>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Upload Thumbnail</label>
              <div className="files">
                <input type="file" />
                <div className="ulpad_text">
                  <h4>Upload Thumbnail</h4>
                </div>
              </div>
            </div>
            <div className="form-group cust_cls">
              <div className="total_coins">
                <label>Avalble Coins</label>
                <h3>$40</h3>
              </div>

              <input type="number" placeholder="Coin" />
            </div>

            <div className="form-group text-center">
              <button className="btn-sub">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;
