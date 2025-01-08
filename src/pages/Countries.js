import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CountryData } from "./CountryData";


const Countries = () => {
  const [countries, setCountries] = useState(CountryData);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);

  const handleEdit = (country) => {
    setSelectedCountry(country);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (country) => {
    setSelectedCountry(country);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    setCountries(countries.filter((country) => country.code !== selectedCountry.code));
    setIsDeletePopupOpen(false);
  };

  const handleAddNewCountry = () => {
    setSelectedCountry({ name: "", code: "", description: "" });
    setIsAddPopupOpen(true);
  };

  const handleCancel = () => {
    setIsEditPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsAddPopupOpen(false);
  };

  // Schema xác thực sử dụng Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    code: Yup.string().required("Code is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: selectedCountry || { name: "", code: "", description: "" },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (isEditPopupOpen) {
        // Update existing country
        setCountries(
          countries.map((country) =>
            country.code === values.code ? values : country
          )
        );
        setIsEditPopupOpen(false);
      } else if (isAddPopupOpen) {
        // Add new country
        setCountries([...countries, values]);
        setIsAddPopupOpen(false);
      }
    },
  });

  return (
    <div>
      <h1>Country List</h1>
      <button onClick={handleAddNewCountry}>Add New Country</button>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.code}>
              <td>{country.name}</td>
              <td>{country.code}</td>
              <td>{country.description}</td>
              <td>
                <button onClick={() => handleEdit(country)}>Edit</button>
                <button onClick={() => handleDelete(country)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Edit/Add */}
      {(isEditPopupOpen || isAddPopupOpen) && (
        <div style={popupStyles}>
          <h2>{isEditPopupOpen ? "Edit Country" : "Add New Country"}</h2>
          <form onSubmit={formik.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name && (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              )}
            </label>
            <br />
            <label>
              Code:
              <input
                type="text"
                name="code"
                value={formik.values.code}
                onChange={formik.handleChange}
                disabled={isEditPopupOpen}
              />
              {formik.errors.code && formik.touched.code && (
                <div style={{ color: "red" }}>{formik.errors.code}</div>
              )}
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.errors.description && formik.touched.description && (
                <div style={{ color: "red" }}>{formik.errors.description}</div>
              )}
            </label>
            <br />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Popup Delete */}
      {isDeletePopupOpen && (
        <div style={popupStyles}>
          <h2>Confirm Delete</h2>
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedCountry?.name}</strong>?
          </p>
          <button onClick={confirmDelete}>Yes, Delete</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

// CSS cho popup
const popupStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
};

export default Countries;
