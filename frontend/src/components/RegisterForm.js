import React, { useState } from "react";
import "./RegisterForm.css"; // Import the CSS for styling

function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!form.email.includes("@")) newErrors.email = "Invalid email";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.age.trim()) newErrors.age = "Age is required";
    if (!form.gender.trim()) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setForm({
          name: "",
          email: "",
          password: "",
          phone: "",
          address: "",
          age: "",
          gender: "",
        });
        setErrors({});
      } else {
        alert("Server Error: " + data.message);
      }
    } catch (error) {
      alert("Could not connect to the server!");
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          {errors.address && <p className="error">{errors.address}</p>}
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">-- Select Gender --</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegisterForm;
