import { Button, Carousel } from "antd";
import "./home.css";
import { Link } from "react-router-dom";
import LayoutTemplate from "../../components/header-footer-template/LayoutTemplate";

function HomePage() {
  const handleNavigation = () => {};
  // const limitedArticles = products.slice(0, 4);
  return (
    <div>
      <LayoutTemplate>
        <Carousel arrows infinite={false}>
          <div style={{ position: "relative" }}>
            <img
              src="https://cdn.pixabay.com/photo/2015/05/04/20/23/japanese-garden-752918_1280.jpg"
              alt="Koi Pond"
              style={{
                height: "620px",
                width: "100%",
              }}
            />
            <h3 className="carousel_content_1"></h3>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src="https://cdn.pixabay.com/photo/2016/12/28/01/10/koi-1935183_960_720.jpg"
              alt="Koi Fish"
              style={{
                height: "620px",
                width: "100%",
              }}
            />
            <h3 className="carousel_content_2"></h3>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src="https://cdn.pixabay.com/photo/2016/12/28/01/10/koi-1935183_960_720.jpg"
              alt="Koi Health Products"
              style={{
                height: "620px",
                width: "100%",
              }}
            />
            <h3 className="carousel_content_3"></h3>
          </div>
        </Carousel>

        <div className="about">
          <h1>About Us</h1>
          <p>
            Welcome to Koi Health and Pond Care, your trusted source for expert
            guidance on maintaining vibrant, healthy Koi fish and pristine ponds
            at home. Our website offers comprehensive resources on Koi health,
            pond management, and water quality monitoring, along with a curated
            selection of high-quality Koi health care products. We are
            passionate about helping enthusiasts create ideal environments for
            their Koi, ensuring longevity and well-being. Our mission stems from
            a deep love for Koi fish and the joy they bring, and we aim to
            support hobbyists by providing the knowledge and tools they need for
            success.
          </p>
        </div>
        <div className="blogs">
          <h1>Check out our News</h1>
          <div
            className="row justify-content-center"
            style={{ gap: "6%", "--bs-gutter-x": "0" }}
          >
            <div className="col-md-3 mb-5 blogChild">
              <Link to={"/blogDetail"}>
                <img
                  src="https://cdn.pixabay.com/photo/2019/10/12/04/59/koi-4543131_1280.jpg"
                  alt="Koi Fish"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderTopRightRadius: "15px",
                    borderTopLeftRadius: "15px",
                    objectFit: "cover",
                  }}
                />
              </Link>
              <h4>The Koi Perspective</h4>
              <p>
                A digital magazine featuring monthly updates, tips, and Koi
                hobbyist stories. Each issue is free and made for enthusiasts.
              </p>
              <h6>Joe Mitchell - November 1, 2024</h6>
              <Button onClick={() => handleNavigation("/blogDetail")}>
                View more
              </Button>
            </div>
            <div className="col-md-3 mb-5 blogChild">
              <Link to={"/blogDetail"}>
                <img
                  src="https://cdn.pixabay.com/photo/2019/10/12/04/59/koi-4543131_1280.jpg"
                  alt="Koi Fish"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderTopRightRadius: "15px",
                    borderTopLeftRadius: "15px",
                    objectFit: "cover",
                  }}
                />
              </Link>
              <h4>Doitsu Variety: The Scaleless Koi</h4>
              <p>
                A detailed guide on choosing Doitsu Koi, a unique scaleless
                variety.
              </p>
              <h6>Next Day Koi - March 20, 2024</h6>
              <Button onClick={() => handleNavigation("/blogDetail")}>
                View more
              </Button>
            </div>
            <div className="col-md-3 mb-5 blogChild">
              <Link to={"/blogDetail"}>
                <img
                  src="https://cdn.pixabay.com/photo/2019/10/12/04/59/koi-4543131_1280.jpg"
                  alt="Koi Fish"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderTopRightRadius: "15px",
                    borderTopLeftRadius: "15px",
                    objectFit: "cover",
                  }}
                />
              </Link>
              <h4>The Many Kinds of Koi Fish Behavior</h4>
              <p>
                Explores different Koi behaviors and tips to identify stress and
                illness.
              </p>
              <h6>Paige Braaten - December 16, 2023</h6>
              <Button onClick={() => handleNavigation("/blogDetail")}>
                View more
              </Button>
            </div>
          </div>
        </div>
        <div className="products">
          <h1>Our Products</h1>
          {/* <div className="col-md-3 mb-5 blogChild">
              <Link to={"/blogDetail"}>
                <img
                  src="https://cdn.pixabay.com/photo/2019/10/12/04/59/koi-4543131_1280.jpg"
                  alt="Koi Fish"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderTopRightRadius: "15px",
                    borderTopLeftRadius: "15px",
                    objectFit: "cover",
                  }}
                />
              </Link>
              <h4>5 Benefits of Hand Feeding Your Koi Fish & Petting Tips</h4>
              <p>
                Offers insights into hand-feeding Koi and building bonds with
                them.
              </p>
              <h6>Kodama Koi Farm - July 24, 2023</h6>
              <Button onClick={() => handleNavigation("/blogDetail")}>
                View more
              </Button>
            </div>
            <div className="col-md-3 mb-5 blogChild">
              <Link to={"/blogDetail"}>
                <img
                  src="https://cdn.pixabay.com/photo/2019/10/12/04/59/koi-4543131_1280.jpg"
                  alt="Koi Fish"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderTopRightRadius: "15px",
                    borderTopLeftRadius: "15px",
                    objectFit: "cover",
                  }}
                />
              </Link>
              <h4>Best Koi Fish For Your First Pond</h4>
              <p>
                Discusses beginner-friendly Koi varieties ideal for new pond
                owners.
              </p>
              <h6>Paige Braaten - February 6, 2024</h6>
              <Button onClick={() => handleNavigation("/blogDetail")}>
                View more
              </Button>
            </div>
            <div className="col-md-3 mb-5 blogChild">
              <Link to={"/blogDetail"}>
                <img
                  src="https://cdn.pixabay.com/photo/2019/10/12/04/59/koi-4543131_1280.jpg"
                  alt="Koi Fish"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderTopRightRadius: "15px",
                    borderTopLeftRadius: "15px",
                    objectFit: "cover",
                  }}
                />
              </Link>
              <h4>Preparing for Koi Competition for Winning Koi Shows</h4>
              <p>
                Tips for grooming Koi for competitions and achieving top
                results.
              </p>
              <h6>Kodama Koi Farm - May 24, 2023</h6>
              <Button onClick={() => handleNavigation("/blogDetail")}>
                View more
              </Button>
            </div> */}
        </div>
      </LayoutTemplate>
    </div>
  );
}

export default HomePage;