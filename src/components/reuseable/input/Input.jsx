import { useState } from "react";
import styles from "./Input.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchItem } from "../../../store/actions/quoteActions";
function Input() {
  const [check, setCheck] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSearch(e) {
    setCheck(e.target.value);
  }
  function search(e) {
     e.preventDefault();
     navigate(`/${check}`);
     setCheck("");
     dispatch(searchItem(check));
   }
 
  
  return (
    <div className={styles["group"]}>
      <svg onClick={search} viewBox="0 0 24 24" aria-hidden="true" className={styles["icon"]}>
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>
      <input
        className={styles["input"]}
        type="search"
        value={check}
        onChange={handleSearch}
        placeholder="Search"
      />
    </div>
  );
}

export default Input;
