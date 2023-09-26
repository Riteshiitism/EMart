import React, { useEffect, useState } from "react";
import Product from "./Product";
const WishList = () => {
  let id = localStorage.getItem("userId");
  const [List, setList] = useState([]);
  const getData = async () => {
    // console.log("inside");
    try {
      let response = await fetch("http://localhost:5000/wishlist/" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      response = await response.json();
      if (response) {
        // console.log(response);
        setList(response);
      } else {
        console.log("Failed to delete data!");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  useEffect(() => {
    // console.log("data fetch karat bani");
    getData();
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="row ">
          {List.map((item) => {
            return <Product itemId={item} />;
          })}
        </div>
      </div>
    </>
  );
};
export default WishList;
