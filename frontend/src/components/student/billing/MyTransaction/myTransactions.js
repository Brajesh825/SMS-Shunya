import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/loader";

const TransactionRow = ({ transaction, viewMode }) => {

  if (viewMode === 'lite') {
    return (
      <tr >
        <td> {transaction.class} </td>
        <td> {transaction.month} </td>
        <td> {transaction.year} </td>
        <td> {transaction.status} </td>
      </tr>
    );
  }
  else {
    const totalFee = transaction.libraryFee + transaction.hostelFee + transaction.transportFee + transaction.tutionFee
    return (
      <tr >
        <td> {transaction.class} </td>
        <td> {transaction.month} </td>
        <td> {transaction.year} </td>
        <td> {transaction.status} </td>
        <td> {transaction.libraryFee} </td>
        <td> {transaction.hostelFee} </td>
        <td> {transaction.transportFee} </td>
        <td> {transaction.tutionFee} </td>
        <td> {totalFee} </td>
      </tr>
    );
  }

};

const TransactionHead = ({ viewMode }) => {

  if (viewMode !== "detailed") {
    return <thead>
      <tr>
        <th>Class</th>
        <th>Month</th>
        <th>Year</th>
        <th>Status</th>
      </tr>
    </thead>
  } else if (viewMode === "detailed") {
    return <thead>
      <tr>
        <th>Class</th>
        <th>Month</th>
        <th>Year</th>
        <th>Status</th>
        <th>Library Fee</th>
        <th>Hostel Fee</th>
        <th>Transport Fee</th>
        <th>Tution Fee</th>
        <th>Total Fee</th>
      </tr>
    </thead>
  }
}

const TransactionList = ({ transactionList, viewMode }) => {
  return (
    <>
      {transactionList.map((transaction, index) => (
        <TransactionRow transaction={transaction} viewMode={viewMode} />
      ))}
    </>
  );
};

const AllTransactions = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [viewMode, setViewMode] = useState(['lite'])
  const [isLoading,setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("/api/v1/student/bill/list", {
        withCredentials: true,
      })
      .then((res) => {
        let data = res.data;
        console.log(res);
        setLoading(false)
        setTransactionList(data.bills);
      });
  }, []);

  if (isLoading) {
    return <Loader />
  }
  else {
    return (
      <div className="transaction-list">
        <div >
          <span onClick={() => { setViewMode('lite') }} style={{ backgroundColor: 'Blue', color: 'White', padding: '0.75rem', marginRight: "1rem", border: "1px solid pink", borderRadius: "0.5rem" }} >Lite</span>
          <span onClick={() => { setViewMode('detailed') }} style={{ backgroundColor: 'Green', color: 'White', padding: '0.75rem', marginRight: "1rem", border: "1px solid pink", borderRadius: "0.5rem" }} >Detailed</span>
        </div>
        <div style={{ 'margin-top': '2rem' }} className="transaction-table">
          <table>
            <TransactionHead viewMode={viewMode} />
            <tbody>
              <TransactionList viewMode={viewMode} transactionList={transactionList} />
            </tbody>
          </table>
        </div>
      </div>
    )
  }


};

export default AllTransactions;
