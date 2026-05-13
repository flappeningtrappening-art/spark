import React from 'react';
import I2of5Barcode from "./I2of5Barcode";
import { format } from "date-fns";
import { ChevronLeft, Share2 } from 'lucide-react';

export default function ReceiptDisplay({ config, cartItems }) {
  // Variable Data Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const taxRate = parseFloat(config.taxRate) || 0;
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  const dateStr = config.dateTime
    ? format(new Date(config.dateTime), "MM/dd/yy HH:mm:ss")
    : format(new Date(), "MM/dd/yy HH:mm:ss");

  const paymentLabel = (config.paymentMethod || "DEBIT").toUpperCase();

  return (
    <div className="min-h-screen bg-[#F2F2F2] font-sans pb-10">
      
      {/* App Header - Walmart Blue #0000FF */}
      <div className="bg-[#0000FF] p-4 flex items-center justify-between text-white sticky top-0 z-10 shadow-md">
        <ChevronLeft size={26} strokeWidth={2.5} className="cursor-pointer" />
        <h1 className="text-[19px] font-medium tracking-wide">Receipt Detail</h1>
        <Share2 size={24} strokeWidth={2} className="cursor-pointer" />
      </div>

      {/* Thermal Receipt - Scaled and styled to match receipt.png */}
      <div className="bg-white text-black max-w-[340px] mx-auto my-6 p-7 shadow-lg border border-gray-100 flex flex-col">
        
        {/* Walmart Branding Header */}
        <div className="flex flex-col items-center mb-5">
          <div className="text-center">
            <h1 className="text-[42px] font-[900] italic leading-none tracking-[-0.06em]" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              Walmart<span className="not-italic text-[28px] align-top relative top-[-4px]">✱</span>
            </h1>
            <p className="text-[11px] font-bold tracking-tight -mt-1">Save money. Live better.</p>
          </div>
        </div>

        {/* Store Metadata - Dynamically populated from config */}
        <div className="text-center text-[12px] font-mono leading-[1.2] uppercase mb-4">
          <p className="font-bold whitespace-nowrap text-center">WAL*MART</p>
          <p>{config.phoneNumber} MGR. {config.storeManager}</p>
          <p>{config.cityState}</p>
          <p className="text-[11px] mt-1 tracking-tight">
            ST# {config.storeNumber} OP# {config.operatorNumber} TE# {config.terminalNumber} TR# {config.transactionNumber}
          </p>
        </div>

        {/* Itemized List - Variable items in fixed-width columns */}
        <div className="font-mono text-[11px] space-y-1.5 mb-5 border-t border-dashed border-gray-300 pt-3">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex uppercase items-baseline">
              <span className="w-[100px] truncate">{item.name}</span>
              <span className="flex-1 text-center tabular-nums px-1 tracking-tight">
                {item.id || '000000000000'} F
              </span>
              <span className="w-[60px] text-right tabular-nums">
                {item.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Financial Totals */}
        <div className="font-mono text-[12px] border-t border-dashed border-gray-300 pt-2 space-y-1">
          <div className="flex justify-end space-x-4">
            <span className="w-32 text-right">SUBTOTAL</span>
            <span className="w-16 text-right tabular-nums">{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-end space-x-4">
            <span className="w-32 text-right text-[10px]">TAX {taxRate.toFixed(4)} %</span>
            <span className="w-16 text-right tabular-nums">{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-end space-x-4 font-bold text-[14px] mt-1 border-b-2 border-black pb-1">
            <span className="w-32 text-right">TOTAL</span>
            <span className="w-16 text-right tabular-nums">{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Logic */}
        <div className="font-mono text-[12px] mt-2 space-y-1 uppercase">
          <div className="flex justify-end space-x-4">
            <span className="w-32 text-right">{paymentLabel} TEND</span>
            <span className="w-16 text-right tabular-nums">{total.toFixed(2)}</span>
          </div>
          {config.paymentMethod !== "cash" && (
            <div className="flex justify-end space-x-4 text-[10px]">
              <span className="w-32 text-right">{paymentLabel} **** **** ****</span>
              <span className="w-16 text-right">{config.cardNumber?.slice(-4) || '0000'}</span>
            </div>
          )}
          <div className="flex justify-end space-x-4">
            <span className="w-32 text-right">CHANGE DUE</span>
            <span className="w-16 text-right tabular-nums">0.00</span>
          </div>
        </div>

        {/* Dynamic Variable: Items Sold (Visual Centerpiece) */}
        <div className="mt-8 mb-5 flex flex-col items-center">
          <h2 className="text-[26px] font-[900] tracking-widest uppercase">
            # ITEMS SOLD {cartItems.length}
          </h2>
        </div>

        {/* Footer Data - Terminates exactly as shown in receipt.png */}
        <div className="flex flex-col items-center space-y-1 pt-2">
          <p className="text-[11px] tracking-[0.2em] font-bold font-mono">
            TC# {config.tcNumber}
          </p>
          
          <div className="w-full flex justify-center py-2 filter grayscale brightness-50">
             <I2of5Barcode data={config.tcNumber} width={290} height={52} />
          </div>

          <p className="text-[12px] font-bold font-mono mt-3">
            {dateStr}
          </p>
        </div>

      </div>
    </div>
  );
}
