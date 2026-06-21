import { useState } from "react";
import { schema, initialFormData } from "./DynamicFormSchema";
import "./DynamicForm.css";
function DynamicForm() {
  console.log("Schema:", schema);
  console.log("Initial Form Data:", initialFormData);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    schema.forEach((field) => {
      if (field.required && !formData[field.id].trim()) {
        newErrors[field.id] = `${field.label} is required.`;
      } else if (field.pattern) {
        const regex = new RegExp(field.pattern);
        if (!regex.test(formData[field.id])) {
          newErrors[field.id] = `Invalid ${field.label.toLowerCase()} format.`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e, id) => {
    setErrors({
      ...errors,
      [id]: "",
    });
    setFormData({
      ...formData,
      [id]: e.target.value,
    });
  };

  const renderField = (field) => {
    const commonProps = {
      id: field.id,
      name: field.id,
      value: formData[field.id],
      required: field.required || false,
      placeholder: field.placeholder || "",
      onChange: (e) => handleInputChange(e, field.id),
    };

    if (field.type === "select") {
      return (
        <select {...commonProps}>
          <option value="">-- Select --</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "textarea") {
      return <textarea rows={4} {...commonProps} />;
    }

    // text, email, tel, number all use <input>
    return <input type={field.type} pattern={field.pattern} {...commonProps} />;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted! Check console for form data.");
      console.log("Submitted Form Data:", formData);
      // Reset form after submission
      setErrors({});
      setFormData(initialFormData);
    }
  };

  return (
    <div className="dynamic-form-container">
      <h2>DynamicForm</h2>
      <form onSubmit={handleSubmit} noValidate>
        {schema.map((field) => (
          <div key={field.id} className="form-field">
            <label htmlFor={field.id}>
              {field.label}
              {field.required && <span style={{ color: "red" }}> *</span>}
            </label>
            {renderField(field)}
            {errors[field.id] && (
              <span
                style={{
                  display: "flex",
                  color: "red",
                  justifyContent: "flex-end",
                  fontSize: "12px",
                }}
              >
                {errors[field.id]}
              </span>
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DynamicForm;
