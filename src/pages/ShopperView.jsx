import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import BarcodeScanner from "@/components/BarcodeScanner";
import { loadCart, saveCart, getProductByUPC, saveToCatalog } from "@/lib/storeConfig";
import { getRandomItem } from "@/lib/walmartItems";
import { ShoppingBag, Scan, ArrowRight, Trash2, X, PlusCircle, Settings } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function ShopperView() {
  const [cart, setCart] = useState(loadCart);
  const [isScanning, setIsScanning] = useState(false);
  
  // Learning Mode State
  const [unknownUPC, setUnknownUPC] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const handleScanSuccess = (decodedText) => {
    // Check if we know this product
    const existingProduct = getProductByUPC(decodedText);
    
    if (existingProduct) {
        setCart((prev) => [...prev, { ...existingProduct, id: Date.now() + Math.random() }]);
        setIsScanning(false);
        toast.success(`Scanned: ${existingProduct.name}!`, { duration: 2000 });
    } else {
        // Unknown UPC - Trigger Learning Mode
        setUnknownUPC(decodedText);
        setIsScanning(false);
        setNewItemName("");
        setNewItemPrice("");
    }
  };

  const handleSaveNewItem = () => {
      const price = parseFloat(newItemPrice);
      if (!newItemName.trim()) {
          toast.error("Please enter an item name");
          return;
      }
      if (isNaN(price) || price <= 0) {
          toast.error("Please enter a valid price");
          return;
      }

      const newItem = {
          name: newItemName.toUpperCase(),
          price: price
      };

      saveToCatalog(unknownUPC, newItem);
      setCart((prev) => [...prev, { ...newItem, id: Date.now() + Math.random() }]);
      setUnknownUPC(null);
      toast.success(`${newItemName} added to catalog! ✨`);
  };

  const handleRemoveItem = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    navigate("/handoff");
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Walmart Scan & Go Header */}
      <div className="bg-walmart-blue text-white px-4 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-walmart-yellow p-1.5 rounded-lg">
            <ShoppingBag className="w-5 h-5 text-walmart-darkblue" />
          </div>
          <h1 className="text-lg font-bold tracking-tight">Scan & Go</h1>
        </div>
        <div className="flex items-center gap-2">
            <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/20"
                onClick={() => navigate("/cashier")}
            >
                Register
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-lg"
                onClick={() => navigate("/config")}
            >
                <Settings className="w-5 h-5" />
            </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {isScanning ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 bg-black relative">
            <Button 
              variant="ghost" 
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
              onClick={() => setIsScanning(false)}
            >
              <X className="w-6 h-6" />
            </Button>
            <div className="text-white mb-4 text-center">
              <p className="text-lg font-bold">Position barcode in frame</p>
              <p className="text-sm opacity-70">Scanning items for your cart</p>
            </div>
            <BarcodeScanner onScanSuccess={handleScanSuccess} />
          </div>
        ) : (
          <>
            <div className="p-4 flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-extrabold text-walmart-darkblue">Your Cart</h2>
                <span className="bg-walmart-blue/10 text-walmart-blue px-3 py-1 rounded-full text-sm font-bold">
                  {cart.length} items
                </span>
              </div>

              <ScrollArea className="flex-1 rounded-2xl bg-white shadow-inner border border-slate-200">
                <div className="p-4 space-y-3">
                  <AnimatePresence>
                    {cart.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                        <p className="font-medium text-center px-10">
                          Your cart is empty. Tap the scan button below to add items!
                        </p>
                      </div>
                    )}
                    {cart.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-800 uppercase leading-tight">{item.name}</p>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">Qty: 1</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-walmart-blue">
                            ${item.price.toFixed(2)}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-300 hover:text-red-500"
                            onClick={() => handleRemoveItem(idx)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>
            </div>

            {/* Floating Action Button for Scan */}
            <div className="px-4 pb-4">
               <Button
                onClick={() => setIsScanning(true)}
                className="w-full h-16 bg-walmart-blue hover:bg-walmart-darkblue text-white rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                <Scan className="w-7 h-7" />
                <span className="text-lg font-bold">Scan an Item</span>
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Bottom Summary Bar */}
      {!isScanning && (
        <div className="bg-white border-t border-slate-200 p-4 pb-8 flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estimated Total</p>
            <p className="text-2xl font-black text-walmart-darkblue">${subtotal.toFixed(2)}</p>
          </div>
          <Button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="bg-walmart-yellow hover:bg-yellow-400 text-walmart-darkblue font-black px-8 h-14 rounded-2xl shadow-lg flex items-center gap-2 text-lg active:scale-95 disabled:opacity-50"
          >
            Check Out
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Learning Mode Dialog */}
      <Dialog open={!!unknownUPC} onOpenChange={() => setUnknownUPC(null)}>
        <DialogContent className="sm:max-w-md rounded-3xl border-0 shadow-2xl p-0 overflow-hidden">
            <div className="bg-walmart-blue p-6 text-white text-center">
                <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                    <PlusCircle className="w-10 h-10 text-walmart-yellow" />
                </div>
                <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">New Item Detected!</DialogTitle>
                <DialogDescription className="text-blue-100 font-medium">
                    What is this product and how much does it cost?
                </DialogDescription>
            </div>
            <div className="p-6 space-y-5 bg-white">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs font-black text-slate-400 uppercase tracking-widest">Product Name</Label>
                    <Input 
                        id="name"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="e.g. OREO COOKIES"
                        className="h-14 rounded-xl border-2 border-slate-100 text-lg font-bold focus:border-walmart-blue transition-all"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price" className="text-xs font-black text-slate-400 uppercase tracking-widest">Price ($)</Label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-black text-slate-300">$</span>
                        <Input 
                            id="price"
                            type="number"
                            inputMode="decimal"
                            value={newItemPrice}
                            onChange={(e) => setNewItemPrice(e.target.value)}
                            placeholder="0.00"
                            className="h-14 rounded-xl border-2 border-slate-100 text-xl font-black pl-10 focus:border-walmart-blue transition-all"
                        />
                    </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                    <div className="bg-slate-200 p-2 rounded-lg">
                        <Scan className="w-5 h-5 text-slate-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Product ID (UPC)</p>
                        <p className="text-sm font-mono font-bold text-slate-700">{unknownUPC}</p>
                    </div>
                </div>
            </div>
            <DialogFooter className="p-6 pt-0 bg-white">
                <Button 
                    onClick={handleSaveNewItem}
                    className="w-full h-16 bg-walmart-yellow hover:bg-yellow-400 text-walmart-darkblue text-xl font-black rounded-2xl shadow-lg active:scale-95 transition-all"
                >
                    Add to Store Catalog
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
