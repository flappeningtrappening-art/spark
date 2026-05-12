import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NumberPad from "@/components/cashier/NumberPad";
import CategoryButtons from "@/components/cashier/CategoryButtons";
import CartList from "@/components/cashier/CartList";
import { loadConfig, loadCart, saveCart, clearCart } from "@/lib/storeConfig";
import { getRandomItem } from "@/lib/walmartItems";
import { Settings, Receipt, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export default function CashierView() {
  const [config] = useState(loadConfig);
  const [cart, setCart] = useState(loadCart);
  const [priceInput, setPriceInput] = useState("");
  const [customName, setCustomName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const handleCategoryPress = (category) => {
    const item = getRandomItem(category);
    setCart((prev) => [...prev, item]);
    toast.success(`Added ${item.name}!`, { duration: 1500 });
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
    navigate("/receipt");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <div className="bg-walmart-blue text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-walmart-yellow" />
          <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">Walmart POS</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 rounded-xl"
          onClick={() => navigate("/config")}
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
        {/* Left Panel: Controls */}
        <div className="lg:w-1/2 xl:w-[45%] space-y-4 overflow-y-auto">
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
          Show Customer Receipt
        </Button>
      </div>
    </div>
  );
}
