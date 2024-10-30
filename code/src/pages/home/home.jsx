import { Button, Carousel } from "antd";
import "./home.css";
import { Link, Outlet } from "react-router-dom";
import LayoutTemplate from "../../components/header-footer-template/LayoutTemplate";

import { useEffect } from "react";
import BlogList from "../blogs/blogList";

function HomePage() {
  // const limitedArticles = products.slice(0, 4);

  // const blogs = [
  //   {
  //     title: "The Koi Perspective",
  //     description:
  //       "A digital magazine featuring monthly updates, tips, and Koi hobbyist stories. Each issue is free and made for enthusiasts.",
  //     author: "Joe Mitchell",
  //     date: "November 1, 2024",
  //     imgSrc:
  //       "https://cdn.pixabay.com/photo/2019/10/12/04/59/koi-4543131_1280.jpg",
  //   },
  //   {
  //     title: "Doitsu Variety: The Scaleless Koi",
  //     description:
  //       "A detailed guide on choosing Doitsu Koi, a unique scaleless variety.",
  //     author: "Next Day Koi",
  //     date: "March 20, 2024",
  //     imgSrc:
  //       "https://cdn.pixabay.com/photo/2019/10/12/04/59/koi-4543131_1280.jpg",
  //   },
  //   {
  //     title: "The Many Kinds of Koi Fish Behavior",
  //     description:
  //       "Explores different Koi behaviors and tips to identify stress and illness.",
  //     author: "Paige Braaten",
  //     date: "December 16, 2023",
  //     imgSrc:
  //       "https://cdn.pixabay.com/photo/2019/10/12/04/59/koi-4543131_1280.jpg",
  //   },
  // ];

  return (
    <div>
      <LayoutTemplate>
        <Carousel autoplay arrows infinite={true}>
          <div style={{ position: "relative" }}>
            <img
              src="https://cdn.pixabay.com/photo/2015/05/04/20/23/japanese-garden-752918_1280.jpg"
              alt="Koi Pond"
              style={{
                height: "620px",
                width: "100%",
                objectFit: "cover",
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
                objectFit: "cover",
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
                objectFit: "cover",
              }}
            />
            <h3 className="carousel_content_3"></h3>
          </div>
        </Carousel>

        <div id="about" className="about">
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
        <div id="blogs" className="blogs">
          <BlogList />
        </div>
        <div id="contact" className="contact">
          <h1>Contact Us</h1>
          <p>Phone: 0915533944</p>
          <p>Email: koihehe@gmail.com</p>
          <p>
            Address: D1 - Long Thanh My - Thu Duc City - Ho Chi Minh City -
            VietNam
          </p>
        </div>
      </LayoutTemplate>
    </div>
  );
}

export default HomePage;
