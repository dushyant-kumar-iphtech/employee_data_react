/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from "react";
import "./../App.css";
//import { FaUserEdit } from "react-icons/fa";
//import { GrView } from "react-icons/gr";
import Tamplate from "./Tamplate";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TableFormate = ({ data, saveModel }) => {
  const [editTamplate, setEditTamplate] = useState(false);
  //const [viewTamplate, setViewTamplate] = useState(false);
  const [newData, setNewData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Handle opening the menu
  const handleClick = (event, value) => {
    setAnchorEl(event.currentTarget);
    setSelectedValue(value);
  };

  // Handle closing the menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setNewData(data.find((a) => a.id === selectedValue.id));
    handleShow();
    setEditTamplate(true);
    handleCloseMenu();
  };

  const handleViewClick = () => {
    setNewData(data.find((a) => a.id === selectedValue.id));
    handleShow();
    setEditTamplate(false);
    handleCloseMenu();
  };

  return (
    <div className="tableFormate">
      <div className="tableCSS">
        <table className="table">
          <thead>
            <tr>
              <th id="th1">Photo</th>
              <th id="th2">id</th>
              <th id="th3">Name</th>
              <th id="th4">Email</th>
              <th id="th5">DOB</th>
              <th id="th6">City</th>
              <th id="th7">State</th>
              <th id="th8">Phone</th>
              <th id="th9">Address</th>
              <th id="th10">Employment</th>
              <th id="th11">Action</th>
            </tr>
          </thead>
        </table>
        <div className="tableBodyContainer">
          <table className="table">
            <tbody className="tableBody">
              {data.map((value) => (
                <tr
                  key={value.id}
                  className={
                    value.id % 2 === 0 ? "evenbackground" : "oddbackground"
                  }
                >
                  <td headers="th1">
                    <img className="image" src={value.img} />
                  </td>
                  <td headers="th2">{value.id}</td>
                  <td headers="th3">{value.name}</td>
                  <td headers="th4">{value.email}</td>
                  <td headers="th5">{value.dob}</td>
                  <td headers="th6">{value.city}</td>
                  <td headers="th7">{value.state}</td>
                  <td headers="th8">{value.phone}</td>
                  <td headers="th9">{value.address}</td>
                  <td headers="th10">{value.employment}</td>
                  <td headers="th11">
                    <div className="btndiv">
                      <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, value)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleCloseMenu}
                        className="custom-menu"
                      >
                        <MenuItem
                          className="custom-menu-item"
                          onClick={() => handleEditClick(value)}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          className="custom-menu-item"
                          onClick={() => handleViewClick(value)}
                        >
                          View
                        </MenuItem>
                      </Menu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Tamplate
          data={newData}
          show={showModal}
          handleClose={handleClose}
          saveModel={saveModel}
          type={editTamplate ? "edit" : "view"}
        />
      )}
    </div>
  );
};

export default TableFormate;
