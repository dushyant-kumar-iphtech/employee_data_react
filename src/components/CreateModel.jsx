/* eslint-disable no-unreachable */
/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import "./../App.css";
import validator from "validator";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FloatingLabel, Row, Col } from "react-bootstrap";
const CreateModel = ({ saveData, show, handleClose }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    dob: "",
    city: "",
    state: "",
    address: "",
    phone: "",
    image: "",
    employment: "",
  });
  const [error, setError] = useState({
    email: "",
    phone: "",
  });
  function handleSaveDetails(event) {
    const { name, value } = event.target;

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

    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    if (error.email || error.phone) {
      alert("Please fill correct details .");
      return;
    }
    console.log("New Data is:--", employee);

    saveData(employee);
    handleClose();
    setEmployee({
      name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      address: "",
      dob: "",
      image: "",
      employment: "",
    });
  }
  function handleCloseTab() {
    setEmployee({
      name: "",
      email: "",
      phone: "",
      city: "",
      state: "",
      address: "",
      dob: "",
      image: "",
      employment: "",
    });
    handleClose();
  }

  return (
    <Modal size="lg" show={show} onHide={handleCloseTab}>
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">
          Add New Employe Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        <Form onSubmit={handleSubmitForm}>
          <Row className="mb-3">
            <Col>
              <FloatingLabel
                controlId="formFirstName"
                label="Full Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
                />
              </FloatingLabel>
            </Col>

            <Col>
              <FloatingLabel
                controlId="formEmail"
                label="Email Address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  name="email"
                  value={employee.email}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
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
                  value={employee.dob}
                  onChange={handleSaveDetails}
                  required
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
                  value={employee.phone}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
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
                  value={employee.city}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
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
                  value={employee.state}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
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
                  value={employee.address}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
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
                  value={employee.employment}
                  onChange={handleSaveDetails}
                  required
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
                  name="image"
                  value={employee.image}
                  onChange={handleSaveDetails}
                  placeholder=""
                  required
                />
              </FloatingLabel>
            </Col>
          </Row>
          <div className="flex-end">
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );

  {
    /**
    <div className="createModel">
      <h1>Add New Employee</h1>

      <form action="" className="addForm" onSubmit={handleSubmitForm}>
        <div className="test">
          <div className="test1">
            <label htmlFor="">
              <p>Name</p>
              <input
                type="text"
                name="name"
                value={employee.name}
                placeholder="Enter the full name"
                onChange={handleSaveDetails}
                required
              />
            </label>
            <label htmlFor="">
              <p>Email</p>
              <input
                type="text"
                name="email"
                value={employee.email}
                placeholder="Enter the email id"
                onChange={handleSaveDetails}
                required
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
                placeholder="Select date of birth"
                onChange={handleSaveDetails}
                required
              />
            </label>

            <label htmlFor="">
              <p>Phone</p>
              <input
                type="number"
                name="phone"
                id=""
                value={employee.phone}
                placeholder="Enter mobile no"
                onChange={handleSaveDetails}
                required
              />
            </label>
          </div>

          <div className="test1">
            <label htmlFor="">
              <p>City</p>
              <input
                type="text"
                name="city"
                value={employee.city}
                placeholder="City name"
                onChange={handleSaveDetails}
                required
              />
            </label>

            <label htmlFor="">
              <p>State</p>
              <input
                type="text"
                name="state"
                value={employee.state}
                placeholder="State name"
                onChange={handleSaveDetails}
                required
              />
            </label>
          </div>

          <div className="test1">
            <label htmlFor="">
              <p>Address</p>
              <input
                type="text"
                name="address"
                value={employee.address}
                placeholder="Enter Address"
                onChange={handleSaveDetails}
                required
              />
            </label>

            <label htmlFor="">
              <p>Image-URL</p>
              <input
                type="text"
                name="image"
                value={employee.image}
                placeholder="Enter Image URL"
                onChange={handleSaveDetails}
                required
              />
            </label>
          </div>

          <div className="">
            <label htmlFor="">
              <p>Employment</p>
              <input
                type="text"
                name="employment"
                value={employee.employment}
                placeholder="Set Employment"
                onChange={handleSaveDetails}
                required
              />
            </label>
          </div>
        </div>
        <br />

        <button className="submitbtn">Add</button>
        <button className="closebtn" onClick={() => saveModel(false)}>
          Close
        </button>
      </form>

      <br />
      <br />
    </div> )
     */
  }
};

export default CreateModel;
