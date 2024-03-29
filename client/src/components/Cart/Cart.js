import React from "react";
import { useEffect } from "react";
import CartCard from "./CartCard";
import CartSummary from "./CartSummary";

export default function Cart(props) {
  const [Cart, setCart] = React.useState([]);
  const [cartLength, setCartLength] = React.useState(0);
  useEffect(() => {
    console.log(Cart);
    const localStorageData = localStorage.getItem("products");
    if(JSON.parse(localStorageData)!=null){
      setCart(JSON.parse(localStorageData));
      setCartLength(JSON.parse(localStorageData).length);
    }

  }, []);

  const RemoveFromCarT = (ViewProductObject) => {
    const ToDelete = ViewProductObject.name;
    let arr = JSON.parse(localStorage.getItem("products"));
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].name === ToDelete) {
        arr.splice(i, 1);
      }
    }
    localStorage.setItem("products", JSON.stringify(arr));
    setCart(arr);
    setCartLength(arr.length);
    props.functionToSetCartSize(arr.length);
  };
  return (
    <>
      <CartSummary CartSize={cartLength} />
      <div className="container">
        <div className="row">
          {Cart.map((item) => {
            return (
              
                <CartCard
                  name={item.name}
                  imageLink={item.image}
                  tagsUI={item.tagsUI}
                  tags={item.tags}
                  price={item.price}
                  id={item._id}
                  RemoveFromcartObject={RemoveFromCarT}
                />
              
            );
          })}
        </div>
      </div>
    </>
  );
}
