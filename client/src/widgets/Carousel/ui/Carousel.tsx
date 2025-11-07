import Carousel from 'react-bootstrap/Carousel';
import type { JSX } from 'react';
import { NavLink } from 'react-router';

function myCarousel(): JSX.Element {
  return (
    <Carousel>

      <Carousel.Item>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img
          className="d-block w-100"
          src="/pict-01.jpg"
          alt="First slide"
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <Carousel.Caption className="custom-carousel-caption" style={{ color: "#fdfdfeff", fontWeight: 'bold', }}>
          <h1>Слайд №1</h1>
          <NavLink to={"/"} className="nav-link" style={{ color: "#fdfdfdff", fontWeight: 'bold'}}>
              Ссылка на переход
            </NavLink>
          {/* <p>Возможное дополнение</p> */}
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <img
          className="d-block w-100"
          src="/pict-02.jpg"
          alt="Second slide"
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <Carousel.Caption className="custom-carousel-caption" style={{ color: "#030000ff", fontWeight: 'bold', }}>
         <h1>Слайд №2</h1>
          <NavLink to={"/"} className="nav-link" style={{ color: "#050000ff", fontWeight: 'bold'}}>
              Ссылка на переход
            </NavLink>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <img
          className="d-block w-100"
          src="/pict-03.jpg"
          alt="Third slide"
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <Carousel.Caption className="custom-carousel-caption" style={{ color: "#ffc002ff", fontWeight: 'bold', }}>
          <h1>Слайд №3</h1>
          <NavLink to={"/"} className="nav-link" style={{ color: "#fdbe02ff", fontWeight: 'bold'}}>
              Ссылка на переход
            </NavLink>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default myCarousel;