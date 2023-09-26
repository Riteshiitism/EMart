import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tag from "./Tag";
import { useNavigate, Link } from "react-router-dom";
export default function ItemCard(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const [addWish,set]

  const history = useNavigate();
  const ViewProductObject = {
    name: props.name,
    price: props.price,
    tagsUI: props.tagsUI,
    image: props.imageLink,
    productId: props.id,
  };
  const setDataToLocalStorage = () => {
    window.localStorage.setItem(
      "ViewProduct",
      JSON.stringify(ViewProductObject)
    );
    history(`/ViewProduct/${props.id}`);
  };
  const handleSetCartItem = () => {
    // console.log(props.tagsUI);
    let products = [];
    if (localStorage.getItem("products")) {
      products = JSON.parse(localStorage.getItem("products"));
    }
    let counter = 0;
    for (var i = 0; i < products.length; i++) {
      if (products[i].name === ViewProductObject.name) {
        counter += 1;
      }
    }
    if (counter === 0) {
      products.push({
        name: props.name,
        price: props.price,
        tagsUI: props.tagsUI,
        image: props.imageLink,
        tags: [],
      });
    }
    localStorage.setItem("products", JSON.stringify(products));
    history(`/Cart/?cartsize=${products.length}`);
    // props.BadgeData(products.length);
  };

  const [heartStyle, setHeartStyle] = React.useState("heart-outline");
  const HandleWishlist = async (event) => {
    if (heartStyle !== "heart-sharp") {
      setHeartStyle("heart-sharp");
      let id = event.target.id;
      console.log(id);

      let userId = localStorage.getItem("userId");
      console.log(userId);

      try {
        const response = await fetch(
          "http://localhost:5000/wishlist/add-wishlist/" + userId,
          {
            method: "PUT",
            headers: {
              "content-type": "application/JSON",
            },
            body: JSON.stringify({ productId: id }),
          }
        );
        console.log(response);
        if (response.ok) {
          console.log("element added in wishlist");
          // navigate("/wishlist");
        } else {
          console.log("Not added");
        }
      } catch (err) {
        console.log("err: ", err);
      }
    } else {
      setHeartStyle("heart-outline");
    }
  };
  return (
    <div className="col-md-3">
      <div class="card my-10" style={{ marginTop: "5rem" }}>
        <Card.Img
          variant="top"
          src={props.imageLink}
          alt="Image not available"
          style={{ height: "15rem", width: "100%", objectFit: "cover" }}
        />
        <Card.Body>
          <div style={{ display: "flex" }}>
            <Card.Title>{props.name}</Card.Title>

            <ion-icon
              name={heartStyle}
              style={{ marginLeft: "9rem", color: "#fb0066", fontSize: "35px" }}
              onClick={HandleWishlist}
              id={ViewProductObject.productId}
            ></ion-icon>
          </div>
          <Card.Text style={{ minHeight: "5rem" }}>
            {props.tagsUI.map((item) => {
              return <Tag value={item} />;
            })}
          </Card.Text>

          <div style={{ display: "flex" }}>
            <button
              type="button"
              className="btn btn-light my-1"
              style={{ display: "flex" }}
            >
              <ion-icon name="pricetag-outline" size="medium"></ion-icon>
              {props.price}/-
            </button>

            <Link to="/WishList">
              <button
                type="button"
                style={{ backgroundColor: "#fb0066", color: "white" }}
                className="btn position-relative m-1"
              >
                <ion-icon name="heart-sharp"></ion-icon>{" "}
              </button>
            </Link>
          </div>
          <div>
            <Button
              variant="outline"
              style={{ color: "#20BEAD", borderColor: "#20BEAD" }}
              onClick={handleSetCartItem}
            >
              ADD TO CART
            </Button>
            <Button
              variant="success mx-2"
              style={{ backgroundColor: "" }}
              onClick={setDataToLocalStorage}
            >
              <ion-icon name="arrow-forward-sharp"></ion-icon>
            </Button>
          </div>
        </Card.Body>
      </div>
    </div>
  );
}
