import Carousel from "react-bootstrap/Carousel";
import type { JSX } from "react";
import { NavLink } from "react-router";
import "@/app/App.css";
import "./Carousel.module.css";

function myCarousel(): JSX.Element {
  return (
    <Carousel>
      <Carousel.Item>

        {/* ПЕРВЫЙ СЛАЙД */}
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
          <NavLink
            to="/items?marker=Hot deals"
            className="navbar-brand m-0 fw-bold"
            style={{
              color: "#fce955ff",
              fontWeight: "bold",
              textShadow:
                "1px 2px 0 #000000ff, 2px 4px 0 #fc0000ff, 0 0  #04ff00ff, 0 0 0 #00b2feff",
            }}
          >
            <h1 className="carousel-title-hot-deals">
              ГОРЯЧЕЕ ПРЕДЛОЖЕНИЕ
            </h1>
          </NavLink>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        {/* ВТОРОЙ СЛАЙД /> */}
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
          <NavLink
            to="/items?marker=New"
            className="nav-link"
            style={{
              color: "#fafafaff",
              fontWeight: "bold",
              textShadow:
                "1px 2px 0 #000000ff, 2px 4px 0 #000000ff, 0 0 0 #000000ff, 0 0 0 #000000ff",
            }}
          >
            <h1 className="carousel-title-news">новинки</h1>
          </NavLink>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        {/* ТРЕТИЙ СЛАЙД /> */}
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
          <NavLink
            to="/items?marker=Top-Seller"
            className="nav-link"
            style={{
              color: "#fafafaff",
              fontWeight: "bold",
              textShadow:
                "1px 2px 0 #774d00ff, 2px 4px 0 #3a2600ff, 3px 5px 0 #000000ff, 0 0 0 #00b2feff",
            }}
          >
             <h1 className="carousel-title-hots"> Хиты продаж </h1>
          </NavLink>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        {/* ЧЕТВЁРЫЙ СЛАЙД /> */}
        <img
          className="d-block w-100"
          src="/Rennt.jpg"
          alt="Fourth slide"
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
          <p className="carousel-title-xl"
          >скоро открытие</p>
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
             <h1 className="carousel-title-rennt">Прокат инструментов</h1>
          </a>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default myCarousel;
