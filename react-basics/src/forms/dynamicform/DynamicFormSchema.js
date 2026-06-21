const schema = [
  { id: "name", label: "Name", type: "text", required: true },
  { id: "email", label: "Email", type: "email", required: true },
  { id: "age", label: "Age", type: "number" },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    options: ["Male", "Female", "Other"],
  },
  {
    id: "phone",
    label: "Phone",
    type: "tel",
    pattern: "\\d{10}",
    placeholder: "9994279956",
  },
  { id: "city", label: "City", type: "text" },
  {
    id: "comments",
    label: "Comments",
    type: "textarea",
    placeholder: "Enter your comments here...",
  },
];

const initialFormData = Object.fromEntries(
  schema.map((field) => [field.id, ""]),
);

export { schema, initialFormData };
