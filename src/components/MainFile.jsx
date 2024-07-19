import React, { useState, useEffect } from "react";
import Data from "./../data/employeeDetails.json";
import CreateModel from "./CreateModel";
import TableFormate from "./TableFormate";
import { IoMdPersonAdd } from "react-icons/io";
import "./../App.css";
import { CiSearch } from "react-icons/ci";

const MainFile = () => {
  const [data, setData] = useState(Data);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  let newIndex = Object.keys(data).length + 1;

  function handleSetData(newData) {
    setData((prev) => [
      ...prev,
      {
        id: newIndex++,
        name: newData.name,
        email: newData.email,
        phone: newData.phone,
        employment: newData.employment,
        city: newData.city,
        state: newData.state,
        address: newData.address,
        img: newData.image,
        dob: newData.dob,
      },
    ]);
    console.log("receive Data is :--", newData);
  }

  function handleEditData(updateData) {
    setData(
      data.map((val) => {
        if (val.id === updateData.id) {
          return updateData;
        } else {
          return val;
        }
      })
    );
  }
  function handleSearch(e) {
    setSearch(e.target.value);
  }
  useEffect(() => {
    if (search === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.city.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="main">
      <h1 className="headName">Employee Details</h1>

      <div className="secondMain">
        <div className="searchDiv">
          {search === "" && <CiSearch className="searchIcon" />}

          <input
            type="search"
            name=""
            id=""
            className="search"
            onChange={handleSearch}
            placeholder="Search Name or city or email"
          />
        </div>

        <div className="createbtnDiv">
          <button className="createbtn" onClick={handleShow}>
            Create {<IoMdPersonAdd />}
          </button>

          <CreateModel
            saveData={handleSetData}
            show={showModal}
            handleClose={handleClose}
          />

          <TableFormate
            data={search === "" ? data : filteredData}
            saveModel={handleEditData}
          />
        </div>
      </div>
    </div>
  );
};

export default MainFile;
