import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NumberPad from "@/components/cashier/NumberPad";
import CategoryButtons from "@/components/cashier/CategoryButtons";
import CartList from "@/components/cashier/CartList";
import { loadConfig, loadCart, saveCart, clearCart } from "@/lib/storeConfig";
import { getRandomItem } from "@/lib/walmartItems";
import { Settings, Receipt, Plus, ShoppingBag, QrCode, Camera } from "lucide-react";
import { toast } from "sonner";
import BarcodeScanner from "@/components/BarcodeScanner";

export default function CashierView() {
  const [config] = useState(loadConfig);
  const [cart, setCart] = useState(loadCart);
  const [priceInput, setPriceInput] = useState("");
  const [customName, setCustomName] = useState("");
  const [isScanningHandoff, setIsScanningHandoff] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const handleCategoryPress = (category) => {
    const item = getRandomItem(category);
    setCart((prev) => [...prev, item]);
    toast.success(`Added ${item.name}!`, { duration: 1500 });
  };

  const handleHandoffScan = (decodedText) => {
    if (decodedText.startsWith("spark-handoff-")) {
      // In a real app, we'd fetch from a server.
      // Here, the data is already in loadCart() from the shopper view.
      const shopperCart = loadCart();
      setCart(shopperCart);
      setIsScanningHandoff(false);
      toast.success("Cart synced from phone! 📱 ✨", { duration: 3000 });
    }
  };

  const handleAddCustom = () => {
    const price = parseFloat(priceInput);
    if (isNaN(price) || price <= 0) {
      toast.error("Enter a valid price!");
      return;
    }
    const name = customName.trim() || "CUSTOM ITEM";
    setCart((prev) => [
      ...prev,
      { id: Date.now(), name: name.toUpperCase(), price },
    ]);
    setPriceInput("");
    setCustomName("");
    toast.success(`Added ${name}!`, { duration: 1500 });
  };

  const handleRemoveItem = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleShowReceipt = () => {
    if (cart.length === 0) {
      toast.error("Add some items first!");
      return;
    }
    
    setIsProcessing(true);
    // Simulate Walmart Pay processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/receipt");
    }, 2500);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-walmart-blue flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="w-24 h-24 border-8 border-white/20 border-t-walmart-yellow rounded-full animate-spin mb-8"></div>
        <h1 className="text-3xl font-black mb-2 uppercase tracking-tighter italic">Walmart Pay</h1>
        <p className="text-xl font-bold opacity-80">Authorizing payment...</p>
        <p className="mt-8 text-sm font-medium animate-pulse">Please do not remove your phone or card</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <div className="bg-walmart-darkblue text-white px-4 py-3 flex items-center justify-between shadow-lg border-b-4 border-walmart-yellow">
        <div className="flex items-center gap-3">
          <div className="bg-white p-1 rounded-lg">
             <ShoppingBag className="w-6 h-6 text-walmart-blue" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight leading-tight">SELF-CHECKOUT</h1>
            <p className="text-[10px] font-bold text-walmart-yellow uppercase tracking-widest">Register #{config.terminalNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl font-bold"
              onClick={() => navigate("/shopper")}
            >
              Phone Mode
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-xl"
              onClick={() => navigate("/config")}
            >
              <Settings className="w-5 h-5" />
            </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
        {/* Left Panel: Controls */}
        <div className="lg:w-1/2 xl:w-[45%] space-y-4 overflow-y-auto">
          {/* Handoff Scan Button */}
          <div className="bg-walmart-blue/5 rounded-2xl border-2 border-dashed border-walmart-blue/30 p-4">
            {isScanningHandoff ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-walmart-darkblue">Scan Shopper QR</h3>
                        <Button variant="ghost" size="sm" onClick={() => setIsScanningHandoff(false)}>Cancel</Button>
                    </div>
                    <BarcodeScanner onScanSuccess={handleHandoffScan} />
                </div>
            ) : (
                <Button
                    onClick={() => setIsScanningHandoff(true)}
                    className="w-full h-14 bg-white hover:bg-slate-50 text-walmart-blue border-2 border-walmart-blue font-black rounded-xl shadow-sm flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                    <QrCode className="w-6 h-6" />
                    Sync items from Phone
                </Button>
            )}
          </div>

          {/* Price Display */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-walmart-blue/10 p-4">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Price Entry</label>
            <div className="bg-muted rounded-xl px-4 py-3 mt-1 flex items-center">
              <span className="text-2xl font-extrabold text-walmart-darkblue mr-1">$</span>
              <span className="text-2xl font-extrabold text-walmart-darkblue">
                {priceInput || "0.00"}
              </span>
            </div>
          </div>

          {/* Number Pad */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-walmart-blue/10 p-4">
            <NumberPad value={priceInput} onChange={setPriceInput} />
          </div>

          {/* Custom Item */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-walmart-blue/10 p-4 space-y-2">
            <Input
              placeholder="Item name (optional)"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="h-11 rounded-xl border-2 text-sm font-semibold"
            />
            <Button
              onClick={handleAddCustom}
              className="w-full h-12 bg-walmart-blue hover:bg-walmart-darkblue text-white font-bold rounded-xl text-base active:scale-95 transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Custom Item
            </Button>
          </div>

          {/* Category Buttons */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-walmart-blue/10 p-4">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">
              Quick Add by Category
            </label>
            <CategoryButtons onCategoryPress={handleCategoryPress} />
          </div>
        </div>

        {/* Right Panel: Cart */}
        <div className="lg:w-1/2 xl:w-[55%] flex flex-col min-h-[300px]">
          <div className="flex-1 bg-white rounded-2xl shadow-md border-2 border-walmart-blue/10 overflow-hidden flex flex-col">
            <CartList
              items={cart}
              onRemoveItem={handleRemoveItem}
              taxRate={config.taxRate}
            />
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="p-4 pt-0">
        <Button
          onClick={handleShowReceipt}
          className="w-full h-16 text-xl font-extrabold bg-walmart-yellow hover:bg-yellow-400 text-walmart-darkblue rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <Receipt className="w-7 h-7" />
          Finish and Pay
        </Button>
      </div>
    </div>
  );
}
