import { Button } from "@/components/ui/button";
import { ShoppingCart, Gamepad2, Shirt, Cpu } from "lucide-react";

const categories = [
  { id: "groceries", label: "Groceries", icon: ShoppingCart, color: "bg-green-500 hover:bg-green-600" },
  { id: "toys", label: "Toys", icon: Gamepad2, color: "bg-purple-500 hover:bg-purple-600" },
  { id: "clothes", label: "Clothes", icon: Shirt, color: "bg-pink-500 hover:bg-pink-600" },
  { id: "electronics", label: "Electronics", icon: Cpu, color: "bg-orange-500 hover:bg-orange-600" },
];

export default function CategoryButtons({ onCategoryPress }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <Button
            key={cat.id}
            className={`${cat.color} text-white h-14 sm:h-16 text-sm sm:text-base font-bold rounded-xl flex items-center gap-2 active:scale-95 transition-all shadow-md`}
            onClick={() => onCategoryPress(cat.id)}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            {cat.label}
          </Button>
        );
      })}
    </div>
  );
}
