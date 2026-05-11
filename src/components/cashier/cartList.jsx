import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartList({ items, onRemoveItem, taxRate }) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * (parseFloat(taxRate) / 100);
  const total = subtotal + tax;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-walmart-blue text-white px-4 py-3 rounded-t-xl">
        <h2 className="text-lg font-bold tracking-wide">🛒 Shopping Cart</h2>
        <p className="text-xs text-blue-200">{items.length} item{items.length !== 1 ? "s" : ""}</p>
      </div>

      {/* Items */}
      <ScrollArea className="flex-1 bg-white border-x-2 border-walmart-blue/10">
        <div className="p-2 space-y-1">
          <AnimatePresence>
            {items.length === 0 && (
              <p className="text-center text-muted-foreground py-8 text-sm">
                No items yet — scan something! 🛍️
              </p>
            )}
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2 group"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold truncate text-foreground">{item.name}</p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-sm font-bold text-walmart-blue whitespace-nowrap">
                    ${item.price.toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50 opacity-60 group-hover:opacity-100"
                    onClick={() => onRemoveItem(idx)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      {/* Totals */}
      <div className="bg-walmart-lightyellow border-2 border-walmart-yellow/30 rounded-b-xl px-4 py-3 space-y-1">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Tax ({taxRate}%)</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t-2 border-walmart-yellow/40 pt-2 flex justify-between">
          <span className="text-lg font-extrabold text-walmart-darkblue">TOTAL</span>
          <span className="text-lg font-extrabold text-walmart-darkblue">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
