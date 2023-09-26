import React from "react";
import { API } from "../../config";

export default function Filter(props) {
  const [toSearch, setToSearch] = React.useState("");
  const [option,setOption] = React.useState("1");

  async function fetchData(event) {
    event.preventDefault();
    
    const requestOptionsName = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: toSearch }),
    };
    const requestOptionsTag = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: toSearch }),
    };
    const requestOptionsPrice = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: toSearch }),
    };

    
    console.log(option);
    let API_URL ="";
    let requestOptions;
    if(option==='1'){
      // console.log(1);
      API_URL = `${API}/product/findByName`;
      requestOptions = requestOptionsName;
    }
    else if(option==='2'){
      // console.log(2);
      API_URL = `${API}/tags/findByTag`;
      requestOptions = requestOptionsTag;
    }
    else if(option==='3'){
      // console.log(3);
      API_URL = `${API}/product/filterByPrice`;
      requestOptions = requestOptionsPrice;
    }
    
    console.log(API_URL);
    const response = await fetch(
      API_URL,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    //  send data to item
    if (data) {
      props.setFilterData(data);
    }
  }
  return (
    <div
      style={{
        margin: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop:'5rem'
      }}
    >
      <form className="d-flex" role="search" style={{ maxWidth: "60rem" }}>
        <select
          className="form-select mx-1"
          aria-label="Default select example"
          style={{ maxWidth: "10rem" }}
          onChange={(e)=>{setOption(e.target.value)}}
          defaultValue={"1"}
        >
          {/* <option selected>FILTER BY</option> */}
          <option value="1" > Name</option>
          <option value="2">Tags</option>
          <option value="3">Price Under</option>
          <option value="4">any</option>
        </select>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ maxWidth: "30rem" }}
          value={toSearch}
          onChange={(event) => setToSearch(event.target.value)}
        />
        <button className="btn btn-outline-success" onClick={fetchData}>
          Search
        </button>
      </form>
    </div>
  );
}
