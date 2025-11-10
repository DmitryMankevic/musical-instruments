import Carousel from "react-bootstrap/Carousel";
import type { JSX } from "react";
import { NavLink } from "react-router";

function myCarousel(): JSX.Element {
  return (
    <Carousel>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img
          className="d-block w-100"
          src="/hotDeals.jpg"
          alt="First slide"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Carousel.Caption
          className="custom-carousel-caption"
          style={{ color: "#fdfdfeff", fontWeight: "bold" }}
        >
          <h1></h1>
          <NavLink
            to="/items?marker=Hot deals"
            className="nav-link"
            style={{
              color: "#fdfdfdff",
              fontWeight: "bold",
              textShadow:
                "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
            }}
          >
            <h1>Горячее предложение</h1>
          </NavLink>
          {/* <p>Возможное дополнение</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <img
          className="d-block w-100"
          src="/news.jpg"
          alt="Second slide"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Carousel.Caption
          className="custom-carousel-caption"
          style={{ color: "#ffffffff", fontWeight: "bold" }}
        >
          <h1></h1>
          <NavLink
            to="/items?marker=New"
            className="nav-link"
            style={{
              color: "#ffffffff",
              fontWeight: "bold",
              textShadow:
                "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
            }}
          >
            <h1>Новинки</h1>
          </NavLink>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <img
          className="d-block w-100"
          src="/hits.jpg"
          alt="Third slide"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Carousel.Caption
          className="custom-carousel-caption"
          style={{ color: "#fffefbff", fontWeight: "bold" }}
        >
          <h1></h1>
          <NavLink
            to="/items?marker=Top-Seller"
            className="nav-link"
            style={{
              color: "#ffffffff",
              fontWeight: "bold",
              textShadow:
                "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
            }}
          >
            <h1> Хиты продаж </h1>
          </NavLink>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        {/* <ExampleCarouselImage text="Fourth slide" /> */}
        <img
          className="d-block w-100"
          src="/Rennt.jpg"
          alt="Third slide"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <Carousel.Caption
          className="custom-carousel-caption"
          style={{
            color: "#fffefbff",
            fontWeight: "bold",
            textShadow:
              "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
          }}
        >
          <h4>скоро открытие</h4>
          <a
            href="#instrument-rental-card"
            className="nav-link"
            style={{
              color: "#ffffffff",
              fontWeight: "bold",
              textShadow:
                "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
            }}
          >
            <h1>Прокат инструментов</h1>
          </a>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default myCarousel;
