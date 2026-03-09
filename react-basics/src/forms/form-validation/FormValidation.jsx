import { useState } from "react";

function FormValidation() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    website: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!value) {
          error = "Username is required";
        } else if (value.length < 3) {
          error = "Username must be at least 3 characters";
        }
        break;

      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      case "age":
        if (!value) {
          error = "Age is required";
        } else if (value < 18 || value > 100) {
          error = "Age must be between 18 and 100";
        }
        break;

      case "website":
        if (value && !/^https?:\/\/.+/.test(value)) {
          error = "Website must start with http:// or https://";
        }
        break;

      case "phone":
        if (value && !/^\d{10}$/.test(value)) {
          error = "Phone must be 10 digits";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    );

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
      console.log("Form data:", formData);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Form Validation</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Username: *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              marginLeft: "10px",
              padding: "5px",
              border:
                touched.username && errors.username
                  ? "1px solid red"
                  : "1px solid #ccc",
            }}
          />
          {touched.username && errors.username && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.username}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email: *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              marginLeft: "10px",
              padding: "5px",
              border:
                touched.email && errors.email
                  ? "1px solid red"
                  : "1px solid #ccc",
            }}
          />
          {touched.email && errors.email && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.email}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password: *</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              marginLeft: "10px",
              padding: "5px",
              border:
                touched.password && errors.password
                  ? "1px solid red"
                  : "1px solid #ccc",
            }}
          />
          {touched.password && errors.password && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.password}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Confirm Password: *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              marginLeft: "10px",
              padding: "5px",
              border:
                touched.confirmPassword && errors.confirmPassword
                  ? "1px solid red"
                  : "1px solid #ccc",
            }}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.confirmPassword}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Age: *</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              marginLeft: "10px",
              padding: "5px",
              border:
                touched.age && errors.age ? "1px solid red" : "1px solid #ccc",
            }}
          />
          {touched.age && errors.age && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.age}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://example.com"
            style={{
              marginLeft: "10px",
              padding: "5px",
              border:
                touched.website && errors.website
                  ? "1px solid red"
                  : "1px solid #ccc",
            }}
          />
          {touched.website && errors.website && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.website}
            </div>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="1234567890"
            style={{
              marginLeft: "10px",
              padding: "5px",
              border:
                touched.phone && errors.phone
                  ? "1px solid red"
                  : "1px solid #ccc",
            }}
          />
          {touched.phone && errors.phone && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {errors.phone}
            </div>
          )}
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Submit
        </button>
      </form>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <h4>Validation Info:</h4>
        <p>* Required fields</p>
        <p>- Username: min 3 characters</p>
        <p>- Email: valid email format</p>
        <p>- Password: min 6 characters</p>
        <p>- Age: 18-100</p>
        <p>- Website: must start with http:// or https://</p>
        <p>- Phone: exactly 10 digits</p>
      </div>
    </div>
  );
}

export default FormValidation;
