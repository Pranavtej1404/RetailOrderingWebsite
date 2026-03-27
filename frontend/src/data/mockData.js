export const categories = [
  { id: 1, name: 'Pizza', image: '/assets/pizza.png' },
  { id: 2, name: 'Cold Drinks', image: '/assets/drinks.png' },
  { id: 3, name: 'Breads', image: '/assets/breads.png' },
];

export const brands = [
  { id: 1, name: 'Dominoes' },
  { id: 2, name: 'Pizza Hut' },
  { id: 3, name: 'Coca Cola' },
  { id: 4, name: 'Pepsi' },
  { id: 5, name: 'Bakers Delight' },
];

export const products = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic cheese and tomato pizza with fresh basil.',
    price: 299,
    categoryId: 1,
    brandId: 1,
    imageUrl: '/assets/pizza.png',
    stock: 15,
  },
  {
    id: 2,
    name: 'Pepperoni Feast',
    description: 'Double pepperoni with extra mozzarella cheese.',
    price: 449,
    categoryId: 1,
    brandId: 2,
    imageUrl: '/assets/pizza.png',
    stock: 8,
  },
  {
    id: 3,
    name: 'Classic Coke',
    description: 'Refreshning 500ml Coca Cola bottle.',
    price: 45,
    categoryId: 2,
    brandId: 3,
    imageUrl: '/assets/drinks.png',
    stock: 50,
  },
  {
    id: 4,
    name: 'Garlic Bread',
    description: 'Toasted bread with buttery garlic and herbs.',
    price: 129,
    categoryId: 3,
    brandId: 5,
    imageUrl: '/assets/breads.png',
    stock: 20,
  },
  {
    id: 5,
    name: 'Veggie Paradise',
    description: 'Loaded with olives, bell peppers, corn, and mushrooms.',
    price: 399,
    categoryId: 1,
    brandId: 1,
    imageUrl: '/assets/pizza.png',
    stock: 12,
  },
  {
    id: 6,
    name: 'Pepsi Zero',
    description: 'Zero sugar Pepsi, 500ml.',
    price: 40,
    categoryId: 2,
    brandId: 4,
    imageUrl: '/assets/drinks.png',
    stock: 30,
  },
];

export const mockCartItems = [
  {
    id: 1,
    productId: 1,
    name: 'Margherita Pizza',
    price: 299,
    quantity: 2,
    imageUrl: '/assets/pizza.png',
  },
  {
    id: 2,
    productId: 3,
    name: 'Classic Coke',
    price: 45,
    quantity: 3,
    imageUrl: '/assets/drinks.png',
  },
];

export const mockOrders = [
  {
    id: 'ORD-7721',
    date: '2026-03-25T14:30:00',
    total: 865,
    status: 'DELIVERED',
    address: '123, Jubilee Hills, Hyderabad',
    items: [
      { id: 1, name: 'Margherita Pizza', price: 299, quantity: 2 },
      { id: 2, name: 'Classic Coke', price: 45, quantity: 3 }
    ]
  },
  {
    id: 'ORD-8109',
    date: '2026-03-26T18:15:00',
    total: 428,
    status: 'IN_TRANSIT',
    address: 'Flat 402, Sunshine Apts, Gachibowli',
    items: [
      { id: 3, name: 'Garlic Bread', price: 129, quantity: 1 },
      { id: 4, name: 'Mountain Dew', price: 50, quantity: 2 }
    ]
  }
];
