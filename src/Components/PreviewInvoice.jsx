import InvoiceSummary from "./InvoiceSummary.jsx";

function PreviewInvoice({
  invoice,
  items,
  subtotal,
  tax,
  total,
  formatPrice,
}) {
  return (
    <div
      id="invoice-preview"
      className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-gray-800"
    >
      <div className="flex flex-col sm:flex-row justify-between gap-5 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">
            INVOICE
          </h1>
          <p className="text-gray-500 mt-2">Invoice Generator</p>
        </div>

        <div className="sm:text-right">
          <h2 className="text-xl font-bold">
            {invoice.company || "Your Company"}
          </h2>
          <p>Invoice #: {invoice.invoiceNumber || "INV-001"}</p>
          <p>Date: {invoice.date || "-"}</p>
          <p>Due Date: {invoice.dueDate || "-"}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 py-6 border-b">
        <div>
          <h3 className="font-semibold text-gray-500 mb-2">
            BILL TO
          </h3>
          <p className="font-bold">{invoice.client || "Client Name"}</p>
          <p>{invoice.email}</p>
          <p className="whitespace-pre-line">{invoice.address}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-500 mb-2">
            PAYMENT DETAILS
          </h3>
          <p>Payment Status: Unpaid</p>
          <p>Due Date: {invoice.dueDate || "-"}</p>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-indigo-50">
              <th className="p-3">Item</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.name || "Item"}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">{formatPrice(item.price)}</td>
                <td className="p-3 text-right">
                  {formatPrice(
                    Number(item.quantity) * Number(item.price)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-6">
        <div className="w-full sm:w-72">
          <InvoiceSummary
            subtotal={subtotal}
            tax={tax}
            total={total}
            formatPrice={formatPrice}
          />
        </div>
      </div>

      <div className="mt-8 border-t pt-5">
        <h3 className="font-semibold mb-2">Notes</h3>
        <p className="text-gray-600 whitespace-pre-line">
          {invoice.notes || "Thank you for your business!"}
        </p>
      </div>

      <div className="text-center mt-8 border-t pt-5 text-gray-500">
        Thank you for choosing us!
      </div>
    </div>
  );
}

export default PreviewInvoice;