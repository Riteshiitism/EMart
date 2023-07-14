import React from "react";
import PurchaseHistory from "./ProfileComponent/PurchaseHistory";
import UserProfile from "./ProfileComponent/UserProfile";
export default function Profile() {
  return (
    <>
      <div className="container" style={{ marginTop: "5rem" }}>
        <div className="row">
          <div className="col-4">
            <UserProfile />
          </div>
          <div className="col-8">
            <PurchaseHistory />
          </div>
        </div>
      </div>
    </>
  );
}
