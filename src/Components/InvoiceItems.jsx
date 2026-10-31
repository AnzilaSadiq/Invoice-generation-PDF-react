import { Plus, Trash2 } from "lucide-react";

function InvoiceItems({ items, onAdd, onUpdate, onRemove }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Invoice Items</h2>

        <button
          onClick={onAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-1 sm:grid-cols-4 gap-3 border p-3 rounded-lg"
        >
          <input
            value={item.name}
            placeholder="Item Name"
            onChange={(e) =>
              onUpdate(item.id, "name", e.target.value)
            }
            className="border p-2 rounded-lg"
          />

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              onUpdate(item.id, "quantity", e.target.value)
            }
            className="border p-2 rounded-lg"
            placeholder="Quantity"
          />

          <input
            type="number"
            min="0"
            value={item.price}
            onChange={(e) =>
              onUpdate(item.id, "price", e.target.value)
            }
            className="border p-2 rounded-lg"
            placeholder="Price"
          />

          <button
            onClick={() => onRemove(item.id)}
            className="bg-red-100 text-red-600 rounded-lg flex justify-center items-center p-2"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default InvoiceItems;