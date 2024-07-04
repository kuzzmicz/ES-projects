import './style.css';
import { useState } from "react";

export const Counter = (props) => {
  const [counter, setCounter] = useState(0);

  const counterMinus = (counter) => {
   if(counter > 0){
    setCounter(counter-props.changeValue);
   }

  }
  return (
    <div className="counter-design">
         <div onClick={() => counterMinus(counter)} className="symbol"> - </div>
      
      <div>{counter}</div>
      <div onClick={() => setCounter(counter + props.changeValue)} className="symbol"> + </div>
    </div>
  );
};