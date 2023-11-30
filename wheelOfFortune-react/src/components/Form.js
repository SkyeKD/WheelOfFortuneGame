import React, { useState } from 'react';
import './Form.css'

function Form(props) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any action with the input value here
    props.onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className='input-box'
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Please input your guess (one character)"
        />
        <button type="submit" className='submit-button'>Submit</button>
      </form>
    </div>
  );
}

export default Form;
