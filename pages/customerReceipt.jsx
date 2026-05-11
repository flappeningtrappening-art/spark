import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ReceiptDisplay from "@/components/receipt/ReceiptDisplay";
import { loadConfig, loadCart, clearCart } from "@/lib/storeConfig";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function CustomerReceipt() {
  const [config] = useState(loadConfig);
  const [cartItems] = useState(loadCart);
  const navigate = useNavigate();

  const handleDone = () => {
    clearCart();
    toast.success("Cart cleared! Ready for next customer 🛒");
    navigate("/cashier");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-walmart-blue to-walmart-darkblue flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/20 rounded-xl gap-2"
          onClick={() => navigate("/cashier")}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>
        <h1 className="text-lg font-extrabold text-white tracking-tight">Customer Receipt</h1>
        <div className="w-20" />
      </div>

      {/* Receipt */}
      <div className="flex-1 flex items-start justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Torn paper top edge */}
            <div className="h-3 bg-gradient-to-b from-transparent to-white"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12 Q5 0 10 12 Q15 0 20 12 Q25 0 30 12 Q35 0 40 12' fill='white'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat-x',
                backgroundSize: '40px 12px',
                backgroundColor: 'transparent',
              }}
            />
            <ReceiptDisplay config={config} cartItems={cartItems} />
            {/* Torn paper bottom edge */}
            <div className="h-3"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='12' viewBox='0 0 40 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 Q5 12 10 0 Q15 12 20 0 Q25 12 30 0 Q35 12 40 0' fill='white'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat-x',
                backgroundSize: '40px 12px',
                backgroundColor: 'transparent',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Done Button */}
      <div className="p-4">
        <Button
          onClick={handleDone}
          className="w-full h-16 text-xl font-extrabold bg-walmart-yellow hover:bg-yellow-400 text-walmart-darkblue rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <CheckCircle className="w-7 h-7" />
          Done — Next Customer!
        </Button>
      </div>
    </div>
  );
}
