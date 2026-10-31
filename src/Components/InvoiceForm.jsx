function InvoiceForm({ invoice, onChange }) {
  const fields = [
    { name: "company", label: "Company Name", placeholder: "Your Company" },
    { name: "invoiceNumber", label: "Invoice Number", placeholder: "INV-001" },
    { name: "date", label: "Invoice Date", type: "date" },
    { name: "dueDate", label: "Due Date", type: "date" },
    { name: "client", label: "Client Name", placeholder: "Client Name" },
    { name: "email", label: "Client Email", placeholder: "email@example.com" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">Invoice Details</h2>

      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium mb-1">
            {field.label}
          </label>

          <input
            type={field.type || "text"}
            name={field.name}
            value={invoice[field.name]}
            onChange={onChange}
            placeholder={field.placeholder || ""}
            className="w-full border rounded-lg p-3 outline-indigo-500"
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium mb-1">
          Client Address
        </label>

        <textarea
          name="address"
          value={invoice.address}
          onChange={onChange}
          className="w-full border rounded-lg p-3 outline-indigo-500"
          rows="3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Notes
        </label>

        <textarea
          name="notes"
          value={invoice.notes}
          onChange={onChange}
          className="w-full border rounded-lg p-3 outline-indigo-500"
          rows="3"
        />
      </div>
    </div>
  );
}

export default InvoiceForm;