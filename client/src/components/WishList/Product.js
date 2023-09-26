import React, { useState,useEffect } from "react";
import WishListCard from "./WishListCard";

const Product = (props)=>{
    const id = props.itemId;
    const [item,setitem] = useState({});

    const getData = async()=>{
        try {
            let response = await fetch("http://localhost:5000/wishlist/product/" + id, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(),
            });
            response = await response.json();
            if (response) {
            //   console.log(response);
              setitem(response)
            } else {
              console.log("Failed to delete data!");
            }
          } catch (error) {
            console.error("Error saving data:", error);
          }
    }
    useEffect(()=>{
        getData();
    },[])
     

    return (<>
    
        <WishListCard
            name= {item.name}
            price ={item.price}
            tagsUI={item.tagsUI}
            imageLink={item.imageLink}
            id={item._id}
        />
  </>
);
}

export default Product;