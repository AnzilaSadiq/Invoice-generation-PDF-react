function InvoiceSummary({ subtotal, tax, total, formatPrice }) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      <div className="flex justify-between">
        <span>Tax (10%)</span>
        <span>{formatPrice(tax)}</span>
      </div>

      <div className="border-t pt-3 flex justify-between text-lg font-bold text-indigo-700">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}

export default InvoiceSummary;