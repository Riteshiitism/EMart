import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import { API } from "../../config";

function Customers() {
  const [customers, setCustomers] = useState([]);

  async function getCustomers() {
    const customersRes = await axios.get(`${API}/auth/login`);
    setCustomers(customersRes.data);
  }

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <CustomerForm getCustomers={getCustomers} />
      <CustomerList customers={customers} />
    </div>
  );
}

export default Customers;
