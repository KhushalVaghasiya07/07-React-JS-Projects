import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ExploreMore.css';

const ExploreMore = () => {
  const products = useSelector(state => state.products);
  const [range, setRange] = useState('all');
  const navigate = useNavigate();

  const filtered = products.filter(product => {
    const price = parseInt(product.price);
    if (range === '0-5000') return price <= 5000;
    if (range === '5000-10000') return price > 5000 && price <= 10000;
    if (range === '10000+') return price > 10000;
    return true;
  });

  return (
    <div className="explore-wrapper">
      <h2>Explore More Products</h2>
      <div className="filter-sort">
        <label>Filter by Price:</label>
        <select onChange={(e) => setRange(e.target.value)}>
          <option value="all">All</option>
          <option value="0-5000">Under ₹5000</option>
          <option value="5000-10000">₹5,000 - ₹10,000</option>
          <option value="10000+">Above ₹10,000</option>
        </select>
      </div>
      <div className="explore-grid">
        {filtered.slice(0, 12).map(p => (
          <div className="product-card" key={p.id} onClick={() => navigate(`/product/${p.id}`)}>
            <img src={p.image} alt={p.name} />
            <p>{p.name}</p>
            <span>₹{p.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;