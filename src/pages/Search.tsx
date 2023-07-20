import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import SearchForm from "../components/search-form/SearchForm";
import ResultList from "../components/search-result/ResultList";
export default function Search() {
  const [inputData, setInputData] = useState("");
  const [showResult, setShowResult] = useState(false);
  const inputFormHandler = (input: string) => {
    setInputData(input);
    setShowResult(true);
  };
  return (
    <div>
      <Navbar />
      <SearchForm input={inputFormHandler} />
      {showResult && <ResultList inputResult={inputData} />}
    </div>
  );
}
