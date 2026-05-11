import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { loadConfig, saveConfig } from "@/lib/storeConfig";
import { Settings, ArrowRight, Store, Phone, User, Hash, CreditCard, Calendar, Percent } from "lucide-react";
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
    toast.success("Store settings saved!");
    navigate("/cashier");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-walmart-blue via-walmart-darkblue to-walmart-blue p-4 sm:p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 mb-3">
          <Settings className="w-7 h-7 text-walmart-yellow" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Store Setup</h1>
        </div>
        <p className="text-blue-200 text-sm">Configure your Walmart store information</p>
      </div>

      <div className="max-w-lg mx-auto space-y-4">
        {/* Store Info Fields */}
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-walmart-yellow px-4 py-2.5">
            <h2 className="font-bold text-walmart-darkblue text-sm">📋 Store Information</h2>
          </div>
          <CardContent className="p-4 space-y-3">
            {fields.map(({ key, label, icon: Icon, placeholder }) => (
              <div key={key} className="space-y-1">
                <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Label>
                <Input
                  value={config[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={placeholder}
                  className="h-11 rounded-xl border-2 text-sm font-semibold"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Section */}
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-walmart-yellow px-4 py-2.5">
            <h2 className="font-bold text-walmart-darkblue text-sm">💳 Payment Settings</h2>
          </div>
          <CardContent className="p-4 space-y-3">
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                Payment Method
              </Label>
              <Select value={config.paymentMethod} onValueChange={(v) => handleChange("paymentMethod", v)}>
                <SelectTrigger className="h-11 rounded-xl border-2 text-sm font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debit">💳 Debit Card</SelectItem>
                  <SelectItem value="credit">💳 Credit Card</SelectItem>
                  <SelectItem value="cash">💵 Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {config.paymentMethod !== "cash" && (
              <div className="space-y-1">
                <Label className="text-xs font-semibold text-muted-foreground">Card Number</Label>
                <Input
                  value={config.cardNumber}
                  onChange={(e) => handleChange("cardNumber", e.target.value)}
                  placeholder="************1234"
                  className="h-11 rounded-xl border-2 text-sm font-semibold"
                />
              </div>
            )}

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground">TC# (for barcode)</Label>
              <Input
                value={config.tcNumber}
                onChange={(e) => handleChange("tcNumber", e.target.value)}
                placeholder="1234 5678 9012 3456 7890"
                className="h-11 rounded-xl border-2 text-sm font-semibold font-mono tracking-wider"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Date & Time (leave blank for current)
              </Label>
              <Input
                type="datetime-local"
                value={config.dateTime}
                onChange={(e) => handleChange("dateTime", e.target.value)}
                className="h-11 rounded-xl border-2 text-sm font-semibold"
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full h-14 text-lg font-extrabold bg-walmart-yellow hover:bg-yellow-400 text-walmart-darkblue rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          Save & Start Scanning
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
