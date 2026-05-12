const DEFAULT_CONFIG = {
  phoneNumber: "(555) 123-4567",
  storeManager: "John Smith",
  cityState: "Bentonville, AR",
  storeNumber: "1234",
  operatorNumber: "005678",
  terminalNumber: "12",
  transactionNumber: "8432",
  taxRate: "8.25",
  paymentMethod: "debit",
  cardNumber: "************1234",
  tcNumber: "1234 5678 9012 3456 7890",
  dateTime: "",
};

const STORAGE_KEY = "walmart-cashier-config";
const CART_KEY = "walmart-cashier-cart";

export function loadConfig() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
  }
  return { ...DEFAULT_CONFIG };
}

export function saveConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function loadCart() {
  const saved = localStorage.getItem(CART_KEY);
  if (saved) return JSON.parse(saved);
  return [];
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
}
