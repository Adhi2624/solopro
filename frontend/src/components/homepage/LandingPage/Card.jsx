import React, { useState } from 'react';
import Slider from "react-slick";
import "./card.css";
import service1 from '../images/service1.png';
import service2 from '../images/service2.png';
import service3 from '../images/service3.png';
import service4 from '../images/service4.png';
import service5 from '../images/service5.png';
import { Link } from "react-router-dom"; 

const cards = [
  {"image": service1, "subtitle":"Find Investors"},
  {"image": service2, "subtitle":"Find Mentors"},
  {"image": service3, "subtitle":"Blogs"},
  {"image": service4, "subtitle":"Learn"},
  {"image": service5, "subtitle":"Community"}
];

const Article = ({ data }) => {
  const [hover, setHover] = useState(false);
  const { image, subtitle } = data;

  return (
    <figure 
      className={`snip1584 ${hover ? 'hover' : ''}`} 
      onMouseEnter={() => setHover(true)} 
      onMouseLeave={() => setHover(false)} 
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setHover(false)}
    >
      <img src={image} alt={subtitle} />
      <figcaption>
        <h5>{subtitle}</h5>
      </figcaption>
      <Link to="#"></Link>
    </figure>
  );
};

const News = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className='news'>
      <Slider {...settings}>
        {data.length > 0 ? data.map((item, index) => (
          <div key={index}>
            <Article data={item} />
          </div>
        )) : <p>Please add some cards</p>}
      </Slider>
    </div>
  );
};

const Card = () => {
  return (
    <div className='app'>
      <News data={cards} />
    </div>
  );
};

export default Card;
