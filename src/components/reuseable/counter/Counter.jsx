/* eslint-disable react/prop-types */
import { useState } from 'react'
import styles from './Counter.module.css'
function Counter({ amount, onQuantityChange}) {
  const [count, setCount] = useState(amount ? amount : 0); 
  
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    onQuantityChange(count + 1); // Call the callback with updated quantity

  };

  const handleDecrement = () => {
    if (amount ? count > 1 : count > 0) {
      setCount((prevCount) => prevCount - 1);
      onQuantityChange(count - 1); // Call the callback with updated quantity
   
    }
  };
  return (
    <div className={styles.counter}>
      <button onClick={handleDecrement} className={styles.button}>
        -
      </button>
      <span className={styles.value}>{count}</span>
      <button onClick={handleIncrement} className={styles.button}>
        +
      </button>
    </div>
  );
}

export default Counter
