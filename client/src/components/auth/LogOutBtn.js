import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { API } from "../../config";
import { Button } from "react-bootstrap";
function LogOutBtn() {
  const { getLoggedIn } = useContext(AuthContext);

  const history = useNavigate();

  async function logOut() {
    await axios.get(`${API}/auth/logout`);
    await getLoggedIn();
    history("/login");
  }

  return (
    <Button
      variant="outline"
      style={{ color: "#20BEAD", borderColor: "#20BEAD" }}
      onClick={logOut}
    >
      Log Out
    </Button>
  );
}

export default LogOutBtn;
