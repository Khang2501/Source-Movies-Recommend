import React, { useState } from "react";
import axios from "axios";

import { FaSearch } from "react-icons/fa";
import classes from "./SearchForm.module.scss";
type Props = {
  input: (input: string) => void;
};

export default function SearchForm({ input }: Props) {
  const [enteredInput, setEnteredInput] = useState<string>("");

  const inputChangeHandler = (event: { target: { value: string } }) => {
    setEnteredInput(event.target.value);
  };

  const searchHandler = () => {
    if (enteredInput.trim() === "") return;
    input(enteredInput);
  };

  const resetHandler = () => {
    setEnteredInput("");
  };

  return (
    <div className={classes["search-form"]}>
      <div className={classes["search-form_detail"]}>
        <div className={classes["search-form_input"]}>
          <input
            type="text"
            value={enteredInput}
            onChange={inputChangeHandler}
          />
          <button onClick={searchHandler}>
            <FaSearch />
          </button>
        </div>
        <div className={classes["search-form_button"]}>
          <button onClick={resetHandler}>RESET</button>
          <button onClick={searchHandler}>SEARCH</button>
        </div>
      </div>
    </div>
  );
}
