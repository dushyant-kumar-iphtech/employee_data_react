/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import "./../App.css";
import validator from "validator";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FloatingLabel, Row, Col } from "react-bootstrap";
const Tamplate = ({ data, show, handleClose, saveModel, type }) => {
  const [newData, setNewData] = useState(data);
  const [error, setError] = useState("");

  function handleSaveDetails(e) {
    console.log(e.target.name);
    const { name, value } = e.target;

    if (name === "email") {
      if (!validator.isEmail(value)) {
        setError((prevError) => ({
          ...prevError,
          email: "Invalid email address",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          email: "",
        }));
      }
    }

    if (name === "phone") {
      const isNumeric = /^\d*$/.test(value);
      console.log("Phone number:", value);
      if (!isNumeric) {
        setError((prevError) => ({
          ...prevError,
          phone: "Phone number must contain only digits",
        }));
        return;
      } else if (value.length < 10) {
        setError((prevError) => ({
          ...prevError,
          phone: "Phone number must be 10 digits",
        }));
      } else if (value.length > 10) {
        setError((prevError) => ({
          ...prevError,
          phone: "",
        }));
        return;
      } else if (!validator.isMobilePhone(value, "any", { strictMode: true })) {
        setError((prevError) => ({
          ...prevError,
          phone: "",
        }));
      } else {
        setError((prevError) => ({
          ...prevError,
          phone: "",
        }));
      }
    }

    setNewData({
      ...newData,
      [name]: value,
    });
  }

  function handleSaveForm(e) {
    e.preventDefault();
    console.log("The edit value is : -");
    console.log(newData);
    saveModel(newData);
    handleClose();
  }
  let image =
    newData.img ||
    "https://i0.wp.com/ctmirror-images.s3.amazonaws.com/wp-content/uploads/2021/01/dummy-man-570x570-1.png?fit=570%2C570&ssl=1";

  return (
    <Modal size="lg" show={show} onHide={handleClose}>
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">
          {type === "edit" ? "Edit Details" : "View Details"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        <Form onSubmit={handleSaveForm}>
          <Row className="mb-3">
            <Col className="image-col">
              <div className="imageDiv2">
                <img src={image} alt="" className="tamplateImage" />
              </div>
            </Col>
            <Col>
              <FloatingLabel
                controlId="formFirstName"
                label="Full Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="name"
                  value={newData.name}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
                  disabled={type === "view"}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="formEmail"
                label="Email Address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  name="email"
                  value={newData.email}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
                  disabled={type === "view"}
                />
                {error.email && (
                  <span className="error-message">{error.email}</span>
                )}
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <FloatingLabel controlId="formDOB" label="DOB" className="mb-3">
                <Form.Control
                  type="date"
                  name="dob"
                  value={newData.dob}
                  onChange={handleSaveDetails}
                  required
                  disabled={type === "view"}
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel
                controlId="formPhone"
                label="Phone Number"
                className="mb-2"
              >
                <Form.Control
                  type="tel"
                  name="phone"
                  value={newData.phone}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
                  disabled={type === "view"}
                />
                {error.phone && (
                  <span className="error-message">{error.phone}</span>
                )}
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <FloatingLabel controlId="formCity" label="City" className="mb-2">
                <Form.Control
                  type="text"
                  name="city"
                  value={newData.city}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
                  disabled={type === "view"}
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel
                controlId="formState"
                label="State"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  name="state"
                  value={newData.state}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
                  disabled={type === "view"}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <FloatingLabel
                controlId="formAddress"
                label="Address"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  name="address"
                  value={newData.address}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
                  disabled={type === "view"}
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel
                controlId="formEmployment"
                label="Employment Status"
                className="mb-3"
              >
                <Form.Control
                  as="select"
                  name="employment"
                  value={newData.employment}
                  onChange={handleSaveDetails}
                  required
                  disabled={type === "view"}
                >
                  <option value="">Select</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="HR">HR</option>
                  <option value="CTO">CTO</option>
                  <option value="Manager">Manager</option>
                  <option value="Intern">Intern</option>
                  <option value="Director">Director</option>
                </Form.Control>
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <FloatingLabel
                controlId="formImage"
                label="Image URL"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  name="img"
                  value={newData.img}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
                  disabled={type === "view"}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <div className="flex-end">
            {type === "edit" && (
              <Button variant="primary" type="submit">
                Save
              </Button>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Tamplate;

{
  /**
    <div className="createModel">
      <h1>{type === "edit" ? "Edit Detail" : "View Details"}</h1>

      <div className="imageDiv">
        <img src={image} alt="" />
      </div>
      <form action="" className="addForm" onSubmit={handleSaveForm}>
        <div className="test">
          <div className="test1">
            <label htmlFor="">
              <p>Name</p>
              <input
                type="text"
                name="name"
                value={newData.name}
                placeholder="Enter full name"
                onChange={(e) => handleSaveDetails(e)}
                disabled={type === "view"}
              />
            </label>
            <label htmlFor="">
              <p>Email</p>
              <input
                type="email"
                name="email"
                value={newData.email}
                placeholder="Enter email id"
                onChange={handleSaveDetails}
                disabled={type === "view"}
              />
            </label>
          </div>
          <div className="test1">
            <label htmlFor="">
              <p>DOB</p>
              <input
                type="date"
                name="dob"
                id=""
                value={newData.dob}
                placeholder="Select date of birth"
                onChange={handleSaveDetails}
                disabled={type === "view"}
              />
            </label>

            <label htmlFor="">
              <p>Phone</p>
              <input
                type="number"
                name="phone"
                id=""
                value={newData.phone}
                placeholder="Enter mobile no"
                onChange={handleSaveDetails}
                disabled={type === "view"}
              />
            </label>
          </div>

          <div className="test1">
            <label htmlFor="">
              <p>City</p>
              <input
                type="text"
                name="city"
                value={newData.city}
                placeholder="City name"
                onChange={handleSaveDetails}
                disabled={type === "view"}
              />
            </label>

            <label htmlFor="">
              <p>State</p>
              <input
                type="text"
                name="state"
                value={newData.state}
                placeholder="State name"
                onChange={handleSaveDetails}
                disabled={type === "view"}
              />
            </label>
          </div>

          <div className="test1">
            <label htmlFor="">
              <p>Address</p>
              <input
                type="text"
                name="address"
                value={newData.address}
                placeholder="Enter Address"
                onChange={handleSaveDetails}
                disabled={type === "view"}
              />
            </label>

            <label htmlFor="">
              <p>Image-URL</p>
              <input
                type="text"
                name="img"
                value={newData.img}
                placeholder="Enter Image URL"
                onChange={handleSaveDetails}
                disabled={type === "view"}
              />
            </label>
          </div>

          <div className="test1">
            <label htmlFor="">
              <p>Employment</p>
              <input
                type="text"
                name="employment"
                value={newData.employment}
                placeholder="Set Employment"
                onChange={handleSaveDetails}
                disabled={type === "view"}
              />
            </label>
            <label htmlFor="">
              <p>Employee ID</p>
              <input
                type="text"
                name="employeeID"
                value={newData.id}
                placeholder=""
                onChange={handleSaveDetails}
                disabled
              />
            </label>
          </div>
        </div>
        <br />

        <button className="submitbtn">Save</button>
        <button
          className="closebtn"
          onClick={() => {
            closeModel(false);
          }}
        >
          Close
        </button>
      </form>
    </div>
     */
}
