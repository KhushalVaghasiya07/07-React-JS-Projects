import React, { useState } from "react";
import "./Counter.css";

const CounterApp = () => {
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleChange = (newValue) => {
    setAnimate(true);
    setCount(newValue);
    setTimeout(() => setAnimate(false), 400);
  };

  const Decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    } else if (count == 0) {
      alert("Make Sure your Number is More than Zero");
    }
  };

  return (
    <div className="counter-container">
      <h1 className="counter-title">Counter</h1>
      <div className={`counter-value ${animate ? "fade-in" : ""}`} id="counter">
        {count}
      </div>
      <div className="counter-buttons">
        <button
          className="btn btn-increment"
          onClick={() => handleChange(count + 1)}
        >
          +
        </button>
        <button className="btn btn-decrement" onClick={Decrease}>
          -
        </button>
        <button className="btn btn-reset" onClick={() => handleChange(0)}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default CounterApp;
