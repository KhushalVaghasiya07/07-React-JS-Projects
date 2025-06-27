import { useState } from "react";
import { Container } from "react-bootstrap";
import { FaChevronDown } from "react-icons/fa";
import Title_1 from "../../src/assets/Title-1.webp";
import Title_2 from "../../src/assets/Title-2.webp";
import Title_3 from "../../src/assets/Title-3.webp";
import Title_4 from "../../src/assets/Title-4.webp";
import Title_5 from "../../src/assets/Title-5.webp";
import Title_6 from "../../src/assets/Title-6.jpg";
import Title_7 from "../../src/assets/Title-7.webp";
import Title_8 from "../../src/assets/Title-8.webp";
import Title_9 from "../../src/assets/Title-9.webp";
import "./CategorySlider.css";

const titles = [
  { img: Title_1, text: "Grocery" },
  { img: Title_2, text: "Mobiles" },
  { img: Title_3, text: "Fashion", hasArrow: true },
  { img: Title_4, text: "Electronics", hasArrow: true },
  { img: Title_5, text: "Home & Furniture", hasArrow: true },
  { img: Title_6, text: "Appliances" },
  { img: Title_7, text: "Flight Bookings" },
  { img: Title_8, text: "Beauty, Toys & More", hasArrow: true },
  { img: Title_9, text: "Two Wheelers", hasArrow: true },
];

const dropdownData = {
  Fashion: [
    "Men's Bottom Wear", "Women Ethnic", "Men Footwear", "Women Footwear",
    "Watches and Accessories", "Women Western", "Bags, Suitcases & Luggage",
    "Kids", "Essentials", "Winter"
  ],
  Electronics: [
    "Electronics GST Store", "Cameras & Accessories", "Computer Peripherals", "Gaming",
    "Health & Personal Care", "Laptop Accessories", "Laptop and Desktop", "MobileAccessory",
    "Powerbank", "Smart Home automation", "Smart Wearables", "Storage", "Tablets"
  ],
  "Home & Furniture": [
    "Furniture", "Living Room Furniture", "Kitchen & Dining", "Bedroom Furniture",
    "Space Saving Furniture", "Home Decor", "Tools & Utility", "Work Space Furniture",
    "Kids Furniture", "Lightings & Electricals", "Cleaning & Bath", "Pet & Gardening"
  ],
  "Beauty, Toys & More": [
    "Men's Grooming", "Food & Drinks", "Nutrition & Health Care", "Baby Care",
    "Toys & School Supplies", "Sports & Fitness", "Books", "Music",
    "Stationery & Office Supplies", "Auto Accessories", "Safety & Hygiene Essentials"
  ],
  "Two Wheelers": ["Petrol Vehicles", "Electric Vehicles"]
};

function CategorySlider() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="category-slider-wrapper">
      <Container>
        <div className="category-slider-box">
          {titles.map((item, index) => (
            <div
              key={index}
              className="category-slider-item"
              onMouseEnter={() => item.hasArrow && setHovered(item.text)}
            >
              <img src={item.img} alt={item.text} className="slider-img" />
              <div className="title-row">
                <span className="slider-title">{item.text}</span>
                {item.hasArrow && <FaChevronDown className="slider-icon" />}
              </div>

              {hovered === item.text && (
                <div className="single-dropdown">
                  {dropdownData[item.text]?.map((d, i) => (
                    <div key={i} className="dropdown-item">{d}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default CategorySlider;
