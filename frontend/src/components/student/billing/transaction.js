import React, { useState } from "react";
import TransactionSlider from "./transactionSlider";
import AllTransactions from "./AllTransaction/allTransaction";
import MyTransactions from "./MyTransaction/myTransactions";
import NewTransaction from "./NewTransaction/newTransaction";
import { useRef } from "react";
import { useEffect } from "react";

const StudentTransaction = () => {
  const [slider, setSlider] = useState("transaction");

  const inputRef = useRef(null);

  useEffect(() => {
    // Automatically focus the input element when it's rendered
    inputRef.current.focus();
  }, []);

  const view = () => {
    switch (slider) {
      case "transaction": {
        return <AllTransactions />;
      }
      case "newTransaction": {
        return <NewTransaction />
      }
      case "myTransaction": {
        return <MyTransactions />
      }

      default: {
        return <AllTransactions />
      }
    }
  };

  return (
    <div ref={inputRef}
      tabIndex={-1} id="billingMain" className="fee-structure-main">
      <TransactionSlider activeSlider={slider} setActiveSlider={setSlider} />
      {view()}
    </div>
  );
};

export default StudentTransaction;
