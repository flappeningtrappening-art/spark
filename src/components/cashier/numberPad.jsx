import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

export default function NumberPad({ value, onChange }) {
  const handleDigit = (digit) => {
    onChange(value + digit);
  };

  const handleClear = () => {
    onChange("");
  };

  const handleBackspace = () => {
    onChange(value.slice(0, -1));
  };

  const handleDot = () => {
    if (!value.includes(".")) {
      onChange(value === "" ? "0." : value + ".");
    }
  };

  const digits = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    [".", "0", "⌫"],
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {digits.flat().map((key) => (
        <Button
          key={key}
          variant="outline"
          className={`h-14 sm:h-16 text-xl sm:text-2xl font-bold rounded-xl border-2 transition-all active:scale-95
            ${key === "⌫"
              ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
              : key === "."
              ? "bg-muted border-border text-foreground hover:bg-muted/80"
              : "bg-white border-walmart-blue/20 text-walmart-darkblue hover:bg-walmart-blue/5"
            }`}
          onClick={() => {
            if (key === "⌫") handleBackspace();
            else if (key === ".") handleDot();
            else handleDigit(key);
          }}
        >
          {key === "⌫" ? <Delete className="w-6 h-6" /> : key}
        </Button>
      ))}
      <Button
        className="col-span-3 h-12 text-lg font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl active:scale-95"
        onClick={handleClear}
      >
        CLEAR
      </Button>
    </div>
  );
}
