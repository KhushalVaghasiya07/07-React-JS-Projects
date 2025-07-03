import React from 'react';
import { Container } from 'react-bootstrap';
import './TopCategoryBar.css';

import title1 from '../assets/title1.webp';
import title2 from '../assets/title2.webp';
import title3 from '../assets/title3.webp';
import title4 from '../assets/title4.webp';
import title5 from '../assets/title5.webp';
import title6 from '../assets/title6.webp';
import title7 from '../assets/title7.webp';
import title8 from '../assets/title8.webp';
import title9 from '../assets/title9.webp';

const categories = [
  { name: "Minutes", img: title1 },
  { name: "Mobiles & Tablets", img: title2 },
  { name: "Fashion", img: title3 },
  { name: "Electronics", img: title4 },
  { name: "Home & Furniture", img: title5 },
  { name: "TVs & Appliances", img: title6 },
  { name: "Flight Bookings", img: title7 },
  { name: "Beauty, Food..", img: title8 },
  { name: "Grocery", img: title9 },
];

const TopCategoryBar = () => {
  return (
    <div className="top-category-bar py-2 bg-white border-bottom">
      <Container className="d-flex justify-content-around align-items-center flex-wrap">
        {categories.map((cat, idx) => (
          <div key={idx} className="text-center category-item">
            <img src={cat.img} alt={cat.name} className="category-img" />
            <p className="small mt-2">{cat.name}</p>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default TopCategoryBar;
