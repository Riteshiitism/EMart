import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tag from "../Items/Tag";
import { useNavigate } from "react-router-dom";
import ViewProduct from "../Items/ViewProduct";
export default function WishListCard(props) {
  const navigate = useNavigate();
  const ViewProductObject = {
    name: props.name,
    price: props.price,
    tagsUI: props.tagsUI,
    image: props.imageLink,
    itemId: props.id,
  };

  const handleClick = async (event) => {
    // console.log(ViewProductObject);
    let id = ViewProductObject.itemId;
    console.log({ productId: id });

    let userId = localStorage.getItem("userId");
    // console.log(userId);

    try {
      const response = await fetch(
        "http://localhost:5000/wishlist/delete-wishlist/" + userId,
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
        console.log("element deleted from wishlist");
        window.location.reload();
        // navigate('/wishList');
      } else {
        console.log("Not deleted");
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };
  return (
    <>
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
                name="heart-sharp"
                style={{
                  marginLeft: "5rem",
                  color: "#fb0066",
                  fontSize: "30px",
                }}
              ></ion-icon>
            </div>
            <Card.Text style={{ minHeight: "5rem" }}>
              {props.tagsUI && Array.isArray(props.tagsUI) ? (
                props.tagsUI.map((item) => {
                  return <Tag value={item} />;
                })
              ) : (
                <div>No tags available</div>
              )}
            </Card.Text>
            <div>
              <button
                type="button"
                className="btn btn-outline-danger"
                id={ViewProductObject.itemId}
                onClick={handleClick}
              >
                REMOVE FROM WISHLIST
              </button>
              <Button
                variant="success mx-2"
                style={{ backgroundColor: "" }}
                id={ViewProductObject.itemId}
                onClick={handleClick}
              >
                <ion-icon name="arrow-forward-sharp"></ion-icon>
              </Button>
            </div>
          </Card.Body>
        </div>
      </div>
    </>
  );
}
