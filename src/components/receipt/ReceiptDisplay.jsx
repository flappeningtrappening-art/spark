import I2of5Barcode from "./I2of5Barcode";
import { format } from "date-fns";

export default function ReceiptDisplay({ config, cartItems }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const taxRate = parseFloat(config.taxRate) || 0;
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const dateStr = config.dateTime
    ? format(new Date(config.dateTime), "MM/dd/yy HH:mm:ss")
    : format(new Date(), "MM/dd/yy HH:mm:ss");

  const paymentLabel =
    config.paymentMethod === "cash"
      ? "CASH"
      : config.paymentMethod === "credit"
      ? "CREDIT"
      : "DEBIT";

  return (
    <div className="bg-white text-black font-mono text-xs leading-relaxed max-w-[320px] mx-auto p-6 shadow-lg" style={{ fontFamily: "'Courier New', monospace" }}>
      {/* Header */}
      <div className="text-center mb-2">
        <div className="flex items-center justify-center mb-1">
          <svg viewBox="0 0 120 30" className="w-40 h-10">
            <rect width="120" height="30" fill="white" />
            <text x="60" y="22" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0071CE" fontFamily="Arial Black, Arial, sans-serif">
              Walmart
            </text>
            <circle cx="106" cy="12" r="6" fill="#FFC220" />
          </svg>
        </div>
        <p className="text-[10px] tracking-wider">Save money. Live better.</p>
      </div>

      <div className="border-t border-dashed border-gray-400 my-2" />

      {/* Store Info */}
      <div className="text-center text-[10px] space-y-0.5">
        <p>Walmart Supercenter</p>
        <p>{config.cityState}</p>
        <p>{config.phoneNumber}</p>
        <p>Manager: {config.storeManager}</p>
      </div>

      <div className="text-[10px] mt-1 space-y-0.5">
        <p>ST# {config.storeNumber}  OP# {config.operatorNumber}  TE# {config.terminalNumber}  TR# {config.transactionNumber}</p>
      </div>

      <div className="border-t border-dashed border-gray-400 my-2" />

      {/* Items */}
      <div className="space-y-0.5">
        {cartItems.map((item, idx) => (
          <div key={idx} className="flex justify-between">
            <span className="truncate mr-2 uppercase">{item.name}</span>
            <span className="whitespace-nowrap">{item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-gray-400 my-2" />

      {/* Totals */}
      <div className="space-y-0.5">
        <div className="flex justify-between">
          <span>SUBTOTAL</span>
          <span>{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>TAX {taxRate}%</span>
          <span>{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-sm mt-1">
          <span>TOTAL</span>
          <span>{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-400 my-2" />

      {/* Payment */}
      <div className="space-y-0.5">
        <div className="flex justify-between">
          <span>{paymentLabel} TEND</span>
          <span>{total.toFixed(2)}</span>
        </div>
        {config.paymentMethod !== "cash" && (
          <div className="text-[10px]">
            <p>CARD# {config.cardNumber}</p>
          </div>
        )}
        <div className="flex justify-between">
          <span>CHANGE DUE</span>
          <span>0.00</span>
        </div>
      </div>

      <div className="border-t border-dashed border-gray-400 my-2" />

      {/* Footer */}
      <div className="text-center text-[10px] space-y-0.5">
        <p># ITEMS SOLD {cartItems.length}</p>
        <p>TC# {config.tcNumber}</p>
        <p>{dateStr}</p>
      </div>

      <div className="my-3">
        <I2of5Barcode data={config.tcNumber} width={260} height={45} />
      </div>

      <div className="text-center text-[10px] space-y-1 mt-2">
        <p>THANK YOU FOR SHOPPING</p>
        <p>AT WALMART</p>
        <p className="text-[9px] text-gray-500 mt-2">*** CUSTOMER COPY ***</p>
      </div>
    </div>
  );
}
