import React from 'react';
import I2of5Barcode from "./I2of5Barcode";
import { format } from "date-fns";
import { ChevronLeft, Share2 } from 'lucide-react';

// NOTE: To use 'Hind', ensure you have it imported in your index.html or CSS:
// <link href="https://fonts.googleapis.com/css2?family=Hind:wght@400;700&display=swap" rel="stylesheet">

export default function ReceiptDisplay({ config, cartItems }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const taxRate = parseFloat(config.taxRate) || 0;
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const dateStr = config.dateTime
    ? format(new Date(config.dateTime), "MM/dd/yy HH:mm:ss")
    : format(new Date(), "MM/dd/yy HH:mm:ss");

  const paymentLabel = (config.paymentMethod || "DEBIT").toUpperCase();

  return (
    <div className="min-h-screen bg-[#0071CE] flex flex-col items-center">
      
      {/* App Header Bar - Standard App UI Font */}
      <div className="w-full max-w-md bg-[#0000FF] p-4 flex items-center justify-between text-white shadow-lg z-10">
        <ChevronLeft size={24} strokeWidth={3} className="cursor-pointer" />
        <h1 className="text-lg font-bold" style={{ fontFamily: "'Hind', sans-serif" }}>Receipt Detail</h1>
        <Share2 size={24} className="cursor-pointer" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md px-4 py-6">
        
        {/* THE RECEIPT - Strict Monospace Body with Branding Header */}
        <div className="bg-white text-black w-full p-6 shadow-2xl flex flex-col uppercase rounded-sm overflow-hidden">
          
          {/* Logo Section - Styled with Hind to mimic Walmart Myriad */}
          <div className="flex flex-col items-center mb-5">
            <div className="text-center">
              <h1 
                className="text-[44px] font-[700] italic leading-none tracking-tighter" 
                style={{ fontFamily: "'Hind', sans-serif", letterSpacing: "-0.05em" }}
              >
                Walmart<span className="not-italic text-[28px] align-top relative top-[-4px]">✱</span>
              </h1>
              <p 
                className="text-[11px] font-[400] tracking-tight -mt-1 lowercase capitalize"
                style={{ fontFamily: "'Hind', sans-serif" }}
              >
                Save money. Live better.
              </p>
            </div>
          </div>

          {/* Store Metadata - Reverting to Monospace for the "Print" look */}
          <div 
            className="text-center text-[12px] leading-[1.1] mb-4"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            <p className="font-bold">WAL*MART</p>
            <p>{config.phoneNumber} MGR. {config.storeManager}</p>
            <p>{config.cityState}</p>
            <p className="text-[11px] mt-1">
              ST# {config.storeNumber} OP# {config.operatorNumber} TE# {config.terminalNumber} TR# {config.transactionNumber}
            </p>
          </div>

          {/* Itemized List - Monospace is essential for column alignment */}
          <div 
            className="text-[11px] space-y-1 mb-4 border-t border-dashed border-gray-400 pt-3"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <span className="w-24 truncate text-left">{item.name}</span>
                <span className="flex-1 text-center tabular-nums text-[10px]">
                  {item.id || '007874235200'} F
                </span>
                <span className="w-12 text-right tabular-nums">
                  {item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Financials & Totals - Monospace */}
          <div 
            className="text-[11px] border-t border-dashed border-gray-400 pt-2 space-y-0.5"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            <div className="flex justify-end space-x-6">
              <span className="w-24 text-right">SUBTOTAL</span>
              <span className="w-14 text-right tabular-nums">{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-end space-x-6">
              <span className="w-24 text-right text-[10px]">TAX {taxRate.toFixed(4)} %</span>
              <span className="w-14 text-right tabular-nums">{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-end space-x-6 font-bold text-[14px] border-b-2 border-black pb-1 mt-1">
              <span className="w-24 text-right">TOTAL</span>
              <span className="w-14 text-right tabular-nums">{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Section - Monospace */}
          <div 
            className="text-[11px] mt-2 space-y-0.5"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            <div className="flex justify-end space-x-6">
              <span className="w-24 text-right">{paymentLabel} TEND</span>
              <span className="w-14 text-right tabular-nums">{total.toFixed(2)}</span>
            </div>
            {config.paymentMethod !== "cash" && (
              <div className="flex justify-end space-x-6 text-[10px]">
                <span className="w-32 text-right">{paymentLabel} **** **** ****</span>
                <span className="w-14 text-right tabular-nums">{config.cardNumber?.slice(-4) || '1234'}</span>
              </div>
            )}
            <div className="flex justify-end space-x-6">
              <span className="w-24 text-right">CHANGE DUE</span>
              <span className="w-14 text-right tabular-nums">0.00</span>
            </div>
          </div>

          {/* The Big Footer Variable - Styled with Hind for high visibility */}
          <div className="mt-8 mb-4 flex flex-col items-center">
            <h2 
              className="text-[28px] font-[700] tracking-widest"
              style={{ fontFamily: "'Hind', sans-serif" }}
            >
              # ITEMS SOLD {cartItems.length}
            </h2>
          </div>

          {/* Barcode and Timestamp - Monospace */}
          <div 
            className="flex flex-col items-center space-y-1"
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            <p className="text-[11px] tracking-widest font-bold">
              TC# {config.tcNumber}
            </p>
            <div className="w-full flex justify-center py-2 grayscale brightness-50 contrast-150">
               <I2of5Barcode data={config.tcNumber} width={300} height={50} />
            </div>
            <p className="text-[12px] font-bold mt-2">
              {dateStr}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
