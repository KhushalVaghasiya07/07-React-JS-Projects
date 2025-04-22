import { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [buttons] = useState(['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '0', '/', '%', '.']);
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    setInput(input + value);
  };

  const calculateResult = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput('Error');
    }
  };

  const clearInput = () => {
    setInput('');
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <input 
            type="text" 
            value={input} 
            readOnly 
            className="display-input"
            placeholder="0"
          />
        </div>
        <div className="button-grid">
          {buttons.map((item, index) => (
            <button
              key={index}
              className={`calc-button ${isNaN(item) ? 'operator' : 'number'} ${item === '0' ? 'zero' : ''}`}
              onClick={() => handleButtonClick(item)}
            >
              {item}
            </button>
          ))}
          <button className="calc-button clear" onClick={clearInput}>
            C
          </button>
          <button className="calc-button equals" onClick={calculateResult}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;