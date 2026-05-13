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

  const paymentMethodLabel = (config.paymentMethod || "DEBIT").toUpperCase();

  return (
    <div 
      className="bg-white text-black p-8 mx-auto w-full max-w-[380px] shadow-sm select-none" 
      style={{ 
        fontFamily: "'Courier New', Courier, monospace",
        lineHeight: "1.2",
        letterSpacing: "-0.02em"
      }}
    >
      {/* Walmart Logo Section */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-1">
          <span className="text-[44px] font-[900] tracking-tight text-black" style={{ fontFamily: "Arial Black, sans-serif" }}>Walmart</span>
          <div className="absolute -right-8 top-1 flex items-center justify-center w-8 h-8">
             <div className="grid grid-cols-3 gap-0.5 transform rotate-15">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-1.5 h-4 bg-black rounded-full origin-center" style={{ transform: `rotate(${i * 60}deg) translate(0, -6px)` }}></div>
                ))}
             </div>
          </div>
        </div>
        <p className="text-[13px] font-bold tracking-tight -mt-1">Save money. Live better.</p>
      </div>

      {/* Store Header */}
      <div className="text-center text-[12px] font-bold space-y-0.5 mb-4">
        <p className="uppercase">WAL*MART</p>
        <p>{config.phoneNumber || "5753788050"} Mgr. {(config.storeManager || "MARISA").toUpperCase()}</p>
        <p className="uppercase">{config.cityState || "RUIDOSO DOWNS, NM"}</p>
        <p className="tracking-tight">
          ST# {config.storeNumber || "851"} &nbsp; 
          OP# {config.operatorNumber || "9013"} &nbsp; 
          TE# {config.terminalNumber || "13"} &nbsp; 
          TR# {config.transactionNumber || "3363"}
        </p>
      </div>

      {/* Item List */}
      <div className="text-[12px] font-bold mb-4 space-y-0.5">
        {cartItems.map((item, idx) => (
          <div key={idx} className="flex justify-between items-end">
            <div className="flex gap-4">
              <span className="w-24 truncate uppercase">{item.name}</span>
              <span className="text-[11px] font-normal font-mono">{item.upc || "0000000000"}</span>
            </div>
            <span>{item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* Financials */}
      <div className="text-[12px] font-bold mb-6 space-y-0.5">
        <div className="flex justify-between pl-20">
          <span>SUBTOTAL</span>
          <span>{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pl-4">
          <div className="flex gap-2">
            <span>TAX 1</span>
            <span>{taxRate.toFixed(4)} %</span>
          </div>
          <span>{tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pl-20 text-[14px]">
          <span>TOTAL</span>
          <span>{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pl-12 uppercase">
          <span>VISA {paymentMethodLabel} TEND</span>
          <span>{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pl-12 uppercase text-[11px]">
          <span>VISA **** **** **** {config.cardNumber?.slice(-4) || "7524"}</span>
        </div>
        <div className="flex justify-between pl-12">
          <span>CHANGE DUE</span>
          <span>0.00</span>
        </div>
      </div>

      {/* Items Sold Count */}
      <div className="text-center border-t border-black pt-4 mb-4">
        <p className="text-[20px] font-black tracking-[0.2em]"># ITEMS SOLD {cartItems.length}</p>
      </div>

      {/* TC Section */}
      <div className="text-center text-[11px] font-bold mb-2">
        <p className="mb-1">TC# {config.tcNumber || "2060 4322 2266 1619 2819"}</p>
        <div className="flex justify-center py-1 bg-white">
           <I2of5Barcode data={config.tcNumber || "20604322226616192819"} width={300} height={45} />
        </div>
      </div>

      {/* Footer Date */}
      <div className="text-center text-[12px] font-bold mt-4">
        <p>{dateStr}</p>
      </div>
    </div>
  );
}
