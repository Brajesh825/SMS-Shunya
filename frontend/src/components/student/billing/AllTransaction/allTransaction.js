import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/loader";


const TransactionRow = ({ transaction }) => {

  return (
    <tr id={transaction.studentID._id}>
      <td>{transaction.studentID.name}</td>
      <td> {transaction.studentID.studentID} </td>
      <td> {transaction.classId.className} </td>
      <td> {transaction.transactionID} </td>
      <td> {transaction.month} </td>
      <td> {transaction.year} </td>
      <td> {transaction.modeOfTransaction} </td>
      <td> {transaction.totalAmount} </td>
    </tr>
  );
};

const TransactionList = ({ transactionList }) => {

  return (
    <>
      {transactionList.map((transaction, index) => (
        <TransactionRow transaction={transaction} />
      ))}
    </>
  );

};

const AllTransactions = () => {
  const [transactionList, setTransactionList] = useState([]);

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("/api/v1/student/bill", {
        withCredentials: true,
      })
      .then((res) => {
        let data = res.data;
        console.log(data);
        setLoading(false)
        setTransactionList(data);
      });
  }, []);

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="transaction-list">
      <div className="transaction-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Class</th>
              <th>Transaction ID</th>
              <th>Month</th>
              <th>Year</th>
              <th>Mode</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <TransactionList transactionList={transactionList} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTransactions;
