import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { loadCart } from "@/lib/storeConfig";
import { ArrowLeft, Monitor, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function ScanHandoff() {
  const [cart] = useState(loadCart);
  const navigate = useNavigate();

  // Create a handoff token (for simulation, just a random string)
  // In a real multi-device app, this would be a database ID
  const handoffToken = "spark-handoff-" + Math.random().toString(36).substring(7);

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/shopper");
    }
  }, [cart, navigate]);

  return (
    <div className="min-h-screen bg-walmart-blue flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Button 
          variant="ghost" 
          className="text-white hover:bg-white/20 mb-6"
          onClick={() => navigate("/shopper")}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Cart
        </Button>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="bg-walmart-lightyellow p-4 rounded-full">
              <Monitor className="w-10 h-10 text-walmart-darkblue" />
            </div>
          </div>
          
          <h1 className="text-2xl font-black text-walmart-darkblue mb-2">Scan at Register</h1>
          <p className="text-slate-500 font-medium mb-8">
            Point the register scanner at this QR code to transfer your items.
          </p>

          <div className="bg-slate-50 p-6 rounded-2xl border-4 border-walmart-yellow inline-block mb-8">
            <QRCodeSVG 
              value={handoffToken} 
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="flex items-center gap-2 text-left bg-blue-50 p-4 rounded-xl text-blue-800 text-sm">
            <Info className="w-5 h-5 flex-shrink-0" />
            <p>Scanning this will automatically populate all {cart.length} items on the store register.</p>
          </div>
        </motion.div>

        <p className="text-white/60 text-center text-xs mt-8 font-bold uppercase tracking-widest">
          Walmart Spark - Imaginative Play
        </p>
      </div>
    </div>
  );
}
