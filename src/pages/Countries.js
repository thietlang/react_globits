import React, { useState } from "react";
import { CountryData } from "./CountryData";

const Countries = () => {
  const [countries, setCountries] = useState(CountryData);
  const [selectedCountry, setSelectedCountry] = useState(null); // Lưu quốc gia đang chỉnh sửa
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false); // Quản lý trạng thái popup Edit
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // Quản lý trạng thái popup Delete
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false); // Quản lý trạng thái popup Add

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
    setIsDeletePopupOpen(false); // Đóng popup sau khi xóa
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCountry({ ...selectedCountry, [name]: value });
  };

  const handleSave = () => {
    setCountries(
      countries.map((country) =>
        country.code === selectedCountry.code ? selectedCountry : country
      )
    );
    setIsEditPopupOpen(false); // Đóng popup sau khi lưu
  };

  const handleAddNewCountry = () => {
    setSelectedCountry({ name: "", code: "", description: "" }); // Reset dữ liệu
    setIsAddPopupOpen(true); // Mở popup Add
  };

  const handleAddSave = () => {
    setCountries([...countries, selectedCountry]); // Thêm quốc gia mới
    setIsAddPopupOpen(false); // Đóng popup sau khi lưu
  };

  const handleCancel = () => {
    setIsEditPopupOpen(false); // Đóng popup nếu hủy
    setIsDeletePopupOpen(false); // Đóng popup xóa nếu hủy
    setIsAddPopupOpen(false); // Đóng popup Add nếu hủy
  };

  return (
    <div>
      <h1>Country List</h1>
      <button onClick={handleAddNewCountry}>Add New Country</button> {/* Nút Add */}
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

      {/* Popup Edit */}
      {isEditPopupOpen && (
        <div style={popupStyles}>
          <h2>Edit Country</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={selectedCountry.name}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Code:
              <input
                type="text"
                name="code"
                value={selectedCountry.code}
                onChange={handleInputChange}
                disabled // Không cho phép sửa code
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={selectedCountry.description}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Popup Add */}
      {isAddPopupOpen && (
        <div style={popupStyles}>
          <h2>Add New Country</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={selectedCountry.name}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Code:
              <input
                type="text"
                name="code"
                value={selectedCountry.code}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={selectedCountry.description}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="button" onClick={handleAddSave}>
              Save
            </button>
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
