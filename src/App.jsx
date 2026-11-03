import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";

import InvoiceForm from './components/InvoiceForm'
import InvoiceItems from './components/InvoiceItems'
import InvoiceSummary from './components/InvoiceSummary'
import PreviewInvoice from './components/PreviewInvoice'


function App() {
  const [invoice, setInvoice] = useState({
    company: "",
    invoiceNumber: "INV-001",
    date: "",
    dueDate: "",
    client: "",
    email: "",
    address: "",
    notes: "",
  });

  const [items, setItems] = useState([
    {
      id: 1,
      name: "",
      quantity: 1,
      price: 0,
    },
  ]);

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;

    setInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => {
    return sum + Number(item.quantity || 0) * Number(item.price || 0);
  }, 0);

  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const formatPrice = (amount) => {
    return `Rs. ${Number(amount || 0).toFixed(2)}`;
  };

  const downloadPDF = async () => {
    const invoiceElement = document.getElementById("invoice-preview");

    if (!invoiceElement) {
      alert(
        "Invoice preview nahi mil raha. PreviewInvoice.jsx mein invoice-preview ID check karein.",
      );
      return;
    }

    try {
      const canvas = await html2canvas(invoiceElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imageWidth = pageWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      let heightLeft = imageHeight;
      let position = 0;

      pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight);

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imageHeight;

        pdf.addPage();

        pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight);

        heightLeft -= pageHeight;
      }

      pdf.save("My-Invoice.pdf");
    } catch (error) {
      console.error("PDF Generation Error:", error);

      alert("PDF generate nahi hui. Dobara try karein.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-8">
          Invoice Generator
        </h1>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-6">
            <InvoiceForm invoice={invoice} onChange={handleInvoiceChange} />

            <InvoiceItems
              items={items}
              onAdd={addItem}
              onUpdate={updateItem}
              onRemove={removeItem}
            />
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Invoice Preview</h2>

            <PreviewInvoice
              invoice={invoice}
              items={items}
              subtotal={subtotal}
              tax={tax}
              total={total}
              formatPrice={formatPrice}
            />

            <InvoiceSummary
              subtotal={subtotal}
              tax={tax}
              total={total}
              formatPrice={formatPrice}
            />

            <button
              onClick={downloadPDF}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
