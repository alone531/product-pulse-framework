// Types
export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  sku: string;
  inventory: number;
  status: string;
  imageUrl?: string;
};

export type Category = {
  id: string;
  name: string;
  productCount: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "editor" | "viewer";
  status: "active" | "inactive" | "pending";
  avatarUrl?: string;
  createdAt: string;
  lastActive?: string;
};

// Mock product data
export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    description: "The latest iPhone with advanced features and improved performance.",
    price: 999.99,
    category: "Electronics",
    sku: "APPLE-IP15-PRO",
    inventory: 25,
    status: "In Stock",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-black-titanium-select?wid=400&hei=400&fmt=jpeg&qlt=95&.v=1692846357018",
  },
  {
    id: "2",
    name: "MacBook Air M2",
    description: "Ultra-thin laptop with Apple's powerful M2 chip.",
    price: 1299.99,
    category: "Electronics",
    sku: "APPLE-MBA-M2",
    inventory: 15,
    status: "In Stock",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-config-20220606?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1654122880655",
  },
  {
    id: "3",
    name: "AirPods Pro",
    description: "Wireless earbuds with active noise cancellation.",
    price: 249.99,
    category: "Electronics",
    sku: "APPLE-APP-2",
    inventory: 8,
    status: "Low Stock",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1660803972361",
  },
  {
    id: "4",
    name: "Apple Watch Series 8",
    description: "Advanced health monitoring and fitness tracking.",
    price: 399.99,
    category: "Electronics",
    sku: "APPLE-AWS-8",
    inventory: 0,
    status: "Out of Stock",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MPNW3ref_VW_34FR+watch-45-alum-midnight-nc-8s_VW_34FR_WF_CO?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1660779415180,1661969389361",
  },
  {
    id: "5",
    name: "iPad Air",
    description: "Powerful tablet for work and entertainment.",
    price: 599.99,
    category: "Electronics",
    sku: "APPLE-IPAD-AIR",
    inventory: 12,
    status: "In Stock",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=400&hei=400&fmt=jpeg&qlt=90&.v=1645066502941",
  },
  {
    id: "6",
    name: "Samsung Galaxy S23 Ultra",
    description: "Flagship Android smartphone with advanced camera system.",
    price: 1199.99,
    category: "Electronics",
    sku: "SAMSUNG-GS23-ULTRA",
    inventory: 18,
    status: "In Stock",
    imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/latin_en/2302/gallery/latin-en-galaxy-s23-ultra-s918-sm-s918bzgcgnp-534856826?$400_400_JPG$",
  },
  {
    id: "7",
    name: "Sony WH-1000XM5",
    description: "Premium noise-cancelling headphones with exceptional sound quality.",
    price: 349.99,
    category: "Electronics",
    sku: "SONY-WH1000XM5",
    inventory: 6,
    status: "Low Stock",
    imageUrl: "https://electronics.sony.com/image/5d02da087d39245ad231f877da765fd9?fmt=png-alpha&wid=400&hei=400",
  },
  {
    id: "8",
    name: "Nike Air Max 270",
    description: "Comfortable athletic shoes with iconic design.",
    price: 150.00,
    category: "Clothing",
    sku: "NIKE-AM-270",
    inventory: 20,
    status: "In Stock",
    imageUrl: "https://static.nike.com/a/images/t_PDP_400/fa695078-28b4-4e9b-9f86-7a5b0ba4a6fb/air-max-270-mens-shoes-KkLcGR.png",
  },
  {
    id: "9",
    name: "Levi's 501 Original Fit Jeans",
    description: "Classic denim jeans with timeless style.",
    price: 59.99,
    category: "Clothing",
    sku: "LEVIS-501-OFJ",
    inventory: 30,
    status: "In Stock",
  },
  {
    id: "10",
    name: "KitchenAid Stand Mixer",
    description: "Powerful stand mixer for baking and cooking.",
    price: 349.99,
    category: "Home & Kitchen",
    sku: "KITCHENAID-SM",
    inventory: 5,
    status: "Low Stock",
  },
  {
    id: "11",
    name: "Dyson V12 Detect",
    description: "Cordless vacuum with laser dust detection.",
    price: 649.99,
    category: "Home & Kitchen",
    sku: "DYSON-V12",
    inventory: 0,
    status: "Out of Stock",
  },
  {
    id: "12",
    name: "The Alchemist",
    description: "Bestselling novel by Paulo Coelho.",
    price: 12.99,
    category: "Books",
    sku: "BOOK-ALCHEMIST",
    inventory: 50,
    status: "In Stock",
  }
];

// Mock category data
export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    productCount: 7,
  },
  {
    id: "2",
    name: "Clothing",
    productCount: 2,
  },
  {
    id: "3",
    name: "Home & Kitchen",
    productCount: 2,
  },
  {
    id: "4",
    name: "Books",
    productCount: 1,
  },
  {
    id: "5",
    name: "Sports & Outdoors",
    productCount: 0,
  },
  {
    id: "6",
    name: "Beauty & Personal Care",
    productCount: 0,
  },
];

// Mock user data
export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "active",
    avatarUrl: "https://github.com/shadcn.png",
    createdAt: "2023-01-15",
    lastActive: "2023-08-24",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "manager",
    status: "active",
    avatarUrl: "https://github.com/shadcn.png",
    createdAt: "2023-02-20",
    lastActive: "2023-08-23",
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "editor",
    status: "inactive",
    createdAt: "2023-03-10",
    lastActive: "2023-07-15",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "viewer",
    status: "active",
    createdAt: "2023-04-05",
    lastActive: "2023-08-20",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "editor",
    status: "pending",
    createdAt: "2023-05-12",
  },
];
