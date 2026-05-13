import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { loadConfig, saveConfig, resetConfig } from "@/lib/storeConfig";
import { Settings, ArrowRight, Store, Phone, User, Hash, CreditCard, Calendar, Percent, RotateCcw, Building } from "lucide-react";
import { toast } from "sonner";

const fields = [
  { key: "phoneNumber", label: "Phone Number", icon: Phone, placeholder: "(555) 123-4567" },
  { key: "storeManager", label: "Store Manager Name", icon: User, placeholder: "John Smith" },
  { key: "cityState", label: "City & State", icon: Store, placeholder: "Bentonville, AR" },
  { key: "storeNumber", label: "Store # (ST#)", icon: Hash, placeholder: "1234" },
  { key: "operatorNumber", label: "Operator # (OP#)", icon: Hash, placeholder: "005678" },
  { key: "terminalNumber", label: "Terminal # (TE#)", icon: Hash, placeholder: "12" },
  { key: "transactionNumber", label: "Transaction # (TR#)", icon: Hash, placeholder: "8432" },
  { key: "taxRate", label: "Tax Rate (%)", icon: Percent, placeholder: "8.25" },
];

export default function ConfigScreen() {
  const [config, setConfig] = useState(loadConfig);
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    saveConfig(config);
    toast.success("Store settings saved! Store is now open 🏪");
    navigate("/cashier");
  };

  const handleReset = () => {
      const defaults = resetConfig();
      setConfig(defaults);
      toast.info("Settings reset to Walmart defaults.");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 pb-20">
      {/* Header */}
      <div className="max-w-lg mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-walmart-blue rounded-3xl px-8 py-4 mb-4 shadow-xl">
          <Building className="w-8 h-8 text-walmart-yellow" />
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tighter italic uppercase">Manager's Office</h1>
        </div>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Administrative Control Panel</p>
      </div>

      <div className="max-w-lg mx-auto space-y-6">
        {/* Store Info Fields */}
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-walmart-yellow px-4 py-2.5">
            <h2 className="font-bold text-walmart-darkblue text-sm uppercase tracking-wide">📋 Store Profile</h2>
          </div>
          <CardContent className="p-6 space-y-4 bg-white">
            {fields.map(({ key, label, icon: Icon, placeholder }) => (
              <div key={key} className="space-y-1.5">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-walmart-blue" />
                  {label}
                </Label>
                <Input
                  value={config[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={placeholder}
                  className="h-12 rounded-xl border-2 border-slate-100 text-sm font-bold focus:border-walmart-blue transition-all"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Section */}
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-walmart-yellow px-4 py-2.5">
            <h2 className="font-bold text-walmart-darkblue text-sm uppercase tracking-wide">💳 Payment Defaults</h2>
          </div>
          <CardContent className="p-6 space-y-4 bg-white">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-walmart-blue" />
                Default Method
              </Label>
              <Select value={config.paymentMethod} onValueChange={(v) => handleChange("paymentMethod", v)}>
                <SelectTrigger className="h-12 rounded-xl border-2 border-slate-100 text-sm font-bold focus:border-walmart-blue transition-all">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debit" className="font-bold">💳 Debit Card</SelectItem>
                  <SelectItem value="credit" className="font-bold">💳 Credit Card</SelectItem>
                  <SelectItem value="cash" className="font-bold">💵 Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {config.paymentMethod !== "cash" && (
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Card Display #</Label>
                <Input
                  value={config.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e.target.value)}
                  placeholder="************1234"
                  className="h-12 rounded-xl border-2 border-slate-100 text-sm font-bold"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Barcode Token (TC#)</Label>
              <Input
                value={config.tcNumber}
                onChange={(e) => handleChange("tcNumber", e.target.value)}
                placeholder="1234 5678 9012 3456 7890"
                className="h-12 rounded-xl border-2 border-slate-100 text-sm font-bold font-mono tracking-wider"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-walmart-blue" />
                Timestamp Override
              </Label>
              <Input
                type="datetime-local"
                value={config.dateTime}
                onChange={(e) => handleChange("dateTime", e.target.value)}
                className="h-12 rounded-xl border-2 border-slate-100 text-sm font-bold"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save & Reset Buttons */}
        <div className="space-y-3 pt-4">
            <Button
                onClick={handleSave}
                className="w-full h-16 text-xl font-black bg-walmart-blue hover:bg-walmart-darkblue text-white rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
            >
                Open Store
                <ArrowRight className="w-6 h-6 text-walmart-yellow" />
            </Button>

            <Button
                variant="ghost"
                onClick={handleReset}
                className="w-full h-12 text-slate-400 font-bold hover:text-red-500 hover:bg-red-50 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
                <RotateCcw className="w-4 h-4" />
                Reset Store to Factory Defaults
            </Button>
            
            <Button
                variant="ghost"
                onClick={() => navigate("/cashier")}
                className="w-full text-slate-400 font-bold"
            >
                Cancel Changes
            </Button>
        </div>
      </div>
    </div>
  );
}
