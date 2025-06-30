import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Slider_1 from "../assets/Slider-1.webp";
import Slider_2 from "../assets/Slider-2.webp";
import Slider_3 from "../assets/Slider-3.webp";
import Slider_4 from "../assets/Slider-4.webp";
import Slider_5 from "../assets/Slider-5.webp";
import Slider_6 from "../assets/Slider-6.webp";
import Slider_7 from "../assets/Slider-7.webp";
import Slider_8 from "../assets/Slider-8.webp";

import { fetchAllProducts } from '../redux/Actions/productActions';
import CategoryCarousel from "../components/CategoryCarousel";
import CategorySlider from "../components/CategorySlider";

const Home = () => {
  const dispatch = useDispatch();

  // ✅ Load all products when Home page mounts
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const sliderImages = [
    Slider_1, Slider_2, Slider_3, Slider_4,
    Slider_5, Slider_6, Slider_7, Slider_8,
  ];

  return (
    <div className="bg-light pb-4">
      {/* Categories Icons Horizontal Slider */}
      <CategorySlider />

      {/* Main Banner Slider */}
      <Carousel className="mb-4 custom-carousel" interval={3000} slide={true}>
        {sliderImages.map((img, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={img}
              alt={`Slide ${index + 1}`}
              style={{
                height: "320px",
                objectFit: "cover",
                borderRadius: "5px",
                transition: "transform 1s ease-in-out",
              }}
            />
          </Carousel.Item>  
        ))}
      </Carousel>

      {/* Category Specific Carousels */}
      <CategoryCarousel
        title="Best of Electronics"
        category="electronics" // ✅ lowercase
        showAd={true}
      />

      <CategoryCarousel
        title="Beauty, Food, Toys & More"
        category="grocery"
        itemsPerPage={7}
      />

      <CategoryCarousel
        title="Fashion Clearance"
        category="fashion"
        itemsPerPage={7}
      />

    </div>
  );
};

export default Home;