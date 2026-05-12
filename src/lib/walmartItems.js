const WALMART_ITEMS = {
  groceries: [
    { name: "GV Whole Milk 1 GAL", price: 3.36 },
    { name: "GV White Bread", price: 1.18 },
    { name: "GV Large Eggs 12CT", price: 2.62 },
    { name: "Bananas 1 LB", price: 0.58 },
    { name: "GV Mac & Cheese", price: 0.82 },
    { name: "GV Butter 16OZ", price: 3.48 },
    { name: "GV Peanut Butter", price: 2.14 },
    { name: "GV Apple Juice 64OZ", price: 2.98 },
    { name: "GV Chicken Noodle Soup", price: 0.98 },
    { name: "GV Cheddar Cheese 8OZ", price: 2.24 },
    { name: "GV Spaghetti 16OZ", price: 0.82 },
    { name: "GV Tomato Sauce", price: 0.78 },
    { name: "Marketside Salad Kit", price: 3.47 },
    { name: "GV Frozen Pizza", price: 4.18 },
    { name: "GV Ice Cream 48OZ", price: 3.72 },
  ],
  toys: [
    { name: "Play Day Bubbles 8OZ", price: 0.97 },
    { name: "Hot Wheels Basic Car", price: 1.27 },
    { name: "Crayola Crayons 24CT", price: 2.47 },
    { name: "Play-Doh 4 Pack", price: 4.97 },
    { name: "Nerf Elite 2.0 Dart", price: 9.97 },
    { name: "Barbie Fashion Doll", price: 9.97 },
    { name: "LEGO Classic Bricks", price: 19.97 },
    { name: "Squishmallow 8 Inch", price: 7.88 },
    { name: "UNO Card Game", price: 5.97 },
    { name: "Slime Kit", price: 4.88 },
  ],
  clothes: [
    { name: "Wonder Nation Tee", price: 5.98 },
    { name: "Wonder Nation Shorts", price: 7.98 },
    { name: "Athletic Works Socks 6PK", price: 5.47 },
    { name: "Wonder Nation Leggings", price: 6.98 },
    { name: "George Men's Polo", price: 9.88 },
    { name: "Time & Tru Women's Tee", price: 7.98 },
    { name: "Wonder Nation Hoodie", price: 12.88 },
    { name: "Athletic Works Cap", price: 4.97 },
    { name: "No Boundaries Tank Top", price: 4.98 },
    { name: "Wonder Nation Pajamas", price: 8.98 },
  ],
  electronics: [
    { name: "ONN USB-C Cable 6FT", price: 5.88 },
    { name: "ONN Earbuds", price: 5.88 },
    { name: "ONN Wall Charger", price: 7.88 },
    { name: "Energizer AA 8PK", price: 7.48 },
    { name: "ONN Bluetooth Speaker", price: 14.88 },
    { name: "ONN Mouse Wireless", price: 9.88 },
    { name: "ONN Phone Case", price: 9.88 },
    { name: "ONN Screen Protector", price: 4.88 },
    { name: "SanDisk 32GB USB", price: 6.88 },
    { name: "ONN HDMI Cable 6FT", price: 6.48 },
  ],
};

export function getRandomItem(category) {
  const items = WALMART_ITEMS[category];
  const item = items[Math.floor(Math.random() * items.length)];
  return { ...item, id: Date.now() + Math.random() };
}

export default WALMART_ITEMS;
